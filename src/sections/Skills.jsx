import { useContent } from "../context/useContent";
import { SkillGlobe } from "../components/SkillGlobe";

export function Skills() {
  const { content } = useContent();
  const groups = content.skillGroups || [];
  const toolCount = groups.reduce((total, group) => total + (group.items?.length || 0), 0);

  return (
    <section className="section">
      <header className="section-heading">
        <h2>Skills</h2>
        <p className="section-copy">
          {groups.length} practice areas and {toolCount} tools. Drag the globe, or search for a tool.
        </p>
      </header>
      <SkillGlobe groups={groups} />
    </section>
  );
}
