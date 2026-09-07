import { Icon } from "./Icon";

export function SocialLinks({ links, className = "" }) {
  return (
    <ul className={`social-links ${className}`.trim()}>
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            aria-label={link.label}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
          >
            <Icon name={link.id === "email" ? "mail" : link.id} size={18} />
            <span>{link.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
