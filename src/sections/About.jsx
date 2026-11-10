import { useContent } from "../context/useContent";
import { MetricCard } from "../components/MetricCard";
import { Icon } from "../components/Icon";
import { ResumeButton } from "../components/ResumeButton";
import { AboutScene } from "../components/AboutScene";

export function About() {
  const { content } = useContent();
  const { profile, metrics = [], impactHighlights = [] } = content;

  return (
    <section className="section">
      <div className="about-intro">
        <header className="section-heading">
          <h2>About</h2>
          <p className="section-copy">{profile.about.intro}</p>
        </header>
      </div>
      <AboutScene />

      <div className="about-metrics">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </div>

      <div className="about-split">
        <div className="about-story">
          <p>{profile.about.focus}</p>
          <ul className="focus-list">
            {profile.about.points.map((point) => (
              <li key={point}>
                <Icon name="check" size={16} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <ResumeButton />
        </div>
        <ol className="about-impacts">
          {impactHighlights.map((item, index) => (
            <li key={item.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
