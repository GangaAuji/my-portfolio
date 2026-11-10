import { createContext, useContext } from "react";
import fallback from "../../server/data/content.json";

export const fallbackContent = fallback;

export const ContentContext = createContext({
  content: fallback,
  loading: true,
  refresh: async () => {},
  setContent: () => {},
});

export function useContent() {
  return useContext(ContentContext);
}

export function useResumeHref() {
  const { content } = useContent();
  const url = content.profile.resumeUrl || "/resume.pdf";
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return {
    href: `${base}${String(url).replace(/^\//, "")}`,
    fileName: content.profile.resumeFileName || "Ganga-Auji-Resume.pdf",
  };
}
