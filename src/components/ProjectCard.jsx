import { Button } from "./Button";
import { Icon } from "./Icon";
import { MediaImage } from "./MediaImage";

export function ProjectCard({ project, compact = false }) {
  return (
    <article className={`project-card ${project.featured ? "is-featured" : ""} ${compact ? "is-compact" : ""}`}>
      <div className="project-thumb" aria-hidden="true">
        <MediaImage slot={`project:${project.id}`} alt="" className="project-thumb-img" />
      </div>
      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.technologies?.length ? (
          <div className="tech-orbs" aria-label="Tech stack">
            {project.technologies.slice(0, compact ? 4 : undefined).map((tech) => (
              <span key={tech} className="tech-orb" title={tech}>
                {tech.slice(0, 1)}
              </span>
            ))}
          </div>
        ) : null}
        {compact ? null : (
        <div className="project-actions">
          {project.github ? (
            <Button href={project.github} variant="ghost" icon={<Icon name="github" size={16} />}>
              GitHub
            </Button>
          ) : null}
          {project.liveDemo ? (
            <Button href={project.liveDemo} variant="ghost" icon={<Icon name="external" size={16} />}>
              Live demo
            </Button>
          ) : null}
        </div>
        )}
      </div>
    </article>
  );
}
