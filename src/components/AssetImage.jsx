import { useState } from "react";

const EXTS = [".png", ".svg", ".webp", ".jpg"];

export function AssetImage({ base, alt = "", className = "", fallback = null }) {
  const [index, setIndex] = useState(0);

  if (!base || index >= EXTS.length) return fallback;

  const prefix = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const src = `${prefix}${String(base).replace(/^\//, "")}${EXTS[index]}`;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setIndex((current) => current + 1)}
    />
  );
}
