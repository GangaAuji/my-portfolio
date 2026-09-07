import { Badge } from "./Badge";
import { Button } from "./Button";
import { Icon } from "./Icon";

export function ProjectCard({ project }) {
  return (
    <article className={`project-card ${project.featured ? "is-featured" : ""}`}>
      <div className="project-top">
        <p className="eyebrow">{project.category}</p>
        {project.featured ? <Badge tone="accent">Featured</Badge> : null}
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      {project.technologies?.length ? (
        <div className="chip-row">
          {project.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      ) : null}
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
    </article>
  );
}
