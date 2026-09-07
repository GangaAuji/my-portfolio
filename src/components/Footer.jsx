import { useContent } from "../context/useContent";
import { socialsFrom } from "../utils/socials";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();
  const { content } = useContent();
  const socials = socialsFrom(content.profile).filter((item) => item.id !== "phone");

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>
          © {year} {content.profile.name}. All rights reserved.
        </p>
        <SocialLinks links={socials} />
      </div>
    </footer>
  );
}
