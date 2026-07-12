import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getStore } from "@netlify/blobs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_DB_PATH = path.join(__dirname, "database.xlsx");
const NETLIFY_DB_PATH = path.join("/tmp", "database.xlsx");
const WORKSHEET_NAME = "Submissions";
const HEADERS = ["username", "password"];
const BLOB_STORE = "submissions-db";
const BLOB_KEY = "database.xlsx";

function isNetlifyEnvironment() {
  return Boolean(process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

async function loadFromBlob() {
  const store = getStore(BLOB_STORE);
  return store.get(BLOB_KEY, { type: "arrayBuffer" });
}

async function saveToBlob(buffer) {
  const store = getStore(BLOB_STORE);
  await store.set(BLOB_KEY, buffer);
}

async function resolveDbPath() {
  if (!isNetlifyEnvironment()) {
    return LOCAL_DB_PATH;
  }

  try {
    const blobData = await loadFromBlob();
    if (blobData) {
      fs.writeFileSync(NETLIFY_DB_PATH, Buffer.from(blobData));
    }
  } catch {
    // Blob store may not exist yet on first request.
  }

  return NETLIFY_DB_PATH;
}

async function persistDbPath(dbPath) {
  if (!isNetlifyEnvironment()) {
    return;
  }

  const data = fs.readFileSync(dbPath);
  await saveToBlob(data);
}

async function ensureWorkbook() {
  const dbPath = await resolveDbPath();
  const workbook = new ExcelJS.Workbook();

  if (fs.existsSync(dbPath)) {
    await workbook.xlsx.readFile(dbPath);
    let sheet = workbook.getWorksheet(WORKSHEET_NAME);

    if (!sheet) {
      sheet = workbook.addWorksheet(WORKSHEET_NAME);
      sheet.addRow(HEADERS);
      await workbook.xlsx.writeFile(dbPath);
      await persistDbPath(dbPath);
    }

    return { workbook, dbPath };
  }

  const sheet = workbook.addWorksheet(WORKSHEET_NAME);
  sheet.addRow(HEADERS);
  await workbook.xlsx.writeFile(dbPath);
  await persistDbPath(dbPath);
  return { workbook, dbPath };
}

export async function addSubmission(username, password) {
  const { workbook, dbPath } = await ensureWorkbook();
  const sheet = workbook.getWorksheet(WORKSHEET_NAME);

  sheet.addRow([username, password]);
  await workbook.xlsx.writeFile(dbPath);
  await persistDbPath(dbPath);

  return { username, password };
}

export async function getSubmissions() {
  const dbPath = await resolveDbPath();

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

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;

    submissions.push({
      username: row.getCell(1).value?.toString() ?? "",
      password: row.getCell(2).value?.toString() ?? "",
    });
  });

  return submissions;
}
