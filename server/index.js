import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import express from "express";
import multer from "multer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const dataDir = path.join(__dirname, "data");
const uploadDir = path.join(__dirname, "uploads");
const publicDir = path.join(rootDir, "public");
const distDir = path.join(rootDir, "dist");
const contentFile = path.join(dataDir, "content.json");
const publicContentFile = path.join(publicDir, "content.json");
const sessionFile = path.join(dataDir, "sessions.json");

mkdirSync(dataDir, { recursive: true });
mkdirSync(uploadDir, { recursive: true });
mkdirSync(publicDir, { recursive: true });

loadEnv(path.join(rootDir, ".env"));

const PORT = Number(process.env.PORT || 4174);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ChangeMe@2026";
const TOKEN_SECRET = process.env.ADMIN_SECRET || "portfolio-admin-secret";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 12 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok = /\.(pdf|docx)$/i.test(file.originalname);
    cb(ok ? null : new Error("Only PDF or DOCX files are allowed"), ok);
  },
});

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(uploadDir));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/content", (_req, res) => {
  res.json(readContent());
});

app.post("/api/login", (req, res) => {
  const password = String(req.body?.password || "");
  if (!secureEqual(password, ADMIN_PASSWORD)) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }
  const token = createToken();
  res.json({ token });
});

app.post("/api/content", requireAuth, (req, res) => {
  try {
    const next = sanitizeContent(req.body);
    writeContent(next);
    res.json(next);
  } catch (error) {
    res.status(400).json({ error: error.message || "Could not save content" });
  }
});

app.post("/api/resume", requireAuth, upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "Choose a PDF or DOCX file" });
    return;
  }

  const ext = path.extname(req.file.originalname).toLowerCase();
  const fileName = `resume${ext}`;
  const diskPath = path.join(uploadDir, fileName);
  const publicPath = path.join(publicDir, fileName);
  writeFileSync(diskPath, req.file.buffer);
  writeFileSync(publicPath, req.file.buffer);

  const content = readContent();
  content.profile.resumeUrl = `/${fileName}`;
  content.profile.resumeFileName = ext === ".pdf" ? "Ganga-Auji-Resume.pdf" : "Ganga-Auji-Resume.docx";
  writeContent(content);

  res.json({
    resumeUrl: content.profile.resumeUrl,
    resumeFileName: content.profile.resumeFileName,
  });
});

app.use(express.static(publicDir));

if (existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get(/^\/(?!api\/).*/, (req, res, next) => {
    if (path.extname(req.path)) {
      next();
      return;
    }
    res.sendFile(path.join(distDir, "index.html"));
  });
}

app.use((error, _req, res, _next) => {
  res.status(400).json({ error: error.message || "Request failed" });
});

const server = http.createServer(app);

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Stop the other process or change PORT in .env.`);
  } else {
    console.error(error);
  }
  process.exit(1);
});

server.listen(PORT, "127.0.0.1", () => {
  syncPublicContent();
  syncPublicResume();
  console.log(`Portfolio API running on http://127.0.0.1:${PORT}`);
});

function readContent() {
  return JSON.parse(readFileSync(contentFile, "utf8"));
}

function writeContent(content) {
  const serialized = `${JSON.stringify(content, null, 2)}\n`;
  writeFileSync(contentFile, serialized);
  writeFileSync(publicContentFile, serialized);
}

function syncPublicContent() {
  if (existsSync(contentFile)) {
    copyFileSync(contentFile, publicContentFile);
  }
}

function syncPublicResume() {
  const content = readContent();
  const resumeName = path.basename(content.profile.resumeUrl || "resume.pdf");
  const fromPublic = path.join(publicDir, resumeName);
  const fromUploads = path.join(uploadDir, resumeName);
  if (existsSync(fromPublic) && !existsSync(fromUploads)) {
    copyFileSync(fromPublic, fromUploads);
  }
}

function sanitizeContent(input) {
  if (!input || typeof input !== "object") {
    throw new Error("Invalid content payload");
  }
  const current = readContent();
  return {
    ...current,
    ...input,
    profile: { ...current.profile, ...(input.profile || {}) },
  };
}

function createToken() {
  const token = randomBytes(24).toString("hex");
  const sessions = readSessions();
  sessions[token] = Date.now() + 1000 * 60 * 60 * 12;
  writeFileSync(sessionFile, JSON.stringify(sessions));
  return token;
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.replace(/^Bearer\s+/i, "");
  const sessions = readSessions();
  if (!token || !sessions[token] || sessions[token] < Date.now()) {
    res.status(401).json({ error: "Sign in required" });
    return;
  }
  next();
}

function readSessions() {
  if (!existsSync(sessionFile)) return {};
  try {
    return JSON.parse(readFileSync(sessionFile, "utf8"));
  } catch {
    return {};
  }
}

function secureEqual(a, b) {
  const left = scryptSync(String(a), TOKEN_SECRET, 32);
  const right = scryptSync(String(b), TOKEN_SECRET, 32);
  return timingSafeEqual(left, right);
}

function loadEnv(file) {
  if (!existsSync(file)) return;
  const text = readFileSync(file, "utf8");
  for (const line of text.split(/\r?\n/)) {
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const idx = line.indexOf("=");
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = value;
  }
}
