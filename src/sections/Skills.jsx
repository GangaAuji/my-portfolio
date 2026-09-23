import { useContent } from "../context/useContent";
import { SectionHeading } from "../components/SectionHeading";
import { SkillGroup } from "../components/SkillGroup";

export function Skills() {
  const { content } = useContent();

  return (
    <section className="section">
      <SectionHeading title="Proficiency" />
      <div className="skills-grid">
        {content.skillGroups.map((group) => (
          <SkillGroup key={group.id} group={group} />
        ))}
      </div>
    </section>
  );
}
