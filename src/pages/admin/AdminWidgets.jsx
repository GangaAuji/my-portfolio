import { TechIcon } from "../../components/Icon";

const STACK = [
  { id: "aws", label: "AWS" },
  { id: "kubernetes", label: "Kubernetes" },
  { id: "jenkins", label: "Jenkins" },
  { id: "docker", label: "Docker" },
  { id: "python", label: "Python" },
];

const LINE_COLORS = ["#2563eb", "#3b82f6", "#0ea5e9", "#6366f1", "#94a3b8"];

export function initialsFrom(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function AdminAvatar({ name, size = "md" }) {
  return (
    <div className={`admin-avatar admin-avatar-${size}`} aria-hidden="true">
      {initialsFrom(name) || "IA"}
    </div>
  );
}

export function InsightRail({ content }) {
  return (
    <aside className="admin-rail">
      <TechStackCard metrics={content.metrics} />
      <EngagementCard metrics={content.metrics} />
    </aside>
  );
}

export function OverviewBoard({ content, onOpen }) {
  const currentRole = (content.experience || []).find((item) => item.current) || content.experience?.[0];
  const featured = (content.projects || []).filter((item) => item.featured);

  return (
    <div className="admin-overview">
      <div className="admin-stat-grid">
        {(content.metrics || []).map((metric) => (
          <article key={metric.id} className="admin-stat">
            <p className="admin-stat-value">
              {metric.value}
              {metric.suffix ? <span>{metric.suffix}</span> : null}
            </p>
            <p>{metric.label}</p>
          </article>
        ))}
      </div>
      {currentRole ? (
        <article className="admin-card">
          <h3>Current role</h3>
          <p className="admin-card-lead">{currentRole.role}</p>
          <p className="muted">{currentRole.company}</p>
          <button type="button" className="btn btn-secondary" onClick={() => onOpen("experience")}>
            Edit experience
          </button>
        </article>
      ) : null}
      {featured.length ? (
        <article className="admin-card">
          <h3>Featured projects</h3>
          <ul className="admin-plain-list">
            {featured.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
          <button type="button" className="btn btn-secondary" onClick={() => onOpen("projects")}>
            Edit projects
          </button>
        </article>
      ) : null}
    </div>
  );
}

function TechStackCard({ metrics }) {
  return (
    <article className="admin-card admin-insight">
      <h3>DevOps Tech Stack Overview</h3>
      <div className="admin-stack-logos">
        {STACK.map((item) => (
          <span key={item.id} className="admin-stack-logo" title={item.label}>
            <TechIcon name={item.id} />
          </span>
        ))}
      </div>
      <MultiLineChart series={(metrics || []).map((item) => Number(item.value) || 0)} />
    </article>
  );
}

function EngagementCard({ metrics }) {
  const points = cumulativePoints(metrics);
  return (
    <article className="admin-card admin-insight">
      <h3>Portfolio Profile Engagement</h3>
      <AreaChart points={points} />
    </article>
  );
}

function cumulativePoints(metrics = []) {
  const values = metrics.map((item) => Number(item.value) || 0);
  if (!values.length) return [8, 18, 16, 28, 40, 55, 72, 90];
  const max = Math.max(...values, 1);
  return values.reduce((acc, value, index) => {
    const prev = acc[acc.length - 1] || 12;
    acc.push(prev + (value / max) * 18 + index * 4);
    return acc;
  }, [10]);
}

function waveFrom(seed, offset) {
  return Array.from({ length: 14 }, (_, index) => {
    const t = index / 13;
    return Math.max(6, seed * (0.25 + t * 0.55) + Math.sin(index * 0.85 + offset) * Math.max(8, seed * 0.12));
  });
}

function MultiLineChart({ series }) {
  const values = (series.length ? series : [18, 40, 22, 70]).slice(0, 4);
  const max = Math.max(...values, 1);
  const lines = values.map((value, index) => waveFrom(18 + (value / max) * 72, index));
  return (
    <svg className="admin-chart" viewBox="0 0 320 140" role="img" aria-label="Operational scale from portfolio metrics">
      {lines.map((points, index) => (
        <path key={index} d={linePath(points, 320, 140)} fill="none" stroke={LINE_COLORS[index]} strokeWidth="2.2" />
      ))}
    </svg>
  );
}

function AreaChart({ points }) {
  const path = linePath(points, 320, 140);
  const area = `${path} L320 140 L0 140 Z`;
  const last = lastPoint(points, 320, 140);
  return (
    <svg className="admin-chart" viewBox="0 0 320 140" role="img" aria-label="Portfolio snapshot from live metrics">
      <defs>
        <linearGradient id="admin-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#admin-area)" />
      <path d={path} fill="none" stroke="#2563eb" strokeWidth="2.6" />
      <circle cx={last.x} cy={last.y} r="5" fill="#2563eb" />
    </svg>
  );
}

function linePath(points, width, height) {
  const max = Math.max(...points, 1);
  return points
    .map((value, index) => {
      const x = (index / Math.max(points.length - 1, 1)) * width;
      const y = height - 12 - (value / max) * (height - 24);
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function lastPoint(points, width, height) {
  const max = Math.max(...points, 1);
  const value = points[points.length - 1] || 0;
  return {
    x: width,
    y: height - 12 - (value / max) * (height - 24),
  };
}
