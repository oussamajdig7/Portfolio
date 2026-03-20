import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ isDark, onToggle }) {
  const Icon = isDark ? Sun : Moon;
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border transition hover:bg-black/5 dark:hover:bg-white/10"
      style={{ borderColor: "hsl(var(--border))" }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
