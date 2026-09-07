import { Icon } from "./Icon";

export function ThemeToggle({ theme, onToggle }) {
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${next} theme`}
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
    </button>
  );
}
