export function socialsFrom(profile = {}) {
  return [
    profile.email && {
      id: "email",
      label: "Email",
      href: `mailto:${profile.email}`,
      handle: profile.email,
    },
    profile.linkedin && {
      id: "linkedin",
      label: "LinkedIn",
      href: profile.linkedin,
      handle: "LinkedIn",
    },
    profile.github && {
      id: "github",
      label: "GitHub",
      href: profile.github,
      handle: "GitHub",
    },
    profile.phone && {
      id: "phone",
      label: "Phone",
      href: `tel:${String(profile.phone).replace(/\s+/g, "")}`,
      handle: profile.phone,
    },
  ].filter(Boolean);
}
