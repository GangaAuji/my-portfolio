const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function Icon({ name, className = "", size = 20 }) {
  const paths = ICONS[name];
  if (!paths) return null;

  return (
    <svg {...svgProps} width={size} height={size} className={className}>
      {paths}
    </svg>
  );
}

const ICONS = {
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M3 12h2M19 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 7 7 0 0 0 20 14.5z" />,
  download: (
    <>
      <path d="M12 4v10" />
      <path d="M8 10l4 4 4-4" />
      <path d="M5 19h14" />
    </>
  ),
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.52 1.03 1.52 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2z"
    />
  ),
  linkedin: (
    <path
      fill="currentColor"
      stroke="none"
      d="M6.5 9H4V20h2.5V9zM5.25 4A1.75 1.75 0 1 0 5.26 7.5 1.75 1.75 0 0 0 5.25 4zM20 20h-2.5v-5.6c0-1.55-.53-2.6-1.85-2.6-1.01 0-1.61.68-1.88 1.34-.1.24-.12.57-.12.9V20H11.2s.04-9.93 0-11H13.7v1.56c.33-.51 1.17-1.73 2.86-1.73 2.09 0 3.44 1.36 3.44 4.28V20z"
    />
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  external: (
    <>
      <path d="M14 5h5v5" />
      <path d="M10 14L19 5" />
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </>
  ),
  check: <path d="M5 12.5l4.2 4.2L19 7.5" />,
  location: (
    <>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 18a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M16 18a4.8 4.8 0 0 1 4.5-4.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5l3 1.5" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M8.5 13.5 7 21l5-2.2L17 21l-1.5-7.5" />
    </>
  ),
  phone: (
    <path d="M7 3.8h3.2l1.1 3.1-1.7 1.1a12 12 0 0 0 6.4 6.4l1.1-1.7 3.1 1.1V17a1.8 1.8 0 0 1-1.8 1.8A13.2 13.2 0 0 1 5.2 5.6 1.8 1.8 0 0 1 7 3.8z" />
  ),
  layout: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.4" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.4" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.4" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 19.2a7 7 0 0 1 14 0" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19h16" />
      <path d="M7 16V10M12 16V7M17 16v-4" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3.5" y="8" width="17" height="11" rx="2" />
      <path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8M3.5 13h17" />
    </>
  ),
  layers: (
    <>
      <path d="M12 4 4.5 8 12 12l7.5-4z" />
      <path d="M4.5 12 12 16l7.5-4M4.5 16 12 20l7.5-4" />
    </>
  ),
  folder: (
    <>
      <path d="M3.5 8.5h6l1.6 1.8H20.5v8.2a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5z" />
      <path d="M3.5 8.5V7A1.5 1.5 0 0 1 5 5.5h3.2l1.5 1.8" />
    </>
  ),
  education: (
    <>
      <path d="M3 10.5 12 6l9 4.5-9 4.5z" />
      <path d="M7 12.5v4.2c0 .8 2.2 2.3 5 2.3s5-1.5 5-2.3v-4.2" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="4" width="6" height="10" rx="3" />
      <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v3M9 20h6" />
    </>
  ),
  file: (
    <>
      <path d="M7 3.5h7l5 5V20a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5z" />
      <path d="M14 3.5V9h5.5M8.5 13h7M8.5 16.5h7" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.4 2.8 3.6 5.6 3.6 8s-1.2 5.2-3.6 8c-2.4-2.8-3.6-5.6-3.6-8s1.2-5.2 3.6-8z" />
    </>
  ),
  logout: (
    <>
      <path d="M10 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3" />
      <path d="M14 8l4 4-4 4M18 12H9" />
    </>
  ),
};

export function TechIcon({ name }) {
  return (
    <svg className="tech-glyph" viewBox="0 0 24 24" aria-hidden="true">
      {TECH[name] ?? TECH.cloud}
    </svg>
  );
}

