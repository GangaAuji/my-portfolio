import { TechIcon } from "./Icon";

export function SkillGroup({ group }) {
  return (
    <article className="skill-group">
      <h3>{group.title}</h3>
      <ul>
        {group.items.map((item) => (
          <li key={item.name}>
            <TechIcon name={item.icon} />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
