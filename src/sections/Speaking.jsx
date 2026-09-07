import { useContent } from "../context/useContent";
import { SpeakingCard } from "../components/SpeakingCard";
import { SectionHeading } from "../components/SectionHeading";

export function Speaking() {
  const { content } = useContent();

  return (
    <section className="section">
      <SectionHeading
        eyebrow="07 / Speaking & Training"
        title="Teaching the practice, not just the tools"
        description="Workshops and crash courses delivered as a trainer."
      />
      <div className="speaking-grid">
        {content.speaking.map((item) => (
          <SpeakingCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
