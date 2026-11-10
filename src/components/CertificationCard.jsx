import { Badge } from "./Badge";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { issuerSlotFor } from "../data/mediaSlots";
import { MediaImage } from "./MediaImage";

function formatDate(value) {
  if (!value) return "";
  const [year, month] = value.split("-");
  if (!month) return year;
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function CertificationCard({ cert }) {
  const inProgress = cert.status === "in-progress";
  const year = String(cert.date || "").slice(0, 4);

  return (
    <article className={`cert-card story-card ${inProgress ? "is-progress" : ""}`}>
      <MediaImage
        slot={issuerSlotFor(cert)}
        alt=""
        className="story-logo"
        fallback={<span className="story-logo is-fallback">{(cert.issuer || "?").slice(0, 1)}</span>}
      />
      <div className="story-body">
        <div className="cert-top">
          <Badge tone={inProgress ? "warning" : "success"}>
            {inProgress ? "In progress" : "Completed"}
          </Badge>
          {cert.date ? <span className="muted">{formatDate(cert.date)}</span> : null}
        </div>
        <h3>{cert.title}</h3>
        <p className="cert-issuer">{cert.issuer}</p>
        {cert.summary ? <p>{cert.summary}</p> : null}
        {cert.credentialUrl ? (
          <Button href={cert.credentialUrl} variant="ghost" icon={<Icon name="external" size={16} />}>
            View credential
          </Button>
        ) : null}
      </div>
      {year ? <p className="story-year">{year}</p> : null}
    </article>
  );
}
