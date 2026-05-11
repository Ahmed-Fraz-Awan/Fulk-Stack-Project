"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { TrendChart } from "@/components/charts/trend-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { aiApi } from "@/lib/api";
import { toast } from "sonner";

const moods = [
  { emoji: "😄", label: "Great", value: 5 },
  { emoji: "🙂", label: "Good", value: 4 },
  { emoji: "😐", label: "Okay", value: 3 },
  { emoji: "😟", label: "Low", value: 2 },
  { emoji: "😣", label: "Stressed", value: 1 },
];

const week = [
  { day: "Mon", mood: 4, stress: 30 },
  { day: "Tue", mood: 5, stress: 28 },
  { day: "Wed", mood: 3, stress: 50 },
  { day: "Thu", mood: 4, stress: 35 },
  { day: "Fri", mood: 5, stress: 22 },
  { day: "Sat", mood: 2, stress: 64 },
  { day: "Sun", mood: 3, stress: 48 },
];

export default function MoodPage() {
  const [picked, setPicked] = React.useState<number | null>(4);
  const [note, setNote] = React.useState("");
  const [stress, setStress] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function analyze() {
    setLoading(true);
    try {
      const res = await aiApi.post("/predictions/stress", {
        mood: picked,
        note,
      });
      setStress(Math.round((res.data?.score ?? 0.34) * 100));
      toast.success("Mood logged · AI analyzed");
    } catch {
      setStress(34);
      toast.message("AI offline — sample score shown");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Mood & Stress
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">
          How are you <span className="text-gradient">today</span>?
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Daily check‑in</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-5 gap-2">
              {moods.map((m) => (
                <motion.button
                  key={m.value}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setPicked(m.value)}
                  className={`rounded-2xl border p-4 text-center transition-colors ${
                    picked === m.value
                      ? "border-fuchsia-500/50 bg-fuchsia-500/10"
                      : "hover:bg-accent"
                  }`}
                >
                  <p className="text-3xl">{m.emoji}</p>
                  <p className="mt-1 text-xs">{m.label}</p>
                </motion.button>
              ))}
            </div>

            <div>
              <p className="text-sm font-medium mb-2">
                Anything on your mind?
              </p>
              <Textarea
                placeholder="Optional — your AI Twin uses this to refine its model."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <Button
              variant="gradient"
              onClick={analyze}
              disabled={loading || picked === null}
            >
              {loading ? "Analyzing…" : "Log & analyze"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI stress estimate</CardTitle>
          </CardHeader>
          <CardContent className="grid place-items-center">
            <DonutChart
              value={stress ?? 34}
              label="Stress"
              color={(stress ?? 34) > 60 ? "#f43f5e" : (stress ?? 34) > 40 ? "#f59e0b" : "#10b981"}
            />
            <Badge
              variant={
                (stress ?? 34) > 60
                  ? "destructive"
                  : (stress ?? 34) > 40
                  ? "warning"
                  : "success"
              }
              className="mt-4"
            >
              {(stress ?? 34) > 60
                ? "Elevated — take a real break"
                : (stress ?? 34) > 40
                ? "Watch your pace"
                : "Healthy range"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly mood & stress</CardTitle>
        </CardHeader>
        <CardContent>
          <TrendChart
            data={week}
            xKey="day"
            height={280}
            series={[
              { key: "mood", label: "Mood (1‑5)", color: "rgb(16,185,129)" },
              { key: "stress", label: "Stress (%)", color: "rgb(244,63,94)" },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
