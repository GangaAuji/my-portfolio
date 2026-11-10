import { useContent } from "../context/useContent";
import { ProjectCard } from "../components/ProjectCard";
import { SectionHeading } from "../components/SectionHeading";

export function Projects() {
  const { content } = useContent();

  return (
    <section className="section">
      <SectionHeading title="Projects" />
      <div className="projects-grid">
        {content.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
