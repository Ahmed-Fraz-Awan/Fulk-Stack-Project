"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

const stats = [
  { label: "Avg. productivity uplift", value: 34, suffix: "%" },
  { label: "Burnout predicted in advance", value: 7, suffix: " days" },
  { label: "Study patterns analyzed", value: 1280, suffix: "+" },
  { label: "Student satisfaction", value: 96, suffix: "%" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [val, setVal] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.6, ease: "easeOut" });
    const unsub = rounded.on("change", (v) => setVal(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, to, mv, rounded]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl font-bold">
      {val}
      <span className="text-fuchsia-400">{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="rounded-3xl border bg-gradient-to-br from-background to-accent/40 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-aurora opacity-40 pointer-events-none" />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <Counter to={s.value} suffix={s.suffix} />
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
