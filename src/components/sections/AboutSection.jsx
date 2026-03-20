import { portfolio } from "@/data/portfolio";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { SectionShell } from "@/components/site/SectionShell";

export function AboutSection() {
  return (
    <SectionShell id="about" title="About" eyebrow="Background">
      <div className="grid gap-8 lg:grid-cols-3">
        <MotionReveal className="lg:col-span-2">
          <div className="surface p-6 sm:p-8">
            <p className="text-[hsl(var(--text-muted))]">
              I’m a developer who enjoys turning complex problems into simple, elegant interfaces.
              My work focuses on building responsive components, clean UX flows, and performance-first
              experiences.
            </p>
            <p className="mt-4 text-[hsl(var(--text-muted))]">
              I’m currently specializing in React + TypeScript + Laravel, design systems, and building delightful
              interactions that feel fast and accessible.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Accessible, semantic UI",
                "Component-driven architecture",
                "Performance & DX focus",
                "Polished motion design",
              ].map((t) => (
                <div
                  key={t}
                  className="rounded-2xl border bg-white/60 px-4 py-3 text-sm text-[hsl(var(--text-muted))] dark:bg-white/5"
                  style={{ borderColor: "hsl(var(--border))" }}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.05}>
          <div className="surface p-6 sm:p-8">
            <div className="text-sm font-semibold">Quick facts</div>
            <div className="mt-4 space-y-3 text-sm text-[hsl(var(--text-muted))]">
              <div className="flex items-center justify-between gap-3">
                <span>Location</span>
                <span className="font-medium text-[hsl(var(--text))]">{portfolio.location}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Role</span>
                <span className="font-medium text-[hsl(var(--text))]">{portfolio.title}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Contact</span>
                <a
                  className="font-medium"
                  href={`mailto:${portfolio.email}`}
                  style={{ color: "hsl(var(--accent))" }}
                >
                  {portfolio.email}
                </a>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </SectionShell>
  );
}
