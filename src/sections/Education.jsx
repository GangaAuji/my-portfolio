import { useContent } from "../context/useContent";
import { EducationCard } from "../components/EducationCard";
import { SectionHeading } from "../components/SectionHeading";

export function Education() {
  const { content } = useContent();

  return (
    <section className="section">
      <SectionHeading title="Education" />
      <ol className="story-timeline">
        {content.education.map((item) => (
          <li key={item.id}>
            <EducationCard item={item} />
          </li>
        ))}
      </ol>
    </section>
  );
}
