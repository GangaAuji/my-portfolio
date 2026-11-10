import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import multer from "multer";
import {
  assertInside,
  assertProductionSecrets,
  bearerToken,
  clearLoginFailures,
  clearSessionCookie,
  clientAddress,
  cookieToken,
  imageMatchesType,
  isAllowedOrigin,
  loginAllowed,
  pruneSessions,
  readSession,
  recordLoginFailure,
  resumeMatchesType,
  securityHeaders,
  sessionRecord,
  setSessionCookie,
} from "./security.js";

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
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const TOKEN_SECRET = process.env.ADMIN_SECRET || "portfolio-admin-secret";

assertProductionSecrets();

const resumeUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 12 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok = /\.(pdf|docx)$/i.test(file.originalname);
    cb(ok ? null : new Error("Only PDF or DOCX files are allowed"), ok);
  },
});

const mediaUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok = /\.(png|svg|webp|jpe?g|gif)$/i.test(file.originalname);
    cb(ok ? null : new Error("Use PNG, SVG, WebP, JPG, or GIF"), ok);
  },
});

const app = express();
app.disable("x-powered-by");
app.use(securityHeaders);
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && isAllowedOrigin(origin, req)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  }
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  next();
});
app.use(express.json({ limit: "1mb" }));
app.use("/uploads", express.static(uploadDir, { dotfiles: "deny", index: false }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/content", (_req, res) => {
  res.json(readContent());
});

app.post("/api/login", (req, res) => {
  if (!hasAdminHeader(req)) {
    res.status(403).json({ error: "Sign-in refused" });
    return;
  }
  const address = clientAddress(req);
  const gate = loginAllowed(address);
  if (!gate.ok) {
    res.setHeader("Retry-After", String(gate.retryAfter));
    res.status(429).json({ error: "Too many attempts. Try again later." });
    return;
  }
  if (!ADMIN_PASSWORD) {
    res.status(503).json({ error: "Admin sign-in is not configured" });
    return;
  }
  const password = String(req.body?.password || "").slice(0, 200);
  if (!secureEqual(password, ADMIN_PASSWORD)) {
    recordLoginFailure(address);
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  clearLoginFailures(address);
  const token = createToken();
  setSessionCookie(req, res, token);
  res.json({ ok: true });
});

app.get("/api/session", (req, res) => {
  if (!currentSession(req)) {
    res.status(401).json({ error: "Sign in required" });
    return;
  }
  res.json({ ok: true });
});

app.post("/api/logout", (req, res) => {
  const token = presentedToken(req);
  if (token) revokeToken(token);
  clearSessionCookie(req, res);
  res.json({ ok: true });
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

app.post("/api/resume", requireAuth, resumeUpload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "Choose a PDF or DOCX file" });
    return;
  }

  const ext = path.extname(req.file.originalname).toLowerCase();
  if (!resumeMatchesType(req.file.buffer, ext)) {
    res.status(400).json({ error: "The file contents do not match a PDF or DOCX" });
    return;
  }
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

app.post("/api/media", requireAuth, mediaUpload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "Choose an image file" });
    return;
  }

  const slot = String(req.body?.slot || "");
  const rel = slotToRelPath(slot, path.extname(req.file.originalname).toLowerCase());
  if (!rel) {
    res.status(400).json({ error: "Unknown image slot" });
    return;
  }

  const ext = path.extname(rel).toLowerCase();
  if (!imageMatchesType(req.file.buffer, ext)) {
    res.status(400).json({ error: "The file contents do not match an allowed image" });
    return;
  }
  const abs = assertInside(publicDir, path.join(publicDir, rel));
  mkdirSync(path.dirname(abs), { recursive: true });
  writeFileSync(abs, req.file.buffer);

  const content = readContent();
  content.media = { ...(content.media || {}), [slot]: `/${rel.replace(/\\/g, "/")}?v=${Date.now()}` };
  writeContent(content);
  res.json({ slot, url: content.media[slot] });
});

app.use(express.static(publicDir, { dotfiles: "deny", index: false }));

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
  const message = /only pdf|docx|png|svg|webp|jpg|gif|file too large|too large/i.test(error.message || "")
    ? error.message
    : "Request failed";
  res.status(400).json({ error: message });
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

