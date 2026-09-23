import { useContent } from "../context/useContent";
import { Button } from "../components/Button";
import { HeroIllustration } from "../components/HeroIllustration";
import { Icon } from "../components/Icon";

export function Hero() {
  const { content } = useContent();
  const { profile } = content;

  return (
    <section className="page-wrap hero" id="home">
      <div className="hero-panel">
        <div className="hero-copy">
          <h1 className="hero-name">{profile.name}</h1>
          <p className="hero-title">{profile.title}</p>
          <p className="hero-subtitle">{profile.subtitle}</p>
          <p className="hero-tagline">{profile.tagline}</p>
          <div className="hero-actions">
            <Button href="/experience" icon={<Icon name="arrow" size={16} />}>
              View Experience
            </Button>
            <Button href="/contact" variant="secondary">
              Contact
            </Button>
          </div>
        </div>
        <div className="hero-visual">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