const TECH = {
  aws: (
    <>
      <path d="M4 16c3 2.4 7 3.6 12.5 3.2 1.3-.1 2.5-.4 3.5-.8" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7 8.5h3.2L12 14l1.8-5.5H17" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M6 11.5h2.4M15.6 11.5H18" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </>
  ),
  git: (
    <path
      d="M12.7 3.3 20.7 11.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0L3.3 12.7a1 1 0 0 1 0-1.4l8-8a1 1 0 0 1 1.4 0zM9.2 9.2l5.6 5.6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    />
  ),
  github: (
    <path
      fill="currentColor"
      d="M12 3a9 9 0 0 0-2.84 17.54c.45.08.61-.2.61-.43v-1.53c-2.5.54-3.03-1.2-3.03-1.2-.41-1.04-1-1.32-1-1.32-.81-.56.06-.55.06-.55.9.06 1.37.93 1.37.93.8 1.37 2.1.97 2.62.74.08-.58.31-.97.57-1.2-2-.23-4.1-1-4.1-4.45 0-.98.35-1.78.93-2.41-.09-.23-.4-1.14.09-2.38 0 0 .76-.24 2.47.92A8.6 8.6 0 0 1 12 7.12c.77 0 1.54.1 2.26.3 1.7-1.16 2.46-.92 2.46-.92.5 1.24.18 2.15.09 2.38.58.63.93 1.43.93 2.41 0 3.46-2.11 4.22-4.12 4.44.32.28.61.83.61 1.67v2.48c0 .24.16.52.62.43A9 9 0 0 0 12 3z"
    />
  ),
  jenkins: (
    <>
      <circle cx="12" cy="8.5" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8.2 12.2c.8 4 2 6.3 3.8 6.3s3-2.3 3.8-6.3" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7 16.5h10" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </>
  ),
  terraform: (
    <>
      <path d="M4 8.2 8.8 10.6v5.2L4 13.4zM10 5.4 14.8 7.8v5.2L10 10.4zM16 8.2 20.8 10.6v5.2L16 13.4z" fill="currentColor" />
    </>
  ),
  linux: (
    <>
      <ellipse cx="12" cy="14.5" rx="6.2" ry="5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="10" cy="9" r="1.1" fill="currentColor" />
      <circle cx="14" cy="9" r="1.1" fill="currentColor" />
      <path d="M9.4 12.4c.8.8 4.4.8 5.2 0" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </>
  ),
  ubuntu: (
    <>
      <circle cx="12" cy="12" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="5.2" r="1.4" fill="currentColor" />
      <circle cx="6.2" cy="15.4" r="1.4" fill="currentColor" />
      <circle cx="17.8" cy="15.4" r="1.4" fill="currentColor" />
    </>
  ),
  python: (
    <>
      <path d="M12.5 4.5h-3A3.5 3.5 0 0 0 6 8v3h6.5A1.5 1.5 0 0 0 14 9.5v-2A3 3 0 0 0 11 4.5z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11.5 19.5h3A3.5 3.5 0 0 0 18 16v-3h-6.5A1.5 1.5 0 0 0 10 14.5v2a3 3 0 0 0 3 3z" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
  docker: (
    <>
      <path d="M4 13.2h2.3v2.1H4zM6.7 13.2h2.3v2.1H6.7zM9.4 13.2h2.3v2.1H9.4zM12.1 13.2h2.3v2.1h-2.3zM6.7 10.8h2.3v2.1H6.7zM9.4 10.8h2.3v2.1H9.4z" fill="currentColor" />
      <path d="M3.8 16.2c1.8.7 4.2 1.1 8.2 1.1 3.3 0 6.2-.4 8.2-1.2.5-1.6.5-3.1 0-4.3-1.4-1.4-3.6-1.9-7-1.9" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
  kubernetes: (
    <>
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <path d="M12 4.2 13.2 8M12 4.2 10.8 8M19.8 8.2 16.2 9.4M19.8 8.2 16.6 6.8M19.8 15.8 16.6 17.2M19.8 15.8 16.2 14.6M12 19.8 10.8 16M12 19.8 13.2 16M4.2 15.8 7.8 14.6M4.2 15.8 7.4 17.2M4.2 8.2 7.4 6.8M4.2 8.2 7.8 9.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="7" rx="6.5" ry="2.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5.5 7v10c0 1.3 2.9 2.4 6.5 2.4s6.5-1.1 6.5-2.4V7" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5.5 12c0 1.3 2.9 2.4 6.5 2.4s6.5-1.1 6.5-2.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </>
  ),
  shield: (
    <path d="M12 3.5 5.5 6v5.4c0 4 2.7 6.7 6.5 8.1 3.8-1.4 6.5-4.1 6.5-8.1V6z" fill="none" stroke="currentColor" strokeWidth="1.7" />
  ),
  network: (
    <>
      <circle cx="6" cy="12" r="2.1" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="18" cy="6.5" r="2.1" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="18" cy="17.5" r="2.1" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8.1 11.2 15.9 7.4M8.1 12.8 15.9 16.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </>
  ),
  cloud: (
    <path d="M7.5 17.5h9.2A3.8 3.8 0 0 0 20 13.2a4 4 0 0 0-3.8-4 5.1 5.1 0 0 0-9.7 1.7A3.4 3.4 0 0 0 7.5 17.5z" fill="none" stroke="currentColor" strokeWidth="1.7" />
  ),
  pipeline: (
    <>
      <rect x="3.5" y="8" width="5" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <rect x="15.5" y="8" width="5" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8.5 12h7" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </>
  ),
  build: (
    <>
      <path d="M4 18h16M7 18V9l5-4 5 4v9" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10 18v-5h4v5" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </>
  ),
  rocket: (
    <path d="M12 4c3.2 2 5 5.2 5 9.2 0 1.3-.3 2.4-.7 3.3L14 15l-2 5-2-5-2.3 1.5c-.4-.9-.7-2-.7-3.3C7 9.2 8.8 6 12 4z" fill="none" stroke="currentColor" strokeWidth="1.7" />
  ),
  lock: (
    <>
      <rect x="6" y="11" width="12" height="9" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8.5 11V8.5a3.5 3.5 0 0 1 7 0V11" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </>
  ),
  monitor: (
    <>
      <path d="M4 16h16M5 16V7.5A1.5 1.5 0 0 1 6.5 6h11A1.5 1.5 0 0 1 19 7.5V16" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7.5 12.5 10 10l2 2 4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </>
  ),
  backup: (
    <>
      <path d="M7 8.5A5 5 0 1 1 7 16h10.5A3.5 3.5 0 1 0 17 8.8" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 12h6M12 9v6" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4 3.8 19h16.4z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 10v4M12 16.5v.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </>
  ),
  terminal: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7 10.2 9.4 12 7 13.8M12 14.2h5" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </>
  ),
};
