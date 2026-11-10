import { siteConfig } from "../../site.config.js";

export function assetUrl(path = "") {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${base}${String(path).replace(/^\//, "")}`;
}

export const site = {
  githubUsername: siteConfig.githubUsername,
  repositoryName: siteConfig.repositoryName,
  canonicalUrl: `https://${siteConfig.githubUsername.toLowerCase()}.github.io/${siteConfig.repositoryName}/`,
  sourceRepo: `https://github.com/${siteConfig.githubUsername}/${siteConfig.repositoryName}`,
};
