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

export async function login(password) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Login failed");
  return payload.token;
}

export async function saveContent(token, content) {
  const response = await fetch("/api/content", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(content),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Save failed");
  return payload;
}

export async function uploadResume(token, file) {
  const body = new FormData();
  body.append("file", file);
  const response = await fetch("/api/resume", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body,
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Upload failed");
  return payload;
}
