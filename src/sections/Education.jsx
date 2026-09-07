import { useContent } from "../context/useContent";
import { EducationCard } from "../components/EducationCard";
import { SectionHeading } from "../components/SectionHeading";

export function Education() {
  const { content } = useContent();

  return (
    <section className="section">
      <SectionHeading eyebrow="06 / Education" title="Academic foundation" />
      <div className="education-grid">
        {content.education.map((item) => (
          <EducationCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
