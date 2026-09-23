import { ASSETS } from "./assetMap";

export function issuerSlotFor(cert = {}) {
  const issuer = String(cert.issuer || "").toLowerCase();
  if (issuer.includes("udemy")) return "issuer:udemy";
  if (issuer.includes("amazon") || issuer.includes("aws")) return "issuer:aws";
  const id = String(cert.id || "other").replace(/[^a-z0-9-]/gi, "");
  return `issuer:${id}`;
}

export function defaultBaseFor(slot = "") {
  if (slot === "profile") return ASSETS.profile;
  if (slot === "hero") return ASSETS.hero;
  const [kind, id] = slot.split(":");
  if (kind === "company") return ASSETS.companies[id];
  if (kind === "institution") return ASSETS.institutions[id] || ASSETS.institutions["msc-data-analytics"];
  if (kind === "project") return ASSETS.projects[id];
  if (kind === "skill") return ASSETS.skills[id];
  if (kind === "issuer") {
    if (id === "udemy") return ASSETS.issuers["sql-udemy"];
    if (id === "aws") return ASSETS.issuers["aws-ccp"];
    return ASSETS.issuers[id];
  }
  return null;
}

export function listMediaSlots(content = {}) {
  const slots = [
    { slot: "profile", label: "Profile photo", group: "Site" },
    { slot: "hero", label: "Hero illustration", group: "Site" },
  ];

  for (const item of content.experience || []) {
    slots.push({ slot: `company:${item.id}`, label: item.company || item.role || "Company", group: "Companies" });
  }

  for (const item of content.education || []) {
    slots.push({
      slot: `institution:${item.id}`,
      label: item.institution || item.degree || "Institution",
      group: "Education",
    });
  }

  const issuers = new Map();
  for (const cert of content.certifications || []) {
    const slot = issuerSlotFor(cert);
    if (!issuers.has(slot)) issuers.set(slot, cert.issuer || slot);
  }
  for (const [slot, label] of issuers) {
    slots.push({ slot, label, group: "Cert issuers" });
  }

  for (const project of content.projects || []) {
    slots.push({ slot: `project:${project.id}`, label: project.title || "Project", group: "Projects" });
  }

  const icons = new Set();
  for (const group of content.skillGroups || []) {
    for (const item of group.items || []) {
      if (!item.icon || icons.has(item.icon)) continue;
      icons.add(item.icon);
      slots.push({ slot: `skill:${item.icon}`, label: item.name || item.icon, group: "Skill icons" });
    }
  }

  return slots;
}
