import { MotionReveal } from "@/components/motion/MotionReveal";
import { SectionShell } from "@/components/site/SectionShell";
import { portfolio } from "@/data/portfolio";

export function SkillsSection() {
  return (
    <SectionShell id="skills" title="Skills" eyebrow="Toolbox">
      <div className="grid gap-6 lg:grid-cols-3">
        {portfolio.skills.map((group, idx) => (
          <MotionReveal key={group.title} delay={idx * 0.03}>
            <div className="surface p-6 sm:p-8">
              <div className="text-sm font-semibold">{group.title}</div>
              <div className="mt-6 space-y-5">
                {group.items.map((s) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{s.name}</span>
                      <span className="text-[hsl(var(--text-muted))]">{s.level}%</span>
                    </div>
                    <div
                      className="mt-2 h-2 rounded-full bg-black/5 dark:bg-white/10"
                      role="progressbar"
                      aria-valuenow={s.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${s.name} proficiency`}
                    >
                      <div
                        className="h-2 rounded-full"
                        style={{ width: `${s.level}%`, background: "hsl(var(--accent))" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MotionReveal>
        ))}
      </div>
    </SectionShell>
  );
}
