export function SectionShell({ id, title, eyebrow, children }) {
  return (
    <section id={id} className="scroll-mt-28 py-16 sm:py-20">
      <div className="container mx-auto container-px">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            {eyebrow ? (
              <div className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--text-muted))]">
                {eyebrow}
              </div>
            ) : null}
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}
