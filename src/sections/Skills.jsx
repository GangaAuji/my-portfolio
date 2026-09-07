import { useContent } from "../context/useContent";
import { SectionHeading } from "../components/SectionHeading";
import { SkillGroup } from "../components/SkillGroup";

export function Skills() {
  const { content } = useContent();

  return (
    <section className="section">
      <SectionHeading
        eyebrow="03 / Skills"
        title="The operating stack"
        description="Grouped by how the work is done — not arbitrary proficiency bars."
      />
      <div className="skills-grid">
        {content.skillGroups.map((group) => (
          <SkillGroup key={group.id} group={group} />
        ))}
      </div>
    </section>
  );
}
