import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { saveContent, uploadMedia, uploadResume } from "../../api/client";
import { Icon, TechIcon } from "../../components/Icon";
import { useContent } from "../../context/useContent";
import { useTheme } from "../../hooks/useTheme";
import { issuerSlotFor } from "../../data/mediaSlots";
import { ThemeToggle } from "../../components/ThemeToggle";
import { AdminAvatar, InsightRail, OverviewBoard } from "./AdminWidgets";
import { MediaEditor } from "./MediaEditor";
import { MediaUpload } from "./MediaUpload";
import { clearAdminToken, getAdminToken } from "./LoginPage";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: "layout" },
  { id: "profile", label: "Profile", icon: "user" },
  { id: "metrics", label: "Metrics", icon: "chart" },
  { id: "experience", label: "Experience", icon: "briefcase" },
  { id: "skills", label: "Skills", icon: "layers" },
  { id: "projects", label: "Projects", icon: "folder" },
  { id: "certifications", label: "Certifications", icon: "award" },
  { id: "education", label: "Education", icon: "education" },
  { id: "speaking", label: "Speaking", icon: "mic" },
  { id: "media", label: "Images", icon: "image" },
  { id: "resume", label: "Resume", icon: "file" },
];

const LABELS = {
  name: "Full name",
  title: "Title",
  subtitle: "Subtitle",
  location: "Location",
  email: "Email",
  phone: "Phone",
  linkedin: "LinkedIn URL",
  github: "GitHub URL",
  tagline: "Hero statement",
  contactCta: "Contact heading",
  contactNote: "Contact note",
  id: "ID",
  value: "Number",
  suffix: "Suffix",
  label: "Label",
  detail: "Detail",
  role: "Role",
  company: "Company",
  startDate: "Start date",
  endDate: "End date",
  description: "Description",
  category: "Category",
  liveDemo: "Live demo URL",
  achievements: "Achievements",
  technologies: "Technologies",
  skills: "Skills",
  issuer: "Issuer",
  date: "Date",
  status: "Status",
  credentialUrl: "Credential URL",
  summary: "Summary",
  degree: "Degree",
  institution: "Institution",
  notes: "Notes",
  audience: "Audience",
  duration: "Duration",
  recognition: "Recognition",
  aboutIntro: "About intro",
  aboutFocus: "About focus",
  aboutPoints: "About highlights",
};

