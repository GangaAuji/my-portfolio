import { useContent } from "../context/useContent";
import { assetUrl } from "../api/client";
import { defaultBaseFor } from "../data/mediaSlots";
import { AssetImage } from "./AssetImage";
import { useState } from "react";

export function MediaImage({ slot, base, alt = "", className = "", fallback = null }) {
  const { content } = useContent();
  const uploaded = content.media?.[slot];
  const resolvedBase = base || defaultBaseFor(slot);
  const [broken, setBroken] = useState(false);

  if (uploaded && !broken) {
    return (
      <img
        src={assetUrl(uploaded)}
        alt={alt}
        className={className}
        onError={() => setBroken(true)}
      />
    );
  }

  return (
    <AssetImage
      base={resolvedBase}
      alt={alt}
      className={className}
      fallback={fallback}
    />
  );
}
