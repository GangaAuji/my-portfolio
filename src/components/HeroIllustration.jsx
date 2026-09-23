import { MediaImage } from "./MediaImage";

export function HeroIllustration() {
  return (
    <figure className="hero-illustration" aria-label="Isometric cloud, CI/CD, and server workflow">
      <MediaImage
        slot="hero"
        alt="Cloud infrastructure from git to running servers"
        className="hero-photo"
        fallback={<HeroFallbackSvg />}
      />
    </figure>
  );
}

function HeroFallbackSvg() {
  return (
    <svg viewBox="0 0 520 360" role="img">
        <title>Cloud infrastructure from git to running servers</title>
        <defs>
          <linearGradient id="iso-top" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="iso-side" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="iso-cloud" x1="0" x2="1">
            <stop offset="0%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#bfdbfe" />
          </linearGradient>
        </defs>

        <ellipse cx="260" cy="318" rx="170" ry="18" fill="#cbd5e1" opacity="0.45" />

        <path className="iso-flow" d="M92 168 C140 110, 210 96, 268 128" fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="7 8" />
        <path className="iso-flow" d="M268 128 C330 162, 390 150, 438 112" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="7 8" />
        <path className="iso-flow" d="M268 176 C300 220, 250 250, 210 268" fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="7 8" />

        <g transform="translate(70 150)">
          <polygon points="40,0 80,22 40,44 0,22" fill="url(#iso-top)" />
          <polygon points="0,22 40,44 40,78 0,56" fill="#1e40af" />
          <polygon points="40,44 80,22 80,56 40,78" fill="url(#iso-side)" />
          <text x="40" y="30" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">Git</text>
        </g>

        <g transform="translate(228 108)">
          <polygon points="48,0 96,26 48,52 0,26" fill="url(#iso-top)" />
          <polygon points="0,26 48,52 48,92 0,66" fill="#1e3a8a" />
          <polygon points="48,52 96,26 96,66 48,92" fill="url(#iso-side)" />
          <text x="48" y="36" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">CI/CD</text>
        </g>

        <g transform="translate(390 78)">
          <ellipse cx="44" cy="28" rx="52" ry="20" fill="url(#iso-cloud)" />
          <ellipse cx="18" cy="34" rx="22" ry="14" fill="#eff6ff" />
          <ellipse cx="70" cy="34" rx="24" ry="15" fill="#dbeafe" />
          <text x="44" y="34" textAnchor="middle" fill="#1d4ed8" fontSize="12" fontWeight="800">AWS</text>
        </g>

        <g transform="translate(168 236)">
          <polygon points="36,0 72,18 36,36 0,18" fill="#38bdf8" />
          <polygon points="0,18 36,36 36,64 0,46" fill="#0369a1" />
          <polygon points="36,36 72,18 72,46 36,64" fill="#0284c7" />
          <text x="36" y="26" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">DB</text>
        </g>

        <g transform="translate(286 248)">
          <rect x="8" y="10" width="64" height="46" rx="6" fill="#1e40af" />
          <rect x="14" y="16" width="52" height="8" rx="2" fill="#93c5fd" />
          <rect x="14" y="28" width="36" height="6" rx="2" fill="#60a5fa" />
          <rect x="14" y="38" width="44" height="6" rx="2" fill="#3b82f6" />
        <text x="40" y="72" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="700">Servers</text>
        </g>
      </svg>
  );
}
