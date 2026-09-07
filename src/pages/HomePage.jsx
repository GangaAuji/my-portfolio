import { Hero } from "../sections/Hero";
import { useContent } from "../context/useContent";
import { MetricCard } from "../components/MetricCard";
import { ProjectCard } from "../components/ProjectCard";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";

export function HomePage() {
  const { content } = useContent();
  const featured = content.projects.filter((item) => item.featured);

  return (
    <>
      <Hero />
      <section className="section home-strip">
        <div className="metrics-grid">
          {content.metrics.map((metric) => (
            <MetricCard key={metric.id} {...metric} />
          ))}
        </div>
      </section>
      {featured.length ? (
        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>
            <h2>Featured projects</h2>
          </div>
          <div className="projects-grid">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="hero-actions">
            <Button href="/projects" icon={<Icon name="arrow" size={16} />}>
              All projects
            </Button>
            <Button href="/experience" variant="secondary">
              Experience
            </Button>
          </div>
        </section>
      ) : null}
    </>
  );
}
