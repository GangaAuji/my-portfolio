import { useContent } from "../context/useContent";
import { socialsFrom } from "../utils/socials";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { ResumeButton } from "../components/ResumeButton";
import { SectionHeading } from "../components/SectionHeading";

export function Contact() {
  const { content } = useContent();
  const { profile } = content;
  const socials = socialsFrom(profile);

  return (
    <section className="section contact-section">
      <SectionHeading
        eyebrow="08 / Contact"
        title={profile.contactCta}
        description={profile.contactNote}
      />
      <div className="contact-panel">
        <div className="contact-methods">
          {socials.map((item) => (
            <a
              key={item.id}
              className="contact-method"
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
            >
              <Icon name={item.id === "email" ? "mail" : item.id} size={20} />
              <span>
                <strong>{item.label}</strong>
                <em>{item.handle}</em>
              </span>
            </a>
          ))}
        </div>
        <div className="contact-actions">
          <Button href={`mailto:${profile.email}`} icon={<Icon name="mail" size={16} />}>
            Email
          </Button>
          <Button href={profile.linkedin} variant="secondary" icon={<Icon name="linkedin" size={16} />}>
            LinkedIn
          </Button>
          <Button href={profile.github} variant="ghost" icon={<Icon name="github" size={16} />}>
            GitHub
          </Button>
          <ResumeButton />
        </div>
      </div>
    </section>
  );
}
