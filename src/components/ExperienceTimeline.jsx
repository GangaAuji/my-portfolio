import { MediaImage } from "./MediaImage";

function yearOf(item) {
  const value = item.endDate || item.startDate || "";
  const match = String(value).match(/^(\d{4})/);
  if (match) return match[1];
  if (item.current) return "Now";
  return "";
}

export function ExperienceTimeline({ items = [] }) {
  if (!items.length) return null;

  return (
    <ol className="career-rail">
      {items.map((item) => (
        <li key={item.id} className="career-node">
          <MediaImage
            slot={`company:${item.id}`}
            alt=""
            className="brand-logo"
            fallback={<span className="brand-logo is-fallback">{(item.company || "?").slice(0, 1)}</span>}
          />
          <span className="career-dot" aria-hidden="true" />
          <strong>{item.company || item.role}</strong>
          <span>{yearOf(item)}</span>
        </li>
      ))}
    </ol>
  );
}
