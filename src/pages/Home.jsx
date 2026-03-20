import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { LoadingScreen } from "@/components/site/LoadingScreen";
import { Footer } from "@/components/site/Footer";
import { useTheme } from "@/hooks/useTheme";
import { useActiveSection } from "@/hooks/useActiveSection";
import { portfolio } from "@/data/portfolio";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ContactSection } from "@/components/sections/ContactSection";

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;

  // Smooth scroll and keep the URL hash in sync for shareable deep-links.
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}

export default function Home() {
  const { isDark, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);

  const items = useMemo(
    () => [
      { id: "hero", label: "Home" },
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "projects", label: "Projects" },
      { id: "timeline", label: "Timeline" },
      { id: "contact", label: "Contact" },
    ],
    [],
  );

  const sectionIds = useMemo(() => items.map((i) => i.id), [items]);
  const activeId = useActiveSection({ ids: sectionIds });

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
        activeId={activeId}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onNavigate={(id) => scrollToId(id)}
      />

      <main>
        <HeroSection onPrimaryCta={() => scrollToId("projects")} onSecondaryCta={() => scrollToId("contact")} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TimelineSection />
        <ContactSection />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
