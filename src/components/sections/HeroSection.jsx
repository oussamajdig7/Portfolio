import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { MotionReveal } from "@/components/motion/MotionReveal";

export function HeroSection({ onPrimaryCta, onSecondaryCta }) {
  const reduce = useReducedMotion();

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
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

                <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                  {portfolio.name}
                </h1>
                <p className="mt-3 text-lg text-[hsl(var(--text-muted))] sm:text-xl">{portfolio.title}</p>

                <p className="mt-6 max-w-xl text-[hsl(var(--text-muted))]">{portfolio.intro}</p>

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
              className="relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
              animate={
                reduce
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      scale: 1,
                      y: [0, -15, 0], // Floating effect
                    }
              }
              transition={
                reduce
                  ? { duration: 0.6 }
                  : {
                      opacity: { duration: 0.6 },
                      scale: { duration: 0.6 },
                      y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
              }
              style={{
                perspective: "1000px",
              }}
            >
              <motion.div
                className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-cyan-500/20 via-transparent to-indigo-500/20 blur-2xl"
                animate={reduce ? {} : { opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="surface relative overflow-hidden p-3"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
              >
                <img
                  src={portfolio.profileImageSrc}
                  alt="Profile"
                  className="aspect-square w-full rounded-2xl object-cover shadow-2xl"
                  style={{ 
                    imageRendering: "auto",
                    transform: "translateZ(50px)", // Pop out the image a bit
                  }}
                  loading="lazy"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
