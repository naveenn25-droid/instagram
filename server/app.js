import express from "express";
import ExcelJS from "exceljs";
import { addSubmission, getSubmissions } from "./excelService.js";

export function createApp() {
  const app = express();

  app.use(express.json());

  return app;
}

export function validateSubmission(body) {
  const errors = [];
  const { username, password } = body ?? {};

  if (typeof username !== "string" || !username.trim()) {
    errors.push("username is required and must be a non-empty string");
  }

  if (typeof password !== "string" || !password.trim()) {
    errors.push("password is required and must be a non-empty string");
  }

  return errors;
}

export function registerRoutes(app) {
  app.post("/submit", async (req, res) => {
    const errors = validateSubmission(req.body);

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    try {
      const { username, password } = req.body;
      const submission = await addSubmission(username.trim(), password.trim());

      return res.status(201).json({
        success: true,
        message: "Submission saved successfully",
        data: submission,
      });
    } catch {
      return res.status(500).json({
        success: false,
        error: "Failed to save submission",
      });
    }
  });

  app.get("/submissions", async (_req, res) => {
    try {
      const submissions = await getSubmissions();

      return res.json({
        success: true,
        count: submissions.length,
        data: submissions,
      });
    } catch {
      return res.status(500).json({
        success: false,
        error: "Failed to read submissions",
      });
    }
  });

  app.get("/submissions/download", async (req, res) => {
    const { key } = req.query;
    // Simple query param auth
    if (key !== "admin123") {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    try {
      const submissions = await getSubmissions();
      
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Submissions");
      
      sheet.addRow(["username", "password", "timestamp"]);
      
      submissions.forEach(sub => {
        sheet.addRow([sub.username, sub.password, sub.timestamp]);
      });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=submissions.xlsx"
      );

      const buffer = await workbook.xlsx.writeBuffer();
      return res.send(buffer);
    } catch (error) {
      console.error("Failed to generate Excel:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to generate Excel file",
      });
    }
  });
}
