const NODES = [
  { id: "dev", label: "Developer", x: 42, y: 78 },
  { id: "git", label: "Git", x: 128, y: 40 },
  { id: "cicd", label: "CI/CD", x: 214, y: 78 },
  { id: "cloud", label: "Cloud", x: 300, y: 40 },
  { id: "servers", label: "Servers", x: 386, y: 78 },
  { id: "monitor", label: "Monitoring", x: 472, y: 40 },
];

const LINKS = [
  ["dev", "git"],
  ["git", "cicd"],
  ["cicd", "cloud"],
  ["cloud", "servers"],
  ["servers", "monitor"],
];

export function InfrastructureVisual() {
  const byId = Object.fromEntries(NODES.map((node) => [node.id, node]));

  return (
    <figure className="infra-visual" aria-label="Infrastructure flow from developer to monitoring">
      <svg viewBox="0 0 520 130" role="img">
        <title>Developer to Git to CI/CD to Cloud to Servers to Monitoring</title>
        {LINKS.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            className="infra-link"
            x1={byId[from].x + 28}
            y1={byId[from].y + 16}
            x2={byId[to].x}
            y2={byId[to].y + 16}
          />
        ))}
        {NODES.map((node) => (
          <g key={node.id} className={`infra-node infra-${node.id}`}>
            <rect x={node.x} y={node.y} width="56" height="32" rx="6" />
            <text x={node.x + 28} y={node.y + 21} textAnchor="middle">
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
