"use client";

import { motion } from "framer-motion";
import { Sparkles, AlertTriangle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  body: string;
  tone?: "positive" | "warning" | "info";
  index?: number;
}

const tones = {
  positive: {
    icon: Sparkles,
    gradient: "from-emerald-500/20 to-cyan-400/10",
    badge: "text-emerald-500 bg-emerald-500/15",
    label: "Insight",
  },
  warning: {
    icon: AlertTriangle,
    gradient: "from-amber-500/20 to-rose-500/10",
    badge: "text-amber-500 bg-amber-500/15",
    label: "Alert",
  },
  info: {
    icon: Lightbulb,
    gradient: "from-indigo-500/20 to-fuchsia-500/10",
    badge: "text-indigo-400 bg-indigo-500/15",
    label: "Suggestion",
  },
};

export function InsightCard({ title, body, tone = "info", index = 0 }: Props) {
  const t = tones[tone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn(
        "relative rounded-2xl border p-5 overflow-hidden bg-gradient-to-br",
        t.gradient,
      )}
    >
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
      <div className="relative flex items-start gap-3">
        <div className={cn("h-9 w-9 grid place-items-center rounded-xl", t.badge)}>
          <t.icon className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-[10px] font-semibold uppercase tracking-wider rounded-full px-2 py-0.5",
                t.badge,
              )}
            >
              {t.label}
            </span>
          </div>
          <p className="mt-1.5 font-semibold">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            {body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