export function DashboardPage() {
  const token = getAdminToken();
  const navigate = useNavigate();
  const { content, setContent, refresh } = useContent();
  const { theme, toggleTheme } = useTheme();
  const [tab, setTab] = useState("profile");
  const [draft, setDraft] = useState(() => structuredClone(content));
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setDraft(structuredClone(content));
  }, [content]);

  const synced = useMemo(() => JSON.stringify(draft) === JSON.stringify(content), [draft, content]);
  const activeTab = TABS.find((item) => item.id === tab);
  const skillIcons = uniqueSkillIcons(draft.skillGroups);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  function logout() {
    clearAdminToken();
    navigate("/admin/login", { replace: true });
  }

  async function persist(next = draft) {
    setBusy(true);
    setError("");
    try {
      const saved = await saveContent(token, next);
      setDraft(saved);
      setContent(saved);
      setStatus("Saved. Public pages now use this content.");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function onMedia(slot, file) {
    setBusy(true);
    setError("");
    try {
      const result = await uploadMedia(token, slot, file);
      const next = {
        ...draft,
        media: { ...(draft.media || {}), [slot]: result.url },
      };
      setDraft(next);
      await persist(next);
      setStatus("Image uploaded and live on the public site.");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function onUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const result = await uploadResume(token, file);
      const next = {
        ...draft,
        profile: {
          ...draft.profile,
          resumeUrl: result.resumeUrl,
          resumeFileName: result.resumeFileName,
        },
      };
      setDraft(next);
      await persist(next);
      setStatus(`Resume uploaded as ${result.resumeFileName}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  }

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <div className="admin-brand">
          <AdminAvatar name={draft.profile.name} />
          <div>
            <p className="admin-brand-name">{draft.profile.name}</p>
            <p className="admin-brand-role">{draft.profile.title}</p>
          </div>
        </div>
        <nav className="admin-nav" aria-label="Admin sections">
          {TABS.map((item) => {
            const count = tabCount(item.id, draft);
            return (
              <button
                key={item.id}
                type="button"
                className={tab === item.id ? "is-active" : ""}
                onClick={() => setTab(item.id)}
              >
                <Icon name={item.icon} size={18} />
                <span className="admin-nav-label">{item.label}</span>
                {item.id === "skills" && skillIcons.length ? (
                  <span className="admin-nav-tech">
                    {skillIcons.map((icon) => (
                      <TechIcon key={icon} name={icon} />
                    ))}
                  </span>
                ) : null}
                {count ? <em className="admin-nav-count">{count}</em> : null}
              </button>
            );
          })}
        </nav>
        <div className="admin-side-footer">
          <div className="admin-theme-row">
            <span>Theme</span>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
          <Link to="/" className="admin-back">
            <Icon name="globe" size={18} />
            Manage Public Site
          </Link>
          <button type="button" className="admin-logout" onClick={logout}>
            <Icon name="logout" size={18} />
            Log Out
          </button>
        </div>
      </aside>
      <section className="admin-main">
        <header className="admin-toolbar">
          <h1>{tab === "dashboard" ? "Dashboard" : `${activeTab?.label || "Profile"} Editor`}</h1>
          <div className="admin-toolbar-actions">
            <span className={`admin-status ${synced ? "is-saved" : "is-dirty"}`}>
              {synced ? "Saved" : "Unsaved"}
            </span>
            <button type="button" className="btn btn-secondary" onClick={() => refresh()} disabled={busy}>
              Reload
            </button>
            <button type="button" className="btn btn-primary" onClick={() => persist()} disabled={busy}>
              {busy ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </header>
        {status ? <p className="admin-ok">{status}</p> : null}
        {error ? <p className="admin-error">{error}</p> : null}

        <div className="admin-workspace">
          <div className="admin-workspace-main">
            {tab === "dashboard" ? <OverviewBoard content={draft} onOpen={setTab} /> : null}
            {tab === "profile" ? (
              <ProfileEditor
                profile={draft.profile}
                media={draft.media}
                onChange={(profile) => setDraft({ ...draft, profile })}
                onMedia={onMedia}
                busy={busy}
              />
            ) : null}
            {tab === "metrics" ? (
              <ArrayEditor
                items={draft.metrics}
                blank={{ id: id(), value: 0, suffix: "+", label: "", detail: "" }}
                onChange={(metrics) => setDraft({ ...draft, metrics })}
                fields={["id", "value", "suffix", "label", "detail"]}
              />
            ) : null}
            {tab === "experience" ? (
              <ExperienceEditor
                items={draft.experience}
                media={draft.media}
                onChange={(experience) => setDraft({ ...draft, experience })}
                onMedia={onMedia}
                busy={busy}
              />
            ) : null}
            {tab === "skills" ? (
              <SkillsEditor
                groups={draft.skillGroups}
                media={draft.media}
                onChange={(skillGroups) => setDraft({ ...draft, skillGroups })}
                onMedia={onMedia}
                busy={busy}
              />
            ) : null}
            {tab === "projects" ? (
              <ProjectsEditor
                items={draft.projects}
                media={draft.media}
                onChange={(projects) => setDraft({ ...draft, projects })}
                onMedia={onMedia}
                busy={busy}
              />
            ) : null}
            {tab === "certifications" ? (
              <CertificationsEditor
                items={draft.certifications}
                media={draft.media}
                onChange={(certifications) => setDraft({ ...draft, certifications })}
                onMedia={onMedia}
                busy={busy}
              />
            ) : null}
            {tab === "education" ? (
              <EducationEditor
                items={draft.education}
                media={draft.media}
                onChange={(education) => setDraft({ ...draft, education })}
                onMedia={onMedia}
                busy={busy}
              />
            ) : null}
            {tab === "speaking" ? (
              <ArrayEditor
                items={draft.speaking}
                blank={{ id: id(), title: "", role: "Trainer", audience: "", duration: "", recognition: "", summary: "" }}
                onChange={(speaking) => setDraft({ ...draft, speaking })}
                fields={["title", "role", "audience", "duration", "recognition", "summary"]}
              />
            ) : null}
            {tab === "media" ? <MediaEditor content={draft} onUpload={onMedia} busy={busy} /> : null}
            {tab === "resume" ? (
              <div className="admin-card">
                <h3>Resume file</h3>
                <p className="muted">Upload a PDF so the public download button opens correctly on Windows.</p>
                <p className="admin-file-meta">Current file: {draft.profile.resumeUrl}</p>
                <label className="admin-upload">
                  <strong>Choose a resume</strong>
                  <span>PDF recommended. DOCX is accepted as a backup.</span>
                  <input type="file" accept=".pdf,.docx" onChange={onUpload} />
                </label>
              </div>
            ) : null}
          </div>
          <InsightRail content={draft} />
        </div>
      </section>
    </div>
  );
}

function ProfileEditor({ profile, onChange, media, onMedia, busy }) {
  const about = profile.about || { intro: "", focus: "", points: [] };
  const set = (key, value) => onChange({ ...profile, [key]: value });

  return (
    <>
      <article className="admin-card">
        <h3>Basic Info</h3>
        <div className="admin-basic-info">
          <div>
            <AdminAvatar name={profile.name} size="lg" />
            <MediaUpload slot="profile" label="Profile photo" url={media?.profile} onUpload={onMedia} busy={busy} />
          </div>
          <div className="admin-field-grid">
            {["name", "title", "subtitle", "location"].map((key) => (
              <Field key={key} label={key} value={profile[key] || ""} onChange={(value) => set(key, value)} />
            ))}
          </div>
        </div>
      </article>

      <article className="admin-card">
        <h3>Hero image</h3>
        <MediaUpload slot="hero" label="Hero illustration" url={media?.hero} onUpload={onMedia} busy={busy} />
      </article>

      <article className="admin-card">
        <h3>Social Links</h3>
        <div className="admin-field-grid">
          {["email", "phone", "linkedin", "github"].map((key) => (
            <Field key={key} label={key} value={profile[key] || ""} onChange={(value) => set(key, value)} />
          ))}
        </div>
      </article>

      <article className="admin-card">
        <h3>Biography</h3>
        <Field label="tagline" value={profile.tagline || ""} multiline onChange={(value) => set("tagline", value)} />
        <Field label="aboutIntro" value={about.intro} multiline onChange={(intro) => set("about", { ...about, intro })} />
        <Field label="aboutFocus" value={about.focus} multiline onChange={(focus) => set("about", { ...about, focus })} />
        <Field
          label="aboutPoints"
          value={(about.points || []).join("\n")}
          multiline
          hint="One highlight per line"
          onChange={(text) => set("about", { ...about, points: lines(text) })}
        />
      </article>

      <article className="admin-card">
        <h3>Call to Action</h3>
        <div className="admin-field-grid">
          <Field label="contactCta" value={profile.contactCta || ""} onChange={(value) => set("contactCta", value)} />
          <Field label="contactNote" value={profile.contactNote || ""} multiline onChange={(value) => set("contactNote", value)} />
        </div>
      </article>
    </>
  );
}

function ExperienceEditor({ items, onChange, media, onMedia, busy }) {
  return (
    <div className="admin-stack">
      {items.map((item, index) => (
        <article key={item.id} className="admin-card">
          <header className="admin-card-head">
            <h3>{item.role || "Role"}</h3>
            <button type="button" className="admin-remove" onClick={() => onChange(items.filter((_, i) => i !== index))}>
              Remove
            </button>
          </header>
          <MediaUpload
            slot={`company:${item.id}`}
            label="Company logo"
            url={media?.[`company:${item.id}`]}
            onUpload={onMedia}
            busy={busy}
          />
          <div className="admin-field-grid">
            {["role", "company", "location", "startDate", "endDate"].map((key) => (
              <Field key={key} label={key} value={item[key] || ""} onChange={(value) => update(items, onChange, index, key, value)} />
            ))}
          </div>
          <label className="admin-check">
            <input
              type="checkbox"
              checked={Boolean(item.current)}
              onChange={(event) => update(items, onChange, index, "current", event.target.checked)}
            />
            Current role
          </label>
          <Field label="description" value={item.description || ""} multiline onChange={(value) => update(items, onChange, index, "description", value)} />
          <Field
            label="achievements"
            value={(item.achievements || []).join("\n")}
            multiline
            hint="One achievement per line"
            onChange={(value) => update(items, onChange, index, "achievements", lines(value))}
          />
          <Field
            label="technologies"
            value={(item.technologies || []).join(", ")}
            hint="Comma-separated"
            onChange={(value) => update(items, onChange, index, "technologies", csv(value))}
          />
        </article>
      ))}
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => onChange([...items, { id: id(), role: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "", achievements: [], technologies: [] }])}
      >
        Add experience
      </button>
    </div>
  );
}

function SkillsEditor({ groups, onChange, media, onMedia, busy }) {
  const icons = [];
  const seen = new Set();
  for (const group of groups || []) {
    for (const item of group.items || []) {
      if (!item.icon || seen.has(item.icon)) continue;
      seen.add(item.icon);
      icons.push({ icon: item.icon, name: item.name });
    }
  }

  return (
    <div className="admin-stack">
      {icons.length ? (
        <article className="admin-card">
          <h3>Skill icons</h3>
          <p className="muted">These appear next to each skill on the public Skills page.</p>
          <div className="admin-media-grid">
            {icons.map((item) => (
              <MediaUpload
                key={item.icon}
                slot={`skill:${item.icon}`}
                label={item.name || item.icon}
                url={media?.[`skill:${item.icon}`]}
                onUpload={onMedia}
                busy={busy}
              />
            ))}
          </div>
        </article>
      ) : null}
      {groups.map((group, index) => (
        <article key={group.id} className="admin-card">
          <header className="admin-card-head">
            <h3>{group.title || "Skill group"}</h3>
            <button type="button" className="admin-remove" onClick={() => onChange(groups.filter((_, i) => i !== index))}>
              Remove
            </button>
          </header>
          <Field label="title" value={group.title} onChange={(value) => {
            const next = groups.slice();
            next[index] = { ...group, title: value };
            onChange(next);
          }} />
          <Field
            label="skills"
            value={(group.items || []).map((item) => {
              const base = `${item.name}|${item.icon}`;
              return item.level ? `${base}|${item.level}` : base;
            }).join("\n")}
            multiline
            hint="One per line as name|icon. Optional: name|icon|level (0–100) for a bar."
            onChange={(value) => {
              const next = groups.slice();
              next[index] = {
                ...group,
                items: lines(value).map((line) => {
                  const [name, icon = "cloud", level] = line.split("|");
                  const parsed = { name: name.trim(), icon: icon.trim() || "cloud" };
                  const amount = Number(level);
                  if (Number.isFinite(amount) && amount > 0 && amount <= 100) parsed.level = amount;
                  return parsed;
                }),
              };
              onChange(next);
            }}
          />
        </article>
      ))}
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => onChange([...groups, { id: id(), title: "New group", items: [] }])}
      >
        Add skill group
      </button>
    </div>
  );
}

function ProjectsEditor({ items, onChange, media, onMedia, busy }) {
  return (
    <div className="admin-stack">
      {items.map((item, index) => (
        <article key={item.id} className="admin-card">
          <header className="admin-card-head">
            <h3>{item.title || "Project"}</h3>
            <button type="button" className="admin-remove" onClick={() => onChange(items.filter((_, i) => i !== index))}>
              Remove
            </button>
          </header>
          <MediaUpload
            slot={`project:${item.id}`}
            label="Project image"
            url={media?.[`project:${item.id}`]}
            onUpload={onMedia}
            busy={busy}
          />
          <div className="admin-field-grid">
            {["title", "category", "github", "liveDemo"].map((key) => (
              <Field key={key} label={key} value={item[key] || ""} onChange={(value) => update(items, onChange, index, key, value)} />
            ))}
          </div>
          <Field label="description" value={item.description || ""} multiline onChange={(value) => update(items, onChange, index, "description", value)} />
          <Field
            label="technologies"
            value={(item.technologies || []).join(", ")}
            hint="Comma-separated"
            onChange={(value) => update(items, onChange, index, "technologies", csv(value))}
          />
          <label className="admin-check">
            <input
              type="checkbox"
              checked={Boolean(item.featured)}
              onChange={(event) => update(items, onChange, index, "featured", event.target.checked)}
            />
            Featured
          </label>
        </article>
      ))}
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => onChange([...items, { id: id(), title: "", description: "", technologies: [], category: "", github: "", liveDemo: "", featured: false }])}
      >
        Add project
      </button>
    </div>
  );
}

function CertificationsEditor({ items, onChange, media, onMedia, busy }) {
  return (
    <div className="admin-stack">
      {items.map((item, index) => (
        <article key={item.id} className="admin-card">
          <header className="admin-card-head">
            <h3>{item.title || "Certification"}</h3>
            <button type="button" className="admin-remove" onClick={() => onChange(items.filter((_, i) => i !== index))}>
              Remove
            </button>
          </header>
          <MediaUpload
            slot={issuerSlotFor(item)}
            label="Issuer logo"
            url={media?.[issuerSlotFor(item)]}
            onUpload={onMedia}
            busy={busy}
          />
          <div className="admin-field-grid">
            {["title", "issuer", "date", "status", "credentialUrl"].map((key) => (
              <Field key={key} label={key} value={item[key] || ""} onChange={(value) => update(items, onChange, index, key, value)} />
            ))}
          </div>
          <Field label="summary" value={item.summary || ""} multiline onChange={(value) => update(items, onChange, index, "summary", value)} />
        </article>
      ))}
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => onChange([...items, { id: id(), title: "", issuer: "", date: "", status: "completed", credentialUrl: "", summary: "" }])}
      >
        Add certification
      </button>
    </div>
  );
}

function EducationEditor({ items, onChange, media, onMedia, busy }) {
  return (
    <div className="admin-stack">
      {items.map((item, index) => (
        <article key={item.id} className="admin-card">
          <header className="admin-card-head">
            <h3>{item.degree || "Education"}</h3>
            <button type="button" className="admin-remove" onClick={() => onChange(items.filter((_, i) => i !== index))}>
              Remove
            </button>
          </header>
          <MediaUpload
            slot={`institution:${item.id}`}
            label="Institution logo"
            url={media?.[`institution:${item.id}`]}
            onUpload={onMedia}
            busy={busy}
          />
          <div className="admin-field-grid">
            {["degree", "institution", "location", "startDate", "endDate", "status"].map((key) => (
              <Field key={key} label={key} value={item[key] || ""} onChange={(value) => update(items, onChange, index, key, value)} />
            ))}
          </div>
          <Field label="notes" value={item.notes || ""} multiline onChange={(value) => update(items, onChange, index, "notes", value)} />
        </article>
      ))}
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => onChange([...items, { id: id(), degree: "", institution: "", location: "", startDate: "", endDate: "", status: "", notes: "" }])}
      >
        Add education
      </button>
    </div>
  );
}

function ArrayEditor({ items, onChange, blank, fields }) {
  return (
    <div className="admin-stack">
      {items.map((item, index) => (
        <article key={item.id || index} className="admin-card">
          <header className="admin-card-head">
            <h3>{item.title || item.label || item.degree || "Item"}</h3>
            <button type="button" className="admin-remove" onClick={() => onChange(items.filter((_, i) => i !== index))}>
              Remove
            </button>
          </header>
          <div className="admin-field-grid">
            {fields.map((key) => (
              <Field
                key={key}
                label={key}
                value={item[key] ?? ""}
                multiline={key === "summary" || key === "notes" || key === "detail"}
                onChange={(value) => update(items, onChange, index, key, key === "value" ? Number(value) || 0 : value)}
              />
            ))}
          </div>
        </article>
      ))}
      <button type="button" className="btn btn-secondary" onClick={() => onChange([...items, { ...blank, id: id() }])}>
        Add item
      </button>
    </div>
  );
}

function Field({ label, value, onChange, multiline, hint }) {
  return (
    <label className={`admin-field${multiline ? " is-wide" : ""}`}>
      <span>{LABELS[label] || label}</span>
      {multiline ? (
        <textarea rows={multiline && label === "tagline" ? 5 : 4} value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} />
      )}
      {hint ? <small className="admin-hint">{hint}</small> : null}
    </label>
  );
}

function tabCount(id, draft) {
  if (id === "metrics") return draft.metrics?.length || 0;
  if (id === "experience") return draft.experience?.length || 0;
  if (id === "skills") return (draft.skillGroups || []).reduce((total, group) => total + (group.items?.length || 0), 0);
  if (id === "projects") return draft.projects?.length || 0;
  if (id === "certifications") return draft.certifications?.length || 0;
  if (id === "education") return draft.education?.length || 0;
  if (id === "speaking") return draft.speaking?.length || 0;
  if (id === "resume") return draft.profile?.resumeUrl ? 1 : 0;
  if (id === "media") return Object.keys(draft.media || {}).length;
  return 0;
}

function uniqueSkillIcons(groups = []) {
  const preferred = ["aws", "docker", "python", "jenkins"];
  const found = groups.flatMap((group) => (group.items || []).map((item) => item.icon));
  return preferred.filter((icon) => found.includes(icon)).slice(0, 3);
}

function update(items, onChange, index, key, value) {
  const next = items.slice();
  next[index] = { ...items[index], [key]: value };
  onChange(next);
}

function lines(text) {
  return String(text).split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
}

function csv(text) {
  return String(text).split(",").map((item) => item.trim()).filter(Boolean);
}

function id() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
