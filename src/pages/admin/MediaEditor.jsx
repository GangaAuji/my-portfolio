import { listMediaSlots } from "../../data/mediaSlots";
import { MediaUpload } from "./MediaUpload";

export function MediaEditor({ content, onUpload, busy }) {
  const slots = listMediaSlots(content);
  const groups = [...new Set(slots.map((item) => item.group || "Files"))];

  return (
    <div className="admin-stack">
      <article className="admin-card">
        <h3>Images & logos</h3>
        <p className="muted">Uploads appear on the public site immediately. PNG, SVG, WebP, or JPG.</p>
      </article>
      {groups.map((group) => (
        <article key={group} className="admin-card">
          <h3>{group}</h3>
          <div className="admin-media-grid">
            {slots
              .filter((item) => (item.group || "Files") === group)
              .map((item) => (
                <MediaUpload
                  key={item.slot}
                  slot={item.slot}
                  label={item.label}
                  url={content.media?.[item.slot]}
                  onUpload={onUpload}
                  busy={busy}
                />
              ))}
          </div>
        </article>
      ))}
    </div>
  );
}
