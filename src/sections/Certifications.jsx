import { useContent } from "../context/useContent";
import { CertificationCard } from "../components/CertificationCard";
import { SectionHeading } from "../components/SectionHeading";

export function Certifications() {
  const { content } = useContent();
  const inProgress = content.certifications.filter((item) => item.status === "in-progress");
  const completed = content.certifications.filter((item) => item.status !== "in-progress");

  return (
    <section className="section">
      <SectionHeading
        eyebrow="05 / Certifications"
        title="Verified cloud credentials"
        description="Completed certifications are shown separately from work still in progress."
      />
      {inProgress.length ? (
        <div className="cert-block">
          <h3 className="cert-group-title">In progress</h3>
          <div className="certs-grid">
            {inProgress.map((cert) => (
              <CertificationCard key={cert.id} cert={cert} />
            ))}
          </div>
        </div>
      ) : null}
      {completed.length ? (
        <div className="cert-block">
          <h3 className="cert-group-title">Completed</h3>
          <div className="certs-grid">
            {completed.map((cert) => (
              <CertificationCard key={cert.id} cert={cert} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
