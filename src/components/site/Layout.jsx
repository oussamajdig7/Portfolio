import { useMemo, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { LoadingScreen } from "@/components/site/LoadingScreen";
import { CustomCursor } from "@/components/site/CustomCursor";
import { useTheme } from "@/hooks/useTheme";
import { portfolio } from "@/data/portfolio";

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Mesh Gradient / Glows */}
      <motion.div
        className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -right-[10%] bottom-[10%] h-[600px] w-[600px] rounded-full bg-indigo-500/20 blur-[150px]"
        animate={{
          x: [0, -80, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--accent))]/10 blur-[100px]"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.07]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--text)) 1px, transparent 0)`,
          backgroundSize: '40px 40px' 
        }}
      />
    </div>
  );
}

export function Layout() {
  const { isDark, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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
    <div className="relative min-h-screen">
      <CustomCursor />
      <AnimatedBackground />
      
      <Navbar
        brand={portfolio.name}
        items={items}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
