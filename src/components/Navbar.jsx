import { useEffect, useId, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useContent } from "../context/useContent";
import { useCompactNav } from "../hooks/useScroll";
import { Icon } from "./Icon";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const compact = useCompactNav();
  const menuId = useId();
  const location = useLocation();
  const { content } = useContent();
  const navigation = content.navigation || [];

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header ${compact ? "is-compact" : ""}`}>
      <div className="nav-wrap">
        <NavLink to="/" className="brand" onClick={close}>
          {content.profile.name}
        </NavLink>

        <nav className="desktop-nav" aria-label="Primary">
          {navigation.map((item) => (
            <NavLink
              key={item.id}
              to={item.href}
              className={({ isActive }) => (isActive ? "is-active" : "")}
              end={item.href === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className="menu-button"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      <div id={menuId} className={`mobile-nav ${open ? "is-open" : ""}`} hidden={!open}>
        <nav aria-label="Mobile">
          {navigation.map((item) => (
            <NavLink
              key={item.id}
              to={item.href}
              className={({ isActive }) => (isActive ? "is-active" : "")}
              end={item.href === "/"}
              onClick={close}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
