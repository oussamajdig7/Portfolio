import { motion, useReducedMotion } from "framer-motion";

export function MotionReveal({ children, className, delay }) {
  const reduce = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut", delay: delay ?? 0 },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
