import { useMemo, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { LoadingScreen } from "@/components/site/LoadingScreen";
import { useTheme } from "@/hooks/useTheme";
import { portfolio } from "@/data/portfolio";

export function Layout() {
  const { isDark, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);

  const items = useMemo(
    () => [
      { id: "/", label: "Home" },
      { id: "/about", label: "About" },
      { id: "/skills", label: "Skills" },
      { id: "/projects", label: "Projects" },
      { id: "/timeline", label: "Timeline" },
      { id: "/contact", label: "Contact" },
    ],
    [],
  );

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(t);
  }, []);

  if (loading) return <LoadingScreen label="Warming up the UI…" />;

  return (
    <div>
      <Navbar
        brand={portfolio.name}
        items={items}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main>
        <Outlet />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
