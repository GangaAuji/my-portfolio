import { useContent } from "../context/useContent";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { InfrastructureVisual } from "../components/InfrastructureVisual";
import { ResumeButton } from "../components/ResumeButton";

export function Hero() {
  const { content } = useContent();
  const { profile } = content;

  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">DevOps · Cloud · Production Infrastructure</p>
        <h1>
          <span className="hero-name">{profile.name}</span>
          <span className="hero-title">{profile.title}</span>
          <span className="hero-subtitle">{profile.subtitle}</span>
        </h1>
        <p className="hero-tagline">{profile.tagline}</p>
        <div className="hero-actions">
          <Button href="/experience" icon={<Icon name="arrow" size={16} />}>
            View Experience
          </Button>
          <Button href="/projects" variant="secondary">
            View Projects
          </Button>
          <ResumeButton />
        </div>
        <div className="hero-links">
          <Button href={profile.github} variant="text" icon={<Icon name="github" size={16} />}>
            GitHub
          </Button>
          <Button href={profile.linkedin} variant="text" icon={<Icon name="linkedin" size={16} />}>
            LinkedIn
          </Button>
        </div>
      </div>
      <div className="hero-visual">
        <InfrastructureVisual />
        <p className="hero-flow-caption">Delivery path I work to keep reliable</p>
      </div>
    </section>
  );
}
