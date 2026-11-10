import { Link } from "react-router-dom";

function isAppRoute(href = "") {
  if (!href.startsWith("/") || href.startsWith("//")) return false;
  return !/\.[a-z0-9]+$/i.test(href.split("?")[0]);
}

export function Button({
  href,
  children,
  variant = "primary",
  icon,
  download,
  className = "",
  ...props
}) {
  const classes = `btn btn-${variant} ${className}`.trim();

  if (href && isAppRoute(href) && !download) {
    return (
      <Link to={href} className={classes} {...props}>
        {icon}
        <span>{children}</span>
      </Link>
    );
  }

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        download={download || undefined}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer noopener" : undefined}
        {...props}
      >
        {icon}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {icon}
      <span>{children}</span>
    </button>
  );
}
