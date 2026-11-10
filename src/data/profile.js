import { assetUrl, site } from "./site";

export const profile = {
  name: "Ganga Auji",
  title: "DevOps Engineer",
  subtitle: "Cloud Infrastructure & Automation",
  location: "Mumbai Metropolitan Region, India",
  email: "ganga.auji2001@gmail.com",
  linkedin: "https://www.linkedin.com/in/ganga-auji-426a911ba",
  github: "https://github.com/GangaAuji",
  resumeUrl: "/resume.docx",
  availability: "Open to DevOps, Cloud, and Infrastructure roles",
  tagline:
    "I operate production infrastructure and automate the path from git to running systems — AWS, Linux, CI/CD, and reliable deployments.",
  about: {
    intro:
      "I am a DevOps engineer focused on cloud infrastructure, Linux server administration, and deployment automation. My work sits at the intersection of production operations and software delivery.",
    focus:
      "Day to day, that means keeping client environments available, tightening how software reaches production, and responding when systems fail. I care about repeatable infrastructure, clear operational ownership, and reducing manual toil.",
    points: [
      "Production Linux administration across Ubuntu servers",
      "AWS infrastructure for compute, storage, and deployment",
      "CI/CD pipelines that shortened release time from hours to minutes",
      "Backups, monitoring, alerting, and incident response",
    ],
  },
  seo: {
    title: "Ganga Auji | DevOps Engineer — Cloud Infrastructure & Automation",
    description:
      "DevOps Engineer specializing in AWS, Linux server administration, CI/CD, and infrastructure automation. Experience operating 15+ client environments, 15 Ubuntu servers, and 250+ websites.",
    ogImage: "/og-image.svg",
    canonicalUrl: site.canonicalUrl,
  },
  contactCta: "Let's build reliable infrastructure.",
  contactNote:
    "If you need someone who can own servers, pipelines, and production incidents — not just talk about them — let's talk.",
};

export function getResumeUrl() {
  return assetUrl(profile.resumeUrl);
}

export const socials = [
  {
    id: "email",
    label: "Email",
    href: `mailto:${profile.email}`,
    handle: profile.email,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: profile.linkedin,
    handle: "ganga-auji",
  },
  {
    id: "github",
    label: "GitHub",
    href: profile.github,
    handle: "GangaAuji",
  },
];
