import { MotionReveal } from "@/components/motion/MotionReveal";
import { SectionShell } from "@/components/site/SectionShell";
import { portfolio } from "@/data/portfolio";

function TimelineCard({ item }) {
  return (
    <div className="surface relative p-6 sm:p-8">
      <div className="flex flex-col gap-1">
        <div className="text-sm font-semibold">{item.title}</div>
        <div className="text-sm text-[hsl(var(--text-muted))]">
          {item.org} · {item.period}
        </div>
      </div>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[hsl(var(--text-muted))]">
        {item.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

export function TimelineSection() {
  return (
    <SectionShell id="timeline" title="Experience" eyebrow="Timeline">
      <div className="relative">
        <div
          className="absolute left-4 top-1 hidden h-full w-px sm:block"
          style={{ background: "hsl(var(--border))" }}
        />

        <div className="space-y-6">
          {portfolio.timeline.map((t, idx) => (
            <MotionReveal key={`${t.title}-${t.period}`} delay={idx * 0.03}>
              <div className="sm:pl-10">
                <div className="relative">
                  <div
                    className="absolute -left-10 top-7 hidden h-3 w-3 rounded-full sm:block"
                    style={{ background: "hsl(var(--accent))" }}
                    aria-hidden="true"
                  />
                  <TimelineCard item={t} />
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
