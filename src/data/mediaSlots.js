import { ASSETS } from "./assetMap";

export function issuerSlotFor(cert = {}) {
  const id = String(cert.id || "other").replace(/[^a-z0-9._-]/gi, "") || "other";
  return `issuer:${id}`;
}

export function defaultBaseFor(slot = "") {
  if (slot === "profile") return ASSETS.profile;
  if (slot === "hero") return ASSETS.hero;
  const [kind, id] = slot.split(":");
  if (kind === "company") return ASSETS.companies[id];
  if (kind === "institution") return ASSETS.institutions[id] || ASSETS.institutions["msc-data-analytics"];
  if (kind === "project") return ASSETS.projects[id];
  if (kind === "skill") return ASSETS.skills[id] || (id ? `assets/skills/${id}` : null);
  if (kind === "issuer") return ASSETS.issuers[id] || null;
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

  for (const cert of content.certifications || []) {
    slots.push({
      slot: issuerSlotFor(cert),
      label: cert.title || cert.issuer || "Certification",
      group: "Certifications",
    });
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
