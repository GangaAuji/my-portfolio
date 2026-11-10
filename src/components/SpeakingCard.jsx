import { Badge } from "./Badge";
import { Icon } from "./Icon";

export function SpeakingCard({ item }) {
  return (
    <article className="speaking-card">
      <p className="eyebrow">{item.role}</p>
      <h3>{item.title}</h3>
      {item.summary ? <p>{item.summary}</p> : null}
      <dl className="speaking-meta">
        {item.audience ? (
          <div>
            <dt><Icon name="users" size={14} /> Audience</dt>
            <dd>{item.audience}</dd>
          </div>
        ) : null}
        {item.duration ? (
          <div>
            <dt><Icon name="clock" size={14} /> Duration</dt>
            <dd>{item.duration}</dd>
          </div>
        ) : null}
        {item.recognition ? (
          <div>
            <dt><Icon name="award" size={14} /> Recognition</dt>
            <dd>{item.recognition}</dd>
          </div>
        ) : null}
      </dl>
      {!item.audience && !item.duration && !item.recognition ? (
        <Badge>Training</Badge>
      ) : null}
    </article>
  );
}
