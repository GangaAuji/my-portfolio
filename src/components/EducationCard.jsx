import { Badge } from "./Badge";

export function EducationCard({ item }) {
  const range = [item.startDate, item.endDate].filter(Boolean).join(" — ");

  return (
    <article className="education-card">
      <div className="education-top">
        {range ? <p className="eyebrow">{range}</p> : null}
        {item.status ? <Badge>{item.status}</Badge> : null}
      </div>
      <h3>{item.degree}</h3>
      <p className="education-org">{item.institution}</p>
      {item.location ? <p className="muted">{item.location}</p> : null}
      {item.notes ? <p>{item.notes}</p> : null}
    </article>
  );
}
