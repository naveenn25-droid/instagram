import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";
import { getStore } from "@netlify/blobs";

const LOCAL_DB_PATH = path.resolve("server", "database.xlsx");
const NETLIFY_DB_PATH = "/tmp/database.xlsx";

const WORKSHEET_NAME = "Submissions";
const HEADERS = ["username", "password"];

const BLOB_STORE = "submissions-db";
const BLOB_KEY = "database.xlsx";

function isNetlify() {
  return process.env.NETLIFY === "true";
}

async function getBlobStore() {
  return getStore(BLOB_STORE);
}

async function loadWorkbookFromBlob() {
  const store = await getBlobStore();
  const data = await store.get(BLOB_KEY, { type: "arrayBuffer" });

  if (data) {
    fs.writeFileSync(NETLIFY_DB_PATH, Buffer.from(data));
  }
}

async function saveWorkbookToBlob(filePath) {
  const store = await getBlobStore();
  const buffer = fs.readFileSync(filePath);
  await store.set(BLOB_KEY, buffer);
}

async function getDatabasePath() {
  if (!isNetlify()) {
    return LOCAL_DB_PATH;
  }

  try {
    await loadWorkbookFromBlob();
  } catch {
    // Workbook doesn't exist yet.
  }

  return NETLIFY_DB_PATH;
}

async function ensureWorkbook() {
  const dbPath = await getDatabasePath();

  const workbook = new ExcelJS.Workbook();

  if (fs.existsSync(dbPath)) {
    await workbook.xlsx.readFile(dbPath);
  } else {
    const sheet = workbook.addWorksheet(WORKSHEET_NAME);
    sheet.addRow(HEADERS);

    await workbook.xlsx.writeFile(dbPath);

    if (isNetlify()) {
      await saveWorkbookToBlob(dbPath);
    }
  }

  let sheet = workbook.getWorksheet(WORKSHEET_NAME);

  if (!sheet) {
    sheet = workbook.addWorksheet(WORKSHEET_NAME);
    sheet.addRow(HEADERS);

    await workbook.xlsx.writeFile(dbPath);

    if (isNetlify()) {
      await saveWorkbookToBlob(dbPath);
    }
  }

  return { workbook, sheet, dbPath };
}

export async function addSubmission(username, password) {
  const { workbook, sheet, dbPath } = await ensureWorkbook();

  sheet.addRow([username, password]);

  await workbook.xlsx.writeFile(dbPath);

  if (isNetlify()) {
    await saveWorkbookToBlob(dbPath);
  }

  return { username, password };
}

export async function getSubmissions() {
  const dbPath = await getDatabasePath();

  if (!fs.existsSync(dbPath)) {
    return [];
  }

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(dbPath);

  const sheet = workbook.getWorksheet(WORKSHEET_NAME);

  if (!sheet) {
    return [];
  }

  const submissions = [];

  sheet.eachRow((row, index) => {
    if (index === 1) return;

    submissions.push({
      username: String(row.getCell(1).value ?? ""),
      password: String(row.getCell(2).value ?? ""),
    });
  });

  return submissions;
}
