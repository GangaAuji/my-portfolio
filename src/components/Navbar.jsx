import { useEffect, useId, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PRIMARY_NAV } from "../data/primaryNav";
import { useContent } from "../context/useContent";
import { useTheme } from "../hooks/useTheme";
import { MediaImage } from "./MediaImage";
import { useCompactNav } from "../hooks/useScroll";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const compact = useCompactNav();
  const menuId = useId();
  const location = useLocation();
  const { content } = useContent();
  const { theme, toggleTheme } = useTheme();

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
      <div className="page-wrap nav-wrap">
        <NavLink to="/" className="brand" onClick={close}>
          <MediaImage slot="profile" alt="" className="brand-photo" />
          {content.profile.name}
        </NavLink>

        <nav className="desktop-nav" aria-label="Primary">
          {PRIMARY_NAV.map((item) => (
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
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <Button href="/contact" className="btn-contact">
            Contact
          </Button>
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
        <nav className="page-wrap" aria-label="Mobile">
          {PRIMARY_NAV.map((item) => (
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
          <Button href="/contact" className="btn-contact" onClick={close}>
            Contact
          </Button>
        </nav>
      </div>
    </header>
  );
}
