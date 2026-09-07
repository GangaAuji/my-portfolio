import { useContent } from "../context/useContent";
import { ProjectCard } from "../components/ProjectCard";
import { SectionHeading } from "../components/SectionHeading";

export function Projects() {
  const { content } = useContent();

  return (
    <section className="section">
      <SectionHeading
        eyebrow="04 / Projects"
        title="Systems with operational depth"
        description="Selected work that shows delivery pipelines, infrastructure, and production-shaped application platforms."
      />
      <div className="projects-grid">
        {content.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
