import { Badge } from "./Badge";
import { MediaImage } from "./MediaImage";

export function EducationCard({ item }) {
  const range = [item.startDate, item.endDate].filter(Boolean).join(" — ");
  const year = String(item.endDate || item.startDate || "").slice(0, 4);

  return (
    <article className="education-card story-card">
      <MediaImage
        slot={`institution:${item.id}`}
        alt=""
        className="story-logo"
        fallback={<span className="story-logo is-fallback">{(item.institution || "?").slice(0, 1)}</span>}
      />
      <div className="story-body">
        <div className="education-top">
          {range ? <p className="eyebrow">{range}</p> : null}
          {item.status ? <Badge>{item.status}</Badge> : null}
        </div>
        <h3>{item.degree}</h3>
        <p className="education-org">{item.institution}</p>
        {item.location ? <p className="muted">{item.location}</p> : null}
        {item.notes ? <p>{item.notes}</p> : null}
      </div>
      {year ? <p className="story-year">{year}</p> : null}
    </article>
  );
}
