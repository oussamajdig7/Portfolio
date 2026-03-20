import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/site/ThemeToggle";

export function Navbar({
  brand,
  items,
  activeId,
  isDark,
  onToggleTheme,
  onNavigate,
}) {
  const [open, setOpen] = useState(false);
  const ordered = useMemo(() => items, [items]);

  const handleNav = (id) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="container mx-auto container-px">
        <div
          className="mt-4 flex items-center justify-between gap-3 rounded-2xl border bg-white/70 px-3 py-3 shadow-sm backdrop-blur dark:bg-white/5"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          <button
            type="button"
            className="rounded-xl px-3 py-2 text-sm font-semibold tracking-tight hover:bg-black/5 dark:hover:bg-white/10"
            onClick={() => handleNav(ordered[0]?.id ?? "hero")}
          >
            {brand}
          </button>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Section navigation">
            {ordered.map((it) => (
              <button
                key={it.id}
                type="button"
                onClick={() => handleNav(it.id)}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm transition",
                  it.id === activeId
                    ? "bg-black/5 font-medium dark:bg-white/10"
                    : "text-[hsl(var(--text-muted))] hover:bg-black/5 hover:text-[hsl(var(--text))] dark:hover:bg-white/10",
                )}
              >
                {it.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border transition hover:bg-black/5 dark:hover:bg-white/10 md:hidden"
              style={{ borderColor: "hsl(var(--border))" }}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "overflow-hidden transition-[max-height] md:hidden",
            open ? "max-h-96" : "max-h-0",
          )}
        >
          <div
            className="mt-2 rounded-2xl border bg-white/70 p-2 shadow-sm backdrop-blur dark:bg-white/5"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            {ordered.map((it) => (
              <button
                key={it.id}
                type="button"
                onClick={() => handleNav(it.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition",
                  it.id === activeId
                    ? "bg-black/5 font-medium dark:bg-white/10"
                    : "text-[hsl(var(--text-muted))] hover:bg-black/5 hover:text-[hsl(var(--text))] dark:hover:bg-white/10",
                )}
              >
                {it.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
