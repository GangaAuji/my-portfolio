import { useContent } from "../context/useContent";
import { useInView } from "../hooks/useInView";
import { Button } from "../components/Button";
import { HeroIllustration } from "../components/HeroIllustration";
import { Icon } from "../components/Icon";
import { ResumeButton } from "../components/ResumeButton";

export function Hero() {
  const { content } = useContent();
  const { profile } = content;
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className={`page-wrap hero ${inView ? "is-inview" : ""}`} id="home">
      <div className="hero-panel">
        <div className="hero-copy">
          <h1 className="hero-name">{profile.name}</h1>
          <p className="hero-title">{profile.title}</p>
          <p className="hero-subtitle">{profile.subtitle}</p>
          {profile.homeLine ? <p className="hero-line">{profile.homeLine}</p> : null}
          {profile.tagline ? <p className="hero-tagline">{profile.tagline}</p> : null}
          <div className="hero-actions">
            <ResumeButton variant="primary" />
            <Button href="/experience" variant="secondary" icon={<Icon name="arrow" size={16} />}>
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
