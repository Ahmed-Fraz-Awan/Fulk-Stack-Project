"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Brain, Activity, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* aurora background */}
      <div className="absolute inset-0 bg-aurora opacity-80 pointer-events-none" />
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] opacity-50 dark:opacity-40 animate-gridmove" />
      <div className="absolute top-32 left-1/2 -translate-x-1/2 h-[440px] w-[760px] rounded-full bg-gradient-to-r from-indigo-500/30 via-fuchsia-500/30 to-cyan-400/30 blur-3xl pointer-events-none" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Badge variant="outline" className="mb-6 glass px-3 py-1 gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-fuchsia-400" />
            <span className="text-xs font-medium">
              AI Operating System for Students
            </span>
          </Badge>

          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Your{" "}
            <span className="text-gradient">Digital Twin</span>
            <br />
            that learns how you learn.
          </h1>

          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Predict performance, prevent burnout, and unlock your peak focus
            window — powered by an AI that mirrors your study patterns in
            real time.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/signup">
              <Button variant="gradient" size="lg" className="group">
                Create your AI Twin
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="glass" size="lg">
                See it in action
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <Stat icon={<Brain className="h-3.5 w-3.5" />} label="Behavior modeling" />
            <Stat icon={<Activity className="h-3.5 w-3.5" />} label="Real-time analytics" />
            <Stat icon={<Cpu className="h-3.5 w-3.5" />} label="On-device privacy" />
          </div>
        </motion.div>

        <HeroPreview />
      </div>
    </section>
  );
}

function Stat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-fuchsia-400">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2 }}
      className="relative mx-auto mt-16 max-w-5xl"
    >
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/30 via-fuchsia-500/30 to-cyan-400/30 blur-2xl" />
      <div className="relative rounded-3xl border bg-background/70 backdrop-blur-2xl p-3 shadow-2xl shadow-indigo-500/10">
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b">
            <div className="h-3 w-3 rounded-full bg-red-400/80" />
            <div className="h-3 w-3 rounded-full bg-amber-400/80" />
            <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
            <div className="ml-3 text-[11px] font-mono text-muted-foreground">
              twin.ai/dashboard
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 p-5">
            <PreviewCard
              span="col-span-12 md:col-span-4"
              title="Productivity"
              value="82"
              hint="+8 this week"
              barColor="from-indigo-500 to-fuchsia-500"
              percent={82}
            />
            <PreviewCard
              span="col-span-6 md:col-span-4"
              title="Burnout Risk"
              value="27"
              hint="Low"
              barColor="from-emerald-400 to-cyan-400"
              percent={27}
            />
            <PreviewCard
              span="col-span-6 md:col-span-4"
              title="Focus Score"
              value="76"
              hint="Peak: 9–11 AM"
              barColor="from-fuchsia-500 to-rose-400"
              percent={76}
            />

            <div className="col-span-12 md:col-span-8 rounded-2xl border bg-background/60 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-muted-foreground">
                  Weekly trends
                </p>
                <p className="text-[10px] text-muted-foreground">7 days</p>
              </div>
              <SparkChart />
            </div>

            <div className="col-span-12 md:col-span-4 rounded-2xl border bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-cyan-400/10 p-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                AI insight
              </p>
              <p className="text-sm leading-relaxed">
                Block <span className="text-fuchsia-500 font-medium">9–11 AM</span> for DSA.
                Pause notifications during deep work windows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PreviewCard({
  title,
  value,
  hint,
  percent,
  span,
  barColor,
}: {
  title: string;
  value: string;
  hint: string;
  percent: number;
  span: string;
  barColor: string;
}) {
  return (
    <div className={`${span} rounded-2xl border bg-background/60 p-4`}>
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="font-display text-3xl font-bold mt-1">{value}</p>
      <p className="text-[10px] text-muted-foreground mt-0.5">{hint}</p>
      <div className="mt-3 h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.2, delay: 0.4 }}
        />
      </div>
    </div>
  );
}

function SparkChart() {
  const points = [22, 30, 26, 38, 34, 46, 42, 52, 48, 58, 56, 66, 62, 72];
  const w = 320;
  const h = 90;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const stepX = w / (points.length - 1);
  const norm = (v: number) => h - ((v - min) / (max - min)) * h;
  const d = points
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${norm(v)}`)
    .join(" ");
  const area = `${d} L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24">
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgb(99,102,241)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="rgb(99,102,241)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill="url(#g)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="rgb(168,85,247)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay: 0.4 }}
      />
    </svg>
  );
}
