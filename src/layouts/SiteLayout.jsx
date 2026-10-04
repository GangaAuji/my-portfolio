import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { ScrollMotion } from "../components/ScrollMotion";
import { SkipLink } from "../components/SkipLink";

export function SiteLayout() {
  return (
    <div className="site-shell">
      <SkipLink />
      <Navbar />
      <ScrollMotion />
      <main id="main" className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
