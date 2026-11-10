import { useContent } from "../context/useContent";
import { SpeakingCard } from "../components/SpeakingCard";
import { SectionHeading } from "../components/SectionHeading";

export function Speaking() {
  const { content } = useContent();

  return (
    <section className="section">
      <SectionHeading
        title="Speaking & Training"
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
