import { useContent } from "../context/useContent";
import { CertificationCard } from "../components/CertificationCard";
import { SectionHeading } from "../components/SectionHeading";

export function Certifications() {
  const { content } = useContent();
  const inProgress = content.certifications.filter((item) => item.status === "in-progress");
  const completed = content.certifications.filter((item) => item.status !== "in-progress");

  return (
    <section className="section">
      <SectionHeading title="Certifications" />
      {inProgress.length ? (
        <div className="cert-block">
          <h3 className="cert-group-title">In progress</h3>
          <ol className="story-timeline">
            {inProgress.map((cert) => (
              <li key={cert.id}>
                <CertificationCard cert={cert} />
              </li>
            ))}
          </ol>
        </div>
      ) : null}
      {completed.length ? (
        <div className="cert-block">
          <h3 className="cert-group-title">Completed</h3>
          <ol className="story-timeline">
            {completed.map((cert) => (
              <li key={cert.id}>
                <CertificationCard cert={cert} />
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </section>
  );
}
