# Ganga Auji — DevOps Portfolio

Multi-page React portfolio with a password-protected admin panel. Public pages read content from the backend (`/api/content`). Saving in admin writes `server/data/content.json`.

## Local development

```bash
npm install
npm run dev
```

This starts:

- API / admin backend: `http://127.0.0.1:4174`
- Website: `http://localhost:5173`

Admin panel: `http://localhost:5173/admin`

Default password is in `.env` (`ADMIN_PASSWORD`). Change it before sharing the site.

Production (serves the built site + API together):

```bash
npm run build
npm start
```

Then open `http://127.0.0.1:4174`.

## Update content from the admin panel

Do not edit React components to change jobs, skills, or projects.

1. Open `/admin`
2. Sign in
3. Use the tabs: profile, metrics, experience, skills, projects, certifications, education, speaking, resume
4. Click **Save changes**

Resume uploads must be **PDF** (recommended) or DOCX. The download button uses the real file extension, so Windows can open it.

## Change portfolio content in files

If you prefer files instead of the panel, edit:

`server/data/content.json`

The server copies that file to `public/content.json` on save, so GitHub Pages can still read a static snapshot.

## GitHub Pages

1. Set `repositoryName` in `site.config.js` to your GitHub repository name.
2. Push to GitHub.
3. In the repo: **Settings → Pages → Source → GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` builds with `base` derived from `GITHUB_REPOSITORY`, so project-page URLs work:

```text
https://<username>.github.io/<repository>/
```

Manual deploy:

```bash
npm run deploy
```

Override the base path if needed:

```bash
VITE_BASE=/your-repo/ npm run build
```

Use `VITE_BASE=/` for a user site (`https://<username>.github.io/`).

SEO canonical / Open Graph URLs in `index.html` should be updated to match the live site URL.

## Theme

Dark is the default visual system. The toggle persists `light` or `dark` in `localStorage` under `portfolio-theme`.

## Accessibility

- Skip link, semantic sections, visible focus states
- Mobile navigation exposes `aria-expanded` / `aria-controls`
- Certification status is labeled in text, not color alone
- Animations respect `prefers-reduced-motion`

## Architecture notes

The previous single-file HTML app (admin panel, localStorage CMS, Tailwind CDN) is archived under `archive/`. This rebuild is a static Vite + React site with no backend, suitable for GitHub Pages.

## Content sources and conflicts

A resume PDF was not present in the project folder. Content was taken from:

- Your implementation brief (metrics, role framing, projects, in-progress SAA, speaking topics)
- The existing `index.html` defaults (email, Linux Server Administrator framing)
- Public LinkedIn / GitHub records (Magic Bus internship, AWS Cloud Practitioner, AWS re/Start, Pillai MSc Data Analytics, repository URLs)

Conflicts that were **not** silently merged:

| Topic | Existing HTML | Used instead |
| --- | --- | --- |
| Professional identity | “Data Science & Cloud Enthusiast” in the hero | DevOps Engineer / Cloud Infrastructure & Automation |
| Location | About copy said Vashi, Navi Mumbai; profile data said Vapi, Gujarat | Mumbai Metropolitan Region (LinkedIn / Pillai) |
| AWS Solutions Architect | Listed as completed (June 2023) | **In progress**, as specified |
| Education / jobs | Placeholders (`Your University`, `Your Company Name`) | Named items only where publicly supported |
| Social links | Empty strings | GitHub `GangaAuji`, LinkedIn profile URL |
| Testimonials | Placeholder “John Doe” quote | Omitted |
| Phone number | Form placeholder | Omitted from the public site |

If your resume names a current employer, bachelor’s institution, workshop audience/duration, or additional certifications, add them in the data files. Do not leave invented values in the UI.
