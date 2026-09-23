import { useContent } from "../context/useContent";
import { MetricCard } from "../components/MetricCard";
import { SectionHeading } from "../components/SectionHeading";
import { Icon } from "../components/Icon";
import { ResumeButton } from "../components/ResumeButton";

export function About() {
  const { content } = useContent();
  const { profile, metrics = [], impactHighlights = [] } = content;

  return (
    <section className="section">
      <SectionHeading
        title="About"
        description={profile.about.intro}
      />
      <div className="about-grid">
        <div className="about-copy">
          <p>{profile.about.focus}</p>
          <div className="hero-actions">
            <ResumeButton />
          </div>
          <ul className="focus-list">
            {profile.about.points.map((point) => (
              <li key={point}>
                <Icon name="check" size={16} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="impact-grid">
            {impactHighlights.map((item) => (
              <article key={item.id} className="impact-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="metrics-grid">
          {metrics.map((metric) => (
            <MetricCard key={metric.id} {...metric} />
          ))}
        </div>
      </div>
    </section>
  );
}