const CONTENT_LISTS = [
  "metrics",
  "impactHighlights",
  "experience",
  "skillGroups",
  "projects",
  "certifications",
  "education",
  "speaking",
  "navigation",
];

function sanitizeContent(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("Invalid content payload");
  }
  const current = readContent();
  const next = {
    profile: cleanProfile(input.profile, current.profile || {}),
    media: cleanMedia(input.media, current.media || {}),
    skillsSection: cleanSkillsSection(input.skillsSection, current.skillsSection || {}),
  };
  for (const key of CONTENT_LISTS) {
    next[key] = Array.isArray(input[key]) ? input[key] : current[key] || [];
  }
  return next;
}

function cleanProfile(profile, current) {
  const source = profile && typeof profile === "object" && !Array.isArray(profile) ? profile : {};
  const next = { ...current };
  for (const [key, value] of Object.entries(source)) {
    if (key === "__proto__" || key === "constructor" || key === "prototype") continue;
    if (key === "about") {
      next.about = {
        intro: clip(value?.intro),
        focus: clip(value?.focus),
        points: Array.isArray(value?.points) ? value.points.map((item) => clip(item, 400)).slice(0, 40) : [],
      };
      continue;
    }
    if (typeof value === "string") next[key] = clip(value);
  }
  if (!/^\/[A-Za-z0-9._-]+$/.test(next.resumeUrl || "")) next.resumeUrl = current.resumeUrl || "/resume.pdf";
  return next;
}

function cleanMedia(media, current) {
  const source = media && typeof media === "object" && !Array.isArray(media) ? media : {};
  const next = {};
  for (const [key, value] of Object.entries({ ...current, ...source })) {
    if (!/^[a-z0-9:_-]{1,80}$/i.test(key)) continue;
    if (typeof value !== "string" || !value.startsWith("/") || value.includes("..") || value.includes("\\")) continue;
    next[key] = value.slice(0, 300);
  }
  return next;
}

function cleanSkillsSection(section, current) {
  const source = section && typeof section === "object" && !Array.isArray(section) ? section : current;
  return {
    title: clip(source.title, 160),
    description: clip(source.description, 600),
  };
}

function clip(value, max = 4000) {
  return String(value || "").slice(0, max);
}

function createToken() {
  const token = randomBytes(32).toString("hex");
  const sessions = pruneSessions(readSessions());
  sessions[token] = sessionRecord();
  writeFileSync(sessionFile, JSON.stringify(sessions));
  return token;
}

function presentedToken(req) {
  return cookieToken(req) || bearerToken(req);
}

function currentSession(req) {
  const token = presentedToken(req);
  if (!token) return null;
  const sessions = readSessions();
  const next = readSession(sessions, token);
  if (!next) return null;
  sessions[token] = next;
  writeFileSync(sessionFile, JSON.stringify(pruneSessions(sessions)));
  return token;
}

function revokeToken(token) {
  const sessions = readSessions();
  delete sessions[token];
  writeFileSync(sessionFile, JSON.stringify(sessions));
}

function requireAuth(req, res, next) {
  if (!hasAdminHeader(req)) {
    res.status(403).json({ error: "Request refused" });
    return;
  }
  if (!currentSession(req)) {
    res.status(401).json({ error: "Sign in required" });
    return;
  }
  next();
}

function hasAdminHeader(req) {
  return req.get("x-requested-with") === "portfolio-admin";
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

function slotToRelPath(slot, ext) {
  const allowed = new Set([".png", ".svg", ".webp", ".jpg", ".jpeg", ".gif"]);
  if (!allowed.has(ext)) return null;
  if (slot === "profile") return path.join("assets", "profile", `photo${ext}`);
  if (slot === "hero") return path.join("assets", "hero", `infrastructure${ext}`);
  const match = /^(company|institution|project|issuer|skill):([a-z0-9._-]+)$/i.exec(slot);
  if (!match) return null;
  const folder = {
    company: "companies",
    institution: "institutions",
    project: "projects",
    issuer: "issuers",
    skill: "skills",
  }[match[1]];
  return path.join("assets", folder, `${match[2]}${ext}`);
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
