import { TechIcon } from "./Icon";
import { MediaImage } from "./MediaImage";

export function SkillGroup({ group }) {
  return (
    <article className="skill-group">
      <h3>{group.title}</h3>
      <ul className="skill-meter-list">
        {group.items.map((item) => {
          const level = Number(item.level);
          const showLevel = Number.isFinite(level) && level > 0 && level <= 100;
          return (
            <li key={item.name}>
              <div className="skill-meter-head">
                <MediaImage
                  slot={`skill:${item.icon}`}
                  alt=""
                  className="skill-logo"
                  fallback={<TechIcon name={item.icon} />}
                />
                <span>{item.name}</span>
                {showLevel ? <em>{level}</em> : null}
              </div>
              <div className="skill-meter-track" aria-hidden="true">
                <span style={showLevel ? { width: `${level}%` } : undefined} />
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
