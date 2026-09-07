import { useContent } from "../context/useContent";
import { ExperienceCard } from "../components/ExperienceCard";
import { SectionHeading } from "../components/SectionHeading";

export function Experience() {
  const { content } = useContent();

  return (
    <section className="section">
      <SectionHeading
        eyebrow="02 / Experience"
        title="Where the work actually runs"
        description="Roles centered on production systems, cloud delivery, and operational ownership."
      />
      <ol className="timeline">
        {content.experience.map((item) => (
          <li key={item.id} className="timeline-item">
            <ExperienceCard item={item} />
          </li>
        ))}
      </ol>
    </section>
  );
}
