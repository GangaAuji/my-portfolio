import { useContent } from "../context/useContent";
import { Badge } from "../components/Badge";
import { MediaImage } from "../components/MediaImage";
import { SectionHeading } from "../components/SectionHeading";

function formatDate(value) {
  if (!value) return "";
  if (/^\d{4}$/.test(value)) return value;
  const [year, month] = value.split("-");
  if (!month) return year;
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function schoolsFrom(items = []) {
  const groups = [];
  for (const item of items) {
    const name = item.institution || "Education";
    const current = groups.find((group) => group.name === name);
    if (current) current.items.push(item);
    else groups.push({ name, items: [item] });
  }
  return groups;
}

export function Education() {
  const { content } = useContent();
  const schools = schoolsFrom(content.education || []);

  return (
    <section className="section">
      <SectionHeading
        title="Education"
        description="Academic study kept alongside production infrastructure work."
      />
      <div className="study-board">
        {schools.map((school) => (
          <article key={school.name} className="study-school">
            <header>
              <MediaImage
                slot={`institution:${school.items[0].id}`}
                alt=""
                className="story-logo"
                fallback={<span className="story-logo is-fallback">{school.name.slice(0, 1)}</span>}
              />
              <div>
                <h3>{school.name}</h3>
                {school.items[0].location ? <p>{school.items[0].location}</p> : null}
              </div>
            </header>
            <ol>
              {school.items.map((item) => {
                const end = formatDate(item.endDate);
                const start = formatDate(item.startDate);
                return (
                  <li key={item.id}>
                    <p className="study-year">{end || start}</p>
                    <h4>{item.degree}</h4>
                    {start || end ? <p className="study-range">{[start, end].filter(Boolean).join(" — ")}</p> : null}
                    {item.status ? <Badge>{item.status}</Badge> : null}
                    {item.notes ? <p className="study-notes">{item.notes}</p> : null}
                  </li>
                );
              })}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}
