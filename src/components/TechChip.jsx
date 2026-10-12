import { useContent } from "../context/useContent";
import { resolveTechIcon } from "../data/techIcons";
import { MediaImage } from "./MediaImage";
import { TechIcon } from "./Icon";

export function TechChip({ name }) {
  const { content } = useContent();
  const icon = resolveTechIcon(name, content.skillGroups);

  return (
    <span className="tech-chip" title={name}>
      <span className={`tech-chip-mark${icon ? "" : " is-letter"}`}>
        {icon ? (
          <MediaImage
            slot={`skill:${icon}`}
            alt=""
            className="tech-chip-img"
            fallback={<TechIcon name={icon} />}
          />
        ) : (
          name.trim().slice(0, 1).toUpperCase()
        )}
      </span>
      <span className="tech-chip-name">{name}</span>
    </span>
  );
}
