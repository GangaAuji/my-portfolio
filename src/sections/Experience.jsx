import { useContent } from "../context/useContent";
import { ExperienceCard } from "../components/ExperienceCard";
import { ExperienceTimeline } from "../components/ExperienceTimeline";
import { SectionHeading } from "../components/SectionHeading";

export function Experience() {
  const { content } = useContent();

  return (
    <section className="section">
      <SectionHeading title="Experience" />
      <ExperienceTimeline items={content.experience} />
      <div className="experience-stack">
        {content.experience.map((item) => (
          <ExperienceCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
