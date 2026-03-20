import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { SectionShell } from "@/components/site/SectionShell";
import { portfolio } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useState } from "react";

function TechBadge({ label }) {
  return (
    <span
      className="rounded-full border bg-white/60 px-2.5 py-1 text-xs text-[hsl(var(--text-muted))] dark:bg-white/5"
      style={{ borderColor: "hsl(var(--border))" }}
    >
      {label}
    </span>
  );
}

function ProjectCard({ project, onHoverImage }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="surface group overflow-hidden flex flex-col h-full"
    >
      <div 
        className="relative overflow-hidden cursor-zoom-in"
        onMouseEnter={() => onHoverImage(project.imageSrc)}
        onMouseLeave={() => onHoverImage(null)}
      >
        <img
          src={project.imageSrc}
          alt={`${project.title} cover`}
          className="h-44 w-full object-cover sm:h-52 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="text-base font-semibold">{project.title}</div>
        <p className="mt-2 text-sm text-[hsl(var(--text-muted))] flex-grow">
          {project.description}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <TechBadge key={t} label={t} />
          ))}
        </div>

        <div className="mt-6 flex gap-3 pt-4 border-t" style={{ borderColor: "hsl(var(--border))" }}>
          <a
            className={cn(
              "flex-1 inline-flex items-center justify-center gap-2 rounded-xl border bg-white/50 px-3 py-2 text-xs font-medium transition hover:bg-black/5 dark:bg-white/5 dark:hover:bg-white/10",
            )}
            style={{ borderColor: "hsl(var(--border))" }}
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Github className="h-4 w-4" /> Repo
          </a>
          <a
            className={cn(
              "flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--accent))] px-3 py-2 text-xs font-medium text-white transition hover:opacity-90",
            )}
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink className="h-4 w-4" /> Demo
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const [hoveredImage, setHoveredImage] = useState(null);

  return (
    <SectionShell id="projects" title="Projects" eyebrow="Selected work">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {portfolio.projects.map((p, idx) => (
          <MotionReveal key={p.title} delay={idx * 0.03}>
            <ProjectCard project={p} onHoverImage={setHoveredImage} />
          </MotionReveal>
        ))}
      </div>

      {/* Full-screen (75%) Hover Preview */}
      <AnimatePresence>
        {hoveredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div className="relative w-full max-w-[75vw] aspect-video overflow-hidden rounded-3xl border-4 border-white/20 shadow-2xl">
              <img
                src={hoveredImage}
                alt="Project preview"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}
