import { useContent } from "../context/useContent";
import { SkillGlobe } from "../components/SkillGlobe";

const DEFAULT_TITLE = "Technologies That Power My Workflow";
const DEFAULT_DESCRIPTION =
  "From infrastructure automation to secure deployments and observability, explore the technical stack I use to build, deploy, and operate reliable applications.";

export function Skills() {
  const { content } = useContent();
  const groups = content.skillGroups || [];
  const section = content.skillsSection || {};
  const title = section.title?.trim() || DEFAULT_TITLE;
  const description = section.description?.trim() ?? DEFAULT_DESCRIPTION;

  return (
    <section className="section">
      <header className="section-heading skills-heading">
        <h2>{title}</h2>
        {description ? <p className="section-copy">{description}</p> : null}
      </header>
      <SkillGlobe groups={groups} />
    </section>
  );
}
