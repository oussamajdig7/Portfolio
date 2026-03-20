import { motion, useReducedMotion } from "framer-motion";

export function LoadingScreen({ label }) {
  const reduce = useReducedMotion();

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-[hsl(var(--bg))]">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="h-12 w-12 rounded-2xl border"
          style={{ borderColor: "hsl(var(--border))" }}
          animate={
            reduce
              ? { opacity: 1 }
              : { rotate: 360, borderRadius: [16, 24, 16], scale: [1, 1.05, 1] }
          }
          transition={reduce ? { duration: 0 } : { duration: 1.1, repeat: Infinity, ease: "linear" }}
        />
        <div className="text-sm text-[hsl(var(--text-muted))]">{label ?? "Loading…"}</div>
      </div>
    </div>
  );
}
