"use client";

import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Connect your study life",
    desc: "Sync attendance, assignments, and daily activity. The twin starts learning from day one.",
  },
  {
    n: "02",
    title: "Train your AI twin",
    desc: "Mood logs, typing patterns, and study sessions create a unique behavioral model of you.",
  },
  {
    n: "03",
    title: "Get personalized predictions",
    desc: "Discover your peak focus hours, weak subjects, and a 7‑day burnout forecast.",
  },
  {
    n: "04",
    title: "Act on smart recommendations",
    desc: "An auto‑generated planner adapts daily. The chat assistant explains every insight.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 relative">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-sm font-semibold text-cyan-400 tracking-widest uppercase">
            How it works
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            From data to <span className="text-gradient">decisions</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-2xl border bg-card p-7 overflow-hidden"
            >
              <div className="absolute -top-12 -right-8 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-cyan-400/10 blur-2xl pointer-events-none" />
              <p className="font-mono text-xs text-fuchsia-400">{s.n}</p>
              <h3 className="font-display text-xl font-bold mt-2">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
