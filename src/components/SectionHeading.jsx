export function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <header className={`section-heading section-heading-${align}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p className="section-copy">{description}</p> : null}
    </header>
  );
}
