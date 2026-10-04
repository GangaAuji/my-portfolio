import { useState } from "react";
import { Icon, TechIcon } from "./Icon";

const PILLARS = [
  {
    id: "automation",
    label: "Automation",
    title: "Bash deployment automation",
    text: "A deployment script cut full application setup from 2–3 hours to about 30 minutes.",
    icon: "terminal",
    kind: "tech",
  },
  {
    id: "cicd",
    label: "CI/CD",
    title: "GitLab CI/CD",
    text: "Introduced automated deployment where the development environment had none.",
    icon: "pipeline",
    kind: "tech",
  },
  {
    id: "collaboration",
    label: "Collaboration",
    title: "Developer handoff",
    text: "Developers push code and the pipeline deploys it, instead of a manual release.",
    icon: "users",
    kind: "icon",
  },
  {
    id: "security",
    label: "Security",
    title: "Access and edge controls",
    text: "IAM, SSH/SSL, and Cloudflare sit alongside the servers and domains in production.",
    icon: "shield",
    kind: "tech",
  },
  {
    id: "monitoring",
    label: "Monitoring",
    title: "Production alerting",
    text: "Teams and email alerts cover servers that previously had no notification path.",
    icon: "monitor",
    kind: "tech",
  },
];

function PillarIcon({ pillar }) {
  if (pillar.kind === "icon") return <Icon name={pillar.icon} size={18} />;
  return <TechIcon name={pillar.icon} />;
}

export function DevOpsPillars() {
  const [activeId, setActiveId] = useState(PILLARS[0].id);
  const active = PILLARS.find((item) => item.id === activeId) || PILLARS[0];

  return (
    <div className="pillars">
      <p className="pillars-phrase">
        <span>git push</span>
        <i />
        <span>ci apply</span>
        <i />
        <span>host :443</span>
      </p>
      <ol className="pillar-flow">
        {PILLARS.map((pillar, index) => (
          <li key={pillar.id} style={{ "--i": index }}>
            <button
              type="button"
              className={activeId === pillar.id ? "is-on" : ""}
              onMouseEnter={() => setActiveId(pillar.id)}
              onFocus={() => setActiveId(pillar.id)}
            >
              <PillarIcon pillar={pillar} />
              <span>{pillar.label}</span>
            </button>
          </li>
        ))}
      </ol>
      <article className="pillar-detail" key={active.id}>
        <PillarIcon pillar={active} />
        <div>
          <h3>{active.title}</h3>
          <p>{active.text}</p>
        </div>
      </article>
    </div>
  );
}
