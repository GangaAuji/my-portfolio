import path from "node:path";

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_FAILURES = 8;
const SESSION_MS = 8 * 60 * 60 * 1000;
const IDLE_MS = 30 * 60 * 1000;

const attempts = new Map();

export function clientAddress(req) {
  return req.socket?.remoteAddress || "unknown";
}

export function loginAllowed(key) {
  const now = Date.now();
  const row = attempts.get(key);
  if (!row || now > row.reset) return { ok: true };
  if (row.count >= LOGIN_MAX_FAILURES) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((row.reset - now) / 1000)) };
  }
  return { ok: true };
}

export function recordLoginFailure(key) {
  const now = Date.now();
  const row = attempts.get(key);
  if (!row || now > row.reset) {
    attempts.set(key, { count: 1, reset: now + LOGIN_WINDOW_MS });
    return;
  }
  row.count += 1;
}

export function clearLoginFailures(key) {
  attempts.delete(key);
}

export function sessionRecord(now = Date.now()) {
  return { expires: now + SESSION_MS, idle: now + IDLE_MS };
}

export function readSession(sessions, token, now = Date.now()) {
  const record = sessions[token];
  if (!record) return null;
  const expires = typeof record === "number" ? record : record.expires;
  const idle = typeof record === "number" ? record : record.idle;
  if (!expires || !idle || expires <= now || idle <= now) return null;
  return { expires, idle: now + IDLE_MS };
}

export function pruneSessions(sessions, now = Date.now()) {
  for (const [token, record] of Object.entries(sessions)) {
    const expires = typeof record === "number" ? record : record?.expires;
    const idle = typeof record === "number" ? record : record?.idle;
    if (!expires || !idle || expires <= now || idle <= now) delete sessions[token];
  }
  return sessions;
}

export function cookieToken(req) {
  const header = req.headers.cookie || "";
  const match = header.match(/(?:^|;\s*)portfolio_admin=([^;]+)/);
  if (!match) return "";
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return "";
  }
}

export function bearerToken(req) {
  const header = req.headers.authorization || "";
  const match = /^Bearer\s+([a-f0-9]{32,})$/i.exec(header);
  return match ? match[1] : "";
}

export function setSessionCookie(req, res, token) {
  const secure = req.secure || req.headers["x-forwarded-proto"] === "https";
  const parts = [
    `portfolio_admin=${encodeURIComponent(token)}`,
    "HttpOnly",
    "SameSite=Strict",
    "Path=/",
    `Max-Age=${SESSION_MS / 1000}`,
  ];
  if (secure) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

export function clearSessionCookie(req, res) {
  const secure = req.secure || req.headers["x-forwarded-proto"] === "https";
  const parts = ["portfolio_admin=", "HttpOnly", "SameSite=Strict", "Path=/", "Max-Age=0"];
  if (secure) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

export function isAllowedOrigin(origin, req) {
  if (!origin) return true;
  const extra = String(process.env.ADMIN_ORIGINS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  if (extra.includes(origin)) return true;
  let url;
  try {
    url = new URL(origin);
  } catch {
    return false;
  }
  if (url.hostname === "localhost" || url.hostname === "127.0.0.1") return true;
  return Boolean(req.headers.host) && url.host === req.headers.host;
}

export function securityHeaders(req, res, next) {
  res.removeHeader("X-Powered-By");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  res.setHeader("X-Permitted-Cross-Domain-Policies", "none");
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "img-src 'self' data:",
      "font-src 'self' https://fonts.gstatic.com data:",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "script-src 'self'",
      "connect-src 'self'",
    ].join("; "),
  );
  if (req.secure || req.headers["x-forwarded-proto"] === "https") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
  if (req.path.startsWith("/api/")) {
    res.setHeader("Cache-Control", "no-store");
  }
  next();
}

export function assertInside(root, target) {
  const base = path.resolve(root);
  const resolved = path.resolve(target);
  if (resolved !== base && !resolved.startsWith(`${base}${path.sep}`)) {
    throw new Error("Invalid upload path");
  }
  return resolved;
}

export function imageMatchesType(buffer, ext) {
  if (ext === ".svg") return safeSvg(buffer);
  if (ext === ".png") return startsWith(buffer, [0x89, 0x50, 0x4e, 0x47]);
  if (ext === ".jpg" || ext === ".jpeg") return startsWith(buffer, [0xff, 0xd8, 0xff]);
  if (ext === ".gif") {
    const head = buffer.subarray(0, 6).toString("ascii");
    return head === "GIF87a" || head === "GIF89a";
  }
  if (ext === ".webp") {
    return buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP";
  }
  return false;
}

export function resumeMatchesType(buffer, ext) {
  if (ext === ".pdf") return buffer.subarray(0, 5).toString("ascii") === "%PDF-";
  if (ext === ".docx") return startsWith(buffer, [0x50, 0x4b, 0x03, 0x04]);
  return false;
}

function startsWith(buffer, bytes) {
  if (buffer.length < bytes.length) return false;
  return bytes.every((byte, index) => buffer[index] === byte);
}

function safeSvg(buffer) {
  const text = buffer.toString("utf8");
  if (!text.trim() || text.includes("\0") || !/<svg[\s>]/i.test(text)) return false;
  return !/<script|<\/script|javascript:|data:\s*text\/html|<foreignObject|<iframe|<embed|<object|<!ENTITY|\son[a-z]+\s*=/i.test(
    text,
  );
}

const WEAK_SECRETS = new Set(["ChangeMe@2026", "password", "admin", "portfolio-admin-secret"]);

export function assertProductionSecrets() {
  if (process.env.NODE_ENV !== "production") {
    if (!process.env.ADMIN_PASSWORD || WEAK_SECRETS.has(process.env.ADMIN_PASSWORD)) {
      console.warn("Admin password is still a default value. Change ADMIN_PASSWORD before exposing this server.");
    }
    return;
  }
  const password = process.env.ADMIN_PASSWORD || "";
  const secret = process.env.ADMIN_SECRET || "";
  if (password.length < 12 || WEAK_SECRETS.has(password)) {
    throw new Error("Refusing to start: set a unique ADMIN_PASSWORD of at least 12 characters.");
  }
  if (secret.length < 24 || WEAK_SECRETS.has(secret)) {
    throw new Error("Refusing to start: set ADMIN_SECRET to a random string of at least 24 characters.");
  }
}
