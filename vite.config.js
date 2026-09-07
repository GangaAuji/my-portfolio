import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function getBasePath() {
  if (process.env.VITE_BASE !== undefined) {
    return process.env.VITE_BASE;
  }

  if (process.env.GITHUB_REPOSITORY) {
    const repo = process.env.GITHUB_REPOSITORY.split("/")[1];
    return `/${repo}/`;
  }

  return "/";
}

export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
  server: {
    port: 5173,
    proxy: {
      "/api": "http://127.0.0.1:4174",
    },
  },
  preview: {
    port: 4173,
    proxy: {
      "/api": "http://127.0.0.1:4174",
    },
  },
});
