import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { SkipLink } from "../components/SkipLink";
import { useTheme } from "../hooks/useTheme";

export function SiteLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <SkipLink />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
