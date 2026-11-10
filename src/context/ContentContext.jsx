import { useEffect, useMemo, useState } from "react";
import { fetchContent } from "../api/client";
import { ContentContext, fallbackContent } from "./useContent";

export function ContentProvider({ children }) {
  const [content, setContent] = useState(fallbackContent);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const next = await fetchContent();
      setContent(next);
    } catch {
      setContent(fallbackContent);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const value = useMemo(
    () => ({ content, loading, refresh, setContent }),
    [content, loading]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}
