"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Cpu,
  Activity,
  Sparkles,
  Zap,
  Heart,
  Target,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { aiApi } from "@/lib/api";
import { toast } from "sonner";

const TRAITS = [
  { key: "focus", label: "Focus", value: 78, icon: Target, color: "from-indigo-500 to-fuchsia-500" },
  { key: "consistency", label: "Consistency", value: 84, icon: Activity, color: "from-emerald-500 to-cyan-500" },
  { key: "resilience", label: "Resilience", value: 67, icon: Heart, color: "from-rose-500 to-orange-500" },
  { key: "curiosity", label: "Curiosity", value: 91, icon: Sparkles, color: "from-fuchsia-500 to-purple-500" },
  { key: "discipline", label: "Discipline", value: 72, icon: Brain, color: "from-cyan-500 to-blue-500" },
  { key: "speed", label: "Adaptability", value: 80, icon: Zap, color: "from-amber-500 to-rose-500" },
];

export default function TwinPage() {
  const [predictions, setPredictions] = React.useState<{
    burnout: number;
    performance: number;
    productivity: number;
  } | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function runPredictions() {
    setLoading(true);
    try {
      const [b, p, pr] = await Promise.all([
        aiApi.post("/predictions/burnout", {
          attendance: 91,
          assignments: 88,
          stress: 38,
          sleep: 6.5,
        }),
        aiApi.post("/predictions/performance", {
          attendance: 91,
          assignments: 88,
          studyHours: 4.2,
          consistency: 84,
        }),
        aiApi.post("/predictions/productivity", {
          typingSpeed: 56,
          activeMinutes: 220,
          breaks: 4,
          mood: 7,
        }),
      ]);
      setPredictions({
        burnout: Math.round((b.data.score ?? 0.27) * 100),
        performance: Math.round((p.data.score ?? 0.82) * 100),
        productivity: Math.round((pr.data.score ?? 0.78) * 100),
      });
      toast.success("Twin predictions updated");
    } catch {
      setPredictions({ burnout: 27, performance: 82, productivity: 78 });
      toast.message("AI offline — showing sample predictions");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    runPredictions();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Digital twin
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">
            Your <span className="text-gradient">behavior model</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            A living blueprint of how you learn, focus and rest.
          </p>
        </div>
        <Button variant="gradient" onClick={runPredictions} disabled={loading}>
          <Cpu className="h-4 w-4" />
          {loading ? "Computing…" : "Recompute predictions"}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Twin avatar */}
        <Card className="lg:col-span-1 overflow-hidden relative">
          <div className="absolute inset-0 bg-aurora opacity-60 pointer-events-none" />
          <CardContent className="relative p-8 grid place-items-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-indigo-500/40 via-fuchsia-500/40 to-cyan-400/40 blur-2xl animate-glow" />
              <div className="relative h-44 w-44 rounded-full grid place-items-center bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 text-white shadow-2xl">
                <Brain className="h-20 w-20" />
              </div>
            </motion.div>

            <Badge variant="success" className="mt-6 gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Twin synced · v2.0
            </Badge>

            <div className="mt-6 grid grid-cols-3 gap-4 w-full text-center">
              <div>
                <p className="font-display text-2xl font-bold">
                  {predictions?.performance ?? 82}
                </p>
                <p className="text-[10px] text-muted-foreground">Performance</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-rose-400">
                  {predictions?.burnout ?? 27}
                </p>
                <p className="text-[10px] text-muted-foreground">Burnout risk</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-emerald-400">
                  {predictions?.productivity ?? 78}
                </p>
                <p className="text-[10px] text-muted-foreground">Productivity</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traits */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Behavioral traits</CardTitle>
            <p className="text-xs text-muted-foreground">
              Inferred from 30 days of data
            </p>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            {TRAITS.map((t, i) => (
              <motion.div
                key={t.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-9 w-9 grid place-items-center rounded-xl text-white bg-gradient-to-br ${t.color}`}
                    >
                      <t.icon className="h-4 w-4" />
                    </div>
                    <p className="font-medium">{t.label}</p>
                  </div>
                  <p className="font-display text-lg font-bold">{t.value}</p>
                </div>
                <div className="mt-3">
                  <Progress value={t.value} />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Twin reasoning</CardTitle>
          <p className="text-xs text-muted-foreground">
            How the AI arrived at today's predictions
          </p>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          {[
            {
              label: "Inputs",
              items: ["Attendance 91%", "Assignments 88%", "Sleep ~6.5h", "Stress 38/100"],
            },
            {
              label: "Signals",
              items: ["High focus 9–11 AM", "Weekend stress spike", "DSA streak: 12 days"],
            },
            {
              label: "Conclusions",
              items: ["Low burnout risk", "Strong performance trajectory", "Productivity stable"],
            },
          ].map((g) => (
            <div key={g.label} className="rounded-2xl border bg-card p-4">
              <p className="text-xs uppercase tracking-widest text-fuchsia-400 font-semibold">
                {g.label}
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {g.items.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
