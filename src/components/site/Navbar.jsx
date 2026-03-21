import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/site/ThemeToggle";

export function Navbar({
  brand,
  items,
  isDark,
  onToggleTheme,
}) {
  const [open, setOpen] = useState(false);
  const ordered = useMemo(() => items, [items]);

  return (
    <header className="sticky top-0 z-50">
      <div className="container mx-auto container-px">
        <div
          className="mt-4 flex items-center justify-between gap-3 rounded-2xl border bg-white/70 px-3 py-3 shadow-sm backdrop-blur dark:bg-white/5"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          <Link
            to="/"
            className="rounded-xl px-3 py-2 text-sm font-semibold tracking-tight hover:bg-black/5 dark:hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            {brand}
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Section navigation">
            {ordered.map((it) => (
              <NavLink
                key={it.id}
                to={it.id}
                className={({ isActive }) =>
                  cn(
                    "rounded-xl px-3 py-2 text-sm transition",
                    isActive
                      ? "bg-black/5 font-medium dark:bg-white/10"
                      : "text-[hsl(var(--text-muted))] hover:bg-black/5 hover:text-[hsl(var(--text))] dark:hover:bg-white/10",
                  )
                }
              >
                {it.label}
              </NavLink>
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
              <NavLink
                key={it.id}
                to={it.id}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition",
                    isActive
                      ? "bg-black/5 font-medium dark:bg-white/10"
                      : "text-[hsl(var(--text-muted))] hover:bg-black/5 hover:text-[hsl(var(--text))] dark:hover:bg-white/10",
                  )
                }
              >
                {it.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
