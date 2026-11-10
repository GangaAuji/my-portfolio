import { useContent } from "../context/useContent";
import { socialsFrom } from "../utils/socials";
import { ContactForm } from "../components/ContactForm";
import { Icon } from "../components/Icon";
import { SectionHeading } from "../components/SectionHeading";

export function Contact() {
  const { content } = useContent();
  const { profile } = content;
  const socials = socialsFrom(profile).filter((item) => item.id === "linkedin" || item.id === "github");

  return (
    <section className="section contact-section">
      <div className="contact-layout">
        <div>
          <SectionHeading
            title={profile.contactCta}
            description={profile.contactNote}
          />
          <div className="contact-socials">
            {socials.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={item.label}
              >
                <Icon name={item.id} size={20} />
              </a>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
