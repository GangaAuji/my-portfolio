export function assetUrl(path = "") {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${base}${String(path).replace(/^\//, "")}`;
}

export async function fetchContent() {
  try {
    const api = await fetch("/api/content", { headers: { Accept: "application/json" } });
    if (api.ok) return api.json();
  } catch {
    // Fall through to static JSON for GitHub Pages / offline preview.
  }

  const staticRes = await fetch(assetUrl("content.json"), { headers: { Accept: "application/json" } });
  if (!staticRes.ok) {
    throw new Error("Could not load portfolio content");
  }
  return staticRes.json();
}

const adminHeaders = { "X-Requested-With": "portfolio-admin" };

async function adminFetch(path, options = {}) {
  let response;
  try {
    response = await fetch(path, {
      ...options,
      credentials: "include",
      headers: { Accept: "application/json", ...adminHeaders, ...(options.headers || {}) },
    });
  } catch {
    throw new Error("The editor is unavailable on this public site.");
  }
  const payload = await response.json().catch(() => ({}));
  if (response.status === 404) {
    throw new Error("The editor is unavailable on this public site.");
  }
  if (!response.ok) throw new Error(payload.error || "Request failed");
  return payload;
}

export async function checkSession() {
  try {
    await adminFetch("/api/session");
    return true;
  } catch {
    return false;
  }
}

export async function login(password) {
  await adminFetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
}

export async function logout() {
  try {
    await adminFetch("/api/logout", { method: "POST" });
  } catch {
    // The local session is cleared even if the server is already gone.
  }
}

export async function saveContent(content) {
  return adminFetch("/api/content", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content),
  });
}

export async function uploadMedia(slot, file) {
  const body = new FormData();
  body.append("slot", slot);
  body.append("file", file);
  return adminFetch("/api/media", { method: "POST", body });
}

export async function uploadResume(file) {
  const body = new FormData();
  body.append("file", file);
  return adminFetch("/api/resume", { method: "POST", body });
}
