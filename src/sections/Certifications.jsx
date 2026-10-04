import { useEffect, useMemo, useState } from "react";
import { Icon } from "../components/Icon";
import { MediaImage } from "../components/MediaImage";
import { issuerSlotFor } from "../data/mediaSlots";
import { useContent } from "../context/useContent";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "cloud", label: "Cloud & Infrastructure" },
  { id: "containers", label: "Containers & Orchestration" },
  { id: "education", label: "Formal Education" },
];

function formatDate(value) {
  if (!value) return "";
  if (/^\d{4}$/.test(value)) return value;
  const [year, month] = String(value).split("-");
  if (!month) return year;
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function certLane(cert) {
  const text = `${cert.id || ""} ${cert.title || ""} ${cert.issuer || ""}`.toLowerCase();
  if (/kubernetes|k8s|docker|container|cncf|helm|orchestration/.test(text)) return "containers";
  if (/aws|amazon|cloud|terraform|infrastructure|linux|network/.test(text)) return "cloud";
  return "other";
}

function certTag(cert) {
  const lane = certLane(cert);
  if (lane === "containers") return "Kubernetes";
  if (lane === "cloud") return "Cloud";
  if (/sql|data|analytics/i.test(`${cert.title} ${cert.summary}`)) return "Analytics";
  return "Credential";
}

export function Certifications({ initialFilter = "all" }) {
  const { content } = useContent();
  const certifications = content.certifications || [];
  const education = content.education || [];
  const [filter, setFilter] = useState(FILTERS.some((item) => item.id === initialFilter) ? initialFilter : "all");

  const certs = useMemo(() => {
    if (filter === "education") return [];
    if (filter === "all") return certifications;
    return certifications.filter((cert) => certLane(cert) === filter);
  }, [certifications, filter]);

  const studies = filter === "all" || filter === "education" ? education : [];
  const [activeId, setActiveId] = useState(certs[0]?.id || "");

  useEffect(() => {
    if (!certs.some((cert) => cert.id === activeId)) setActiveId(certs[0]?.id || "");
  }, [certs, activeId]);

  const active = certs.find((cert) => cert.id === activeId) || certs[0];

  return (
    <section className="section credentials">
      <header className="section-heading">
        <h2>Education and Certifications</h2>
        <p className="section-copy">
          A commitment to continuous learning, cloud-native architecture, and system engineering fundamentals.
        </p>
      </header>

      <div className="cred-filters" role="toolbar" aria-label="Filter education and certifications">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={filter === item.id ? "is-on" : ""}
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filter !== "education" ? (
        <div className="cred-block">
          <h3>Professional Certifications</h3>
          {active ? (
            <div className="cert-showcase">
              <div className="cert-index" role="tablist" aria-label="Professional Certifications">
                {certs.map((cert) => {
                  const selected = cert.id === active.id;
                  return (
                    <button
                      key={cert.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      className={selected ? "is-on" : ""}
                      onClick={() => setActiveId(cert.id)}
                    >
                      <MediaImage
                        slot={issuerSlotFor(cert)}
                        alt=""
                        className="cred-logo"
                        fallback={<span className="cred-logo is-fallback">{(cert.issuer || "?").slice(0, 1)}</span>}
                      />
                      <span>{cert.title}</span>
                    </button>
                  );
                })}
              </div>
              <article className="cert-sheet" role="tabpanel">
                <div className="cert-sheet-seal">
                  <MediaImage
                    slot={issuerSlotFor(active)}
                    alt=""
                    className="cert-seal"
                    fallback={<span className="cert-seal is-fallback">{(active.issuer || "?").slice(0, 1)}</span>}
                  />
                </div>
                <p className="cert-kicker">{certTag(active)}</p>
                <h4>{active.title}</h4>
                <p className="cred-issuer">{active.issuer}</p>
                <p className="cred-meta">
                  {active.status === "in-progress"
                    ? "In progress"
                    : formatDate(active.date)
                      ? `Issued ${formatDate(active.date)}`
                      : "Completed"}
                </p>
                {active.summary ? <p className="cred-summary">{active.summary}</p> : null}
                {active.credentialUrl ? (
                  <a className="cred-link" href={active.credentialUrl} target="_blank" rel="noreferrer">
                    Verify credential
                    <Icon name="external" size={15} />
                  </a>
                ) : null}
              </article>
            </div>
          ) : (
            <p className="cred-empty">No certifications in this category yet.</p>
          )}
        </div>
      ) : null}

      {studies.length ? (
        <div className="cred-block" id="study">
          <h3>Formal education</h3>
          <ol className="cred-timeline">
            {studies.map((item) => {
              const start = formatDate(item.startDate);
              const end = formatDate(item.endDate);
              const range = [start, end].filter(Boolean).join(" — ");
              return (
                <li key={item.id}>
                  <article>
                    <p className="cred-year">{end || start || item.status}</p>
                    <h4>{item.degree}</h4>
                    <p className="cred-issuer">
                      {item.institution}
                      {item.location ? ` · ${item.location}` : ""}
                    </p>
                    {range ? <p className="cred-meta">{range}</p> : null}
                    {item.notes ? (
                      <details>
                        <summary>Study notes</summary>
                        <p>{item.notes}</p>
                      </details>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      ) : null}
    </section>
  );
}
