"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Calendar,
  HeartPulse,
  Keyboard,
  MessageSquare,
  BarChart3,
  ShieldCheck,
  Bell,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Digital Twin",
    desc: "A behavior model that learns from your activity, attendance, and study habits in real time.",
    color: "from-indigo-500 to-fuchsia-500",
  },
  {
    icon: HeartPulse,
    title: "Burnout Predictor",
    desc: "Detects rising stress before it becomes a crisis using mood logs and pattern analysis.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Calendar,
    title: "Smart Study Planner",
    desc: "Auto-generated daily schedules tuned to your focus windows and weak subjects.",
    color: "from-emerald-500 to-cyan-500",
  },
  {
    icon: Keyboard,
    title: "Typing Pattern Analyzer",
    desc: "Measures consistency, pauses & speed to compute engagement and focus scores.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: MessageSquare,
    title: "AI Chat Assistant",
    desc: "An always-on tutor for productivity coaching, study help & emotional support.",
    color: "from-sky-500 to-indigo-500",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    desc: "Beautiful charts for attendance, productivity, stress trends & subject mastery.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    desc: "Burnout warnings, assignment alerts, and streak nudges — only when they matter.",
    color: "from-fuchsia-500 to-rose-500",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    desc: "Your data is encrypted in transit & at rest. You own the keys to your twin.",
    color: "from-teal-500 to-emerald-500",
  },
  {
    icon: Sparkles,
    title: "Personalized Insights",
    desc: "Daily AI insight cards that explain the 'why' behind every recommendation.",
    color: "from-cyan-500 to-blue-500",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-sm font-semibold text-fuchsia-400 tracking-widest uppercase">
            Features
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Everything your{" "}
            <span className="text-gradient">study brain</span> needs
          </h2>
          <p className="mt-4 text-muted-foreground">
            Nine interconnected systems, one futuristic experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500/0 via-fuchsia-500/20 to-cyan-400/0 opacity-0 group-hover:opacity-100 blur transition-opacity" />
              <div className="relative h-full rounded-2xl border bg-card p-6 hover:-translate-y-1 transition-transform">
                <div
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} text-white shadow-lg shadow-black/10`}
                >
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
