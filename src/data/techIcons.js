/**
 * Picks an icon key for a technology name such as "CodePipeline" or "MySQL".
 *
 * Order of preference:
 *  1. a skill with the same name (so icons uploaded for a skill in the admin panel are reused)
 *  2. a built-in alias for very common names
 *  3. a skill whose words include every word of the technology
 *  4. AWS service naming (CodeBuild, CodeCommit, ...)
 * Returns null when nothing fits, so the caller can show a letter instead.
 */

const BUILTIN = {
  aws: "aws",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  jenkins: "jenkins",
  terraform: "terraform",
  linux: "linux",
  ubuntu: "ubuntu",
  python: "python",
  docker: "docker",
  kubernetes: "kubernetes",
  k8s: "kubernetes",
  nginx: "nginx",
  cloudflare: "cloudflare",
  mysql: "database",
  sql: "database",
  postgres: "database",
  postgresql: "database",
  mongodb: "database",
  dynamodb: "database",
  rds: "database",
  iam: "shield",
  vpc: "network",
  dns: "network",
  "ci/cd": "pipeline",
  cicd: "pipeline",
  bash: "terminal",
  shell: "terminal",
  "shell/bash": "terminal",
};

function words(text) {
  return String(text)
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

export function resolveTechIcon(name, skillGroups = []) {
  const key = String(name || "").trim().toLowerCase();
  if (!key) return null;

  const skills = skillGroups.flatMap((group) => group.items || []).filter((item) => item.name && item.icon);

  const exact = skills.find((item) => item.name.trim().toLowerCase() === key);
  if (exact) return exact.icon;

  const alias = BUILTIN[key.replace(/\s+/g, "")];
  if (alias) return alias;

  const wanted = words(key);
  if (wanted.length) {
    const partial = skills
      .filter((item) => {
        const have = words(item.name);
        return wanted.every((word) => have.includes(word));
      })
      .sort((a, b) => a.name.length - b.name.length)[0];
    if (partial) return partial.icon;
  }

  if (/^(aws|amazon|code(commit|build|deploy|pipeline|artifact))/.test(key.replace(/\s+/g, ""))) {
    return "aws";
  }

  return null;
}
