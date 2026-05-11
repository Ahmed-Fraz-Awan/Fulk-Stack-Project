"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Activity,
  Brain,
  Calendar,
  CheckCircle2,
  Flame,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { InsightCard } from "@/components/dashboard/insight-card";
import { TrendChart } from "@/components/charts/trend-chart";
import { RadarSubjects } from "@/components/charts/radar-subjects";
import { DonutChart } from "@/components/charts/donut-chart";
import { api, endpoints } from "@/lib/api";
import {
  mockKpis,
  mockWeekly,
  mockSubjects,
  mockInsights,
} from "@/lib/mock-data";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [kpis, setKpis] = React.useState(mockKpis);
  const [weekly, setWeekly] = React.useState(mockWeekly);
  const [subjects, setSubjects] = React.useState(mockSubjects);
  const [insights, setInsights] = React.useState(mockInsights);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    api
      .get(endpoints.dashboard)
      .then((res) => {
        if (cancelled) return;
        const d = res.data || {};
        if (d.kpis) setKpis(d.kpis);
        if (d.weekly) setWeekly(d.weekly);
        if (d.subjects) setSubjects(d.subjects);
        if (d.insights) setInsights(d.insights);
      })
      .catch(() => void 0)
      .finally(() => setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const greet = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();
  const name = session?.user?.name?.split(" ")[0] || "Student";

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Overview
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">
            {greet}, <span className="text-gradient">{name}</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your AI Twin is up to date · last sync 2 min ago
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="success" className="gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Twin live
          </Badge>
          <Button variant="gradient">
            <Zap className="h-4 w-4" /> Run prediction
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard
          index={0}
          label="Productivity"
          value={kpis.productivityScore}
          unit="/100"
          delta={8}
          icon={Activity}
          progress={kpis.productivityScore}
          color="from-indigo-500 to-fuchsia-500"
        />
        <KpiCard
          index={1}
          label="Burnout Risk"
          value={kpis.burnoutRisk}
          unit="/100"
          delta={-4}
          hint="this week"
          icon={Flame}
          progress={kpis.burnoutRisk}
          color="from-rose-500 to-orange-500"
        />
        <KpiCard
          index={2}
          label="Attendance"
          value={kpis.attendance}
          unit="%"
          delta={3}
          icon={CheckCircle2}
          progress={kpis.attendance}
          color="from-emerald-500 to-cyan-500"
        />
        <KpiCard
          index={3}
          label="Assignments"
          value={kpis.assignmentCompletion}
          unit="%"
          delta={6}
          icon={Calendar}
          progress={kpis.assignmentCompletion}
          color="from-sky-500 to-indigo-500"
        />
        <KpiCard
          index={4}
          label="Focus"
          value={kpis.focusScore}
          unit="/100"
          delta={2}
          icon={Brain}
          progress={kpis.focusScore}
          color="from-fuchsia-500 to-purple-500"
        />
        <KpiCard
          index={5}
          label="Consistency"
          value={kpis.consistency}
          unit="/100"
          delta={5}
          icon={TrendingUp}
          progress={kpis.consistency}
          color="from-amber-500 to-rose-500"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Weekly trends</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Productivity, focus & stress signals
              </p>
            </div>
            <Badge variant="outline" className="gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              Last 7 days
            </Badge>
          </CardHeader>
          <CardContent>
            <TrendChart
              data={weekly}
              xKey="day"
              series={[
                {
                  key: "productivity",
                  label: "Productivity",
                  color: "rgb(99,102,241)",
                },
                { key: "focus", label: "Focus", color: "rgb(34,211,238)" },
                { key: "stress", label: "Stress", color: "rgb(244,63,94)" },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subject mastery</CardTitle>
            <p className="text-xs text-muted-foreground">
              Predicted performance per subject
            </p>
          </CardHeader>
          <CardContent>
            <RadarSubjects data={subjects} />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>AI insights</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Generated by your twin · refreshed daily
              </p>
            </div>
            <Button variant="ghost" size="sm">Refresh</Button>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-3">
            {insights.map((i, idx) => (
              <InsightCard
                key={i.id}
                title={i.title}
                body={i.body}
                tone={i.tone}
                index={idx}
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mental wellbeing</CardTitle>
            <p className="text-xs text-muted-foreground">7‑day mood score</p>
          </CardHeader>
          <CardContent className="grid place-items-center">
            <DonutChart value={73} label="Wellbeing" color="#22c55e" />
            <p className="text-xs text-muted-foreground mt-3 text-center max-w-[16rem]">
              Mood trending stable. Stress spike noted Saturday — short walk
              recommended.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
