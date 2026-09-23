import { useContent } from "../context/useContent";
import { Button } from "../components/Button";
import { EducationCard } from "../components/EducationCard";
import { ExperienceTimeline } from "../components/ExperienceTimeline";
import { Icon, TechIcon } from "../components/Icon";
import { MediaImage } from "../components/MediaImage";
import { MetricCard } from "../components/MetricCard";
import { ProjectCard } from "../components/ProjectCard";

const FEATURED_SKILL_ICONS = ["aws", "docker", "python", "jenkins", "terraform", "linux", "github", "kubernetes"];

function OverviewHead({ title, href }) {
  return (
    <header className="overview-head">
      <h2>{title}</h2>
      <Button href={href} variant="ghost" icon={<Icon name="arrow" size={16} />}>
        View all
      </Button>
    </header>
  );
}

function featuredSkills(groups = []) {
  const picked = [];
  const seen = new Set();
  const all = groups.flatMap((group) => group.items || []);
  for (const icon of FEATURED_SKILL_ICONS) {
    const item = all.find((entry) => entry.icon === icon && !seen.has(entry.name));
    if (!item) continue;
    seen.add(item.name);
    picked.push(item);
  }
  return picked;
}

export function HomeOverviews() {
  const { content } = useContent();
  const { profile, metrics = [], experience = [], skillGroups = [], projects = [], certifications = [], education = [] } = content;
  const points = (profile.about?.points || []).slice(0, 2);
  const featuredProjects = projects.filter((item) => item.featured).slice(0, 2);
  const certs = certifications.filter((item) => item.status !== "in-progress").slice(0, 2);
  const latestEducation = education[0];
  const skills = featuredSkills(skillGroups);

  return (
    <div className="home-overviews">
      <section className="section is-overview">
        <OverviewHead title="About" href="/about" />
        <div className="overview-metrics">
          {metrics.slice(0, 4).map((metric) => (
            <MetricCard key={metric.id} {...metric} />
          ))}
        </div>
        {points.length ? (
          <ul className="overview-points">
            {points.map((point) => (
              <li key={point}>
                <Icon name="check" size={16} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {experience.length ? (
        <section className="section is-overview">
          <OverviewHead title="Experience" href="/experience" />
          <ExperienceTimeline items={experience} />
        </section>
      ) : null}

      {skills.length ? (
        <section className="section is-overview">
          <OverviewHead title="Skills" href="/skills" />
          <ul className="overview-skills">
            {skills.map((item) => (
              <li key={item.name}>
                <div className="skill-meter-head">
                  <MediaImage
                    slot={`skill:${item.icon}`}
                    alt=""
                    className="skill-logo"
                    fallback={<TechIcon name={item.icon} />}
                  />
                  <span>{item.name}</span>
                </div>
                <div className="skill-meter-track" aria-hidden="true">
                  <span />
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {featuredProjects.length ? (
        <section className="section is-overview">
          <OverviewHead title="Projects" href="/projects" />
          <div className="projects-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} compact />
            ))}
          </div>
        </section>
      ) : null}

      {certs.length ? (
        <section className="section is-overview">
          <OverviewHead title="Certifications" href="/certifications" />
          <ul className="overview-list">
            {certs.map((cert) => (
              <li key={cert.id} className="overview-row">
                <strong>{cert.title}</strong>
                <span>{cert.issuer}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {latestEducation ? (
        <section className="section is-overview">
          <OverviewHead title="Education" href="/education" />
          <EducationCard item={latestEducation} />
        </section>
      ) : null}

      <section className="section is-overview">
        <div className="overview-contact">
          <div>
            <h2>{profile.contactCta}</h2>
            <p>{profile.contactNote}</p>
          </div>
          <Button href="/contact" className="btn-contact">
            Contact
          </Button>
        </div>
      </section>
    </div>
  );
}
