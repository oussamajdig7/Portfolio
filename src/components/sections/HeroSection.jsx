import { motion, useReducedMotion, useMotionValue, useSpring, useTransform, useTime } from "framer-motion";
import { ArrowDown, ArrowUpRight, Code, Cpu, Layout } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { ScratchReveal } from "@/components/site/ScratchReveal";

export function HeroSection({ onPrimaryCta, onSecondaryCta }) {
  const reduce = useReducedMotion();
  const time = useTime();

  // 3D Tilt Effect based on mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseX);
  const mouseYSpring = useSpring(mouseY);

  // Subtle continuous camera drift (smooth loop)
  const driftX = useTransform(time, (t) => Math.sin(t / 2000) * 0.05);
  const driftY = useTransform(time, (t) => Math.cos(t / 1500) * 0.05);

  // Combine mouse and drift for the final rotation
  const rotateX = useTransform(
    [mouseYSpring, driftY],
    ([mY, dY]) => (mY + dY) * -35 + "deg"
  );
  const rotateY = useTransform(
    [mouseXSpring, driftX],
    ([mX, dX]) => (mX + dX) * 35 + "deg"
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPct = x / width - 0.5;
    const yPct = y / height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="hero" className="scroll-mt-28">
      <div className="container mx-auto container-px">
        <div className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <MotionReveal>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border bg-white/60 px-3 py-1 text-xs text-[hsl(var(--text-muted))] backdrop-blur dark:bg-white/5">
                  <span className="h-2 w-2 rounded-full" style={{ background: "hsl(var(--accent))" }} />
                  <span>{portfolio.location}</span>
                </div>

                <motion.h1 
                  className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {portfolio.name.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>
                <motion.p 
                  className="mt-3 text-lg text-[hsl(var(--text-muted))] sm:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {portfolio.title}
                </motion.p>

                <motion.p 
                  className="mt-6 max-w-xl text-[hsl(var(--text-muted))]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {portfolio.intro}
                </motion.p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button type="button" className="btn btn-primary" onClick={onPrimaryCta}>
                    View Projects <ArrowDown className="h-4 w-4" />
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={onSecondaryCta}>
                    Contact <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {portfolio.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={s.href.startsWith("mailto:") ? undefined : "noreferrer"}
                      className="inline-flex items-center gap-2 rounded-xl border bg-white/60 px-3 py-2 text-sm text-[hsl(var(--text-muted))] transition hover:bg-black/5 hover:text-[hsl(var(--text))] dark:bg-white/5 dark:hover:bg-white/10"
                      style={{ borderColor: "hsl(var(--border))" }}
                    >
                      <s.Icon className="h-4 w-4" />
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </MotionReveal>

            <motion.div
              className="relative flex items-center justify-center py-10"
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Background Glow Layers */}
              <motion.div
                className="absolute -inset-10 rounded-full bg-[hsl(var(--accent))]/20 blur-[80px]"
                animate={reduce ? {} : { 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -inset-10 rounded-full bg-cyan-500/10 blur-[60px]"
                animate={reduce ? {} : { 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />

              {/* Main Container (Static now for better scratching) */}
              <div className="relative z-10 w-full max-w-sm">
                {/* Main Image Layer */}
                <div className="surface relative overflow-hidden rounded-[32px] p-2 shadow-2xl">
                  <div className="overflow-hidden rounded-[24px]">
                    <ScratchReveal
                      src={portfolio.profileImageSrc}
                      alt="Profile"
                      className="aspect-[4/5] w-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
