import { Badge } from "./Badge";
import { Icon } from "./Icon";

function formatRange(startDate, endDate, current) {
  if (!startDate && !endDate && current) return "Current";
  if (!startDate && !endDate) return "";

  const start = formatDate(startDate);
  const end = current ? "Present" : formatDate(endDate);
  if (start && end) return `${start} — ${end}`;
  return start || end;
}

function formatDate(value) {
  if (!value) return "";
  if (/^\d{4}$/.test(value)) return value;
  const [year, month] = value.split("-");
  if (!month) return year;
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function ExperienceCard({ item }) {
  const range = formatRange(item.startDate, item.endDate, item.current);

  return (
    <article className={`experience-card ${item.current ? "is-current" : ""}`}>
      <div className="experience-meta">
        {range ? <p className="experience-dates">{range}</p> : null}
        {item.current ? (
          <Badge tone="accent">
            <span className="status-dot" aria-hidden="true" />
            Current
          </Badge>
        ) : null}
      </div>
      <h3>{item.role}</h3>
      <p className="experience-org">
        {item.company ? <span>{item.company}</span> : null}
        {item.company && item.location ? <span aria-hidden="true"> · </span> : null}
        {item.location ? (
          <span className="muted">
            <Icon name="location" size={14} /> {item.location}
          </span>
        ) : null}
      </p>
      {item.description ? <p className="experience-desc">{item.description}</p> : null}
      {item.achievements?.length ? (
        <ul className="achievement-list">
          {item.achievements.map((achievement) => (
            <li key={achievement}>
              <Icon name="check" size={16} />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {item.technologies?.length ? (
        <div className="chip-row">
          {item.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      ) : null}
    </article>
  );
}
