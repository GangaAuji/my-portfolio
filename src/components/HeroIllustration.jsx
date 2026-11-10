import bannerSvg from "../assets/hero/home-banner.svg?raw";
import { assetUrl } from "../api/client";
import { useContent } from "../context/useContent";

export function HeroIllustration() {
  const { content } = useContent();
  const uploaded = content.media?.hero;

  if (uploaded) {
    return (
      <figure className="hero-illustration" aria-label="End-to-end automation flow from Git through CI/CD">
        <img
          src={assetUrl(uploaded)}
          alt="End-to-end automation flow from Git through CI/CD"
          className="hero-photo"
        />
      </figure>
    );
  }

  return (
    <figure
      className="hero-illustration"
      aria-label="End-to-end automation flow from Git through CI/CD"
      dangerouslySetInnerHTML={{ __html: bannerSvg }}
    />
  );
}
