"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Users, ShieldAlert, TrendingUp, Activity } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { mockStudents } from "@/lib/mock-data";

export default function AdminPage() {
  const [q, setQ] = React.useState("");
  const filtered = React.useMemo(
    () =>
      mockStudents.filter(
        (s) =>
          s.name.toLowerCase().includes(q.toLowerCase()) ||
          s.email.toLowerCase().includes(q.toLowerCase()),
      ),
    [q],
  );

  const avgProductivity = Math.round(
    mockStudents.reduce((a, s) => a + s.productivity, 0) / mockStudents.length,
  );
  const highRisk = mockStudents.filter((s) => s.risk === "high").length;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Admin
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">
          Cohort <span className="text-gradient">command center</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor every student. Intervene before they burn out.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          label="Students"
          value={mockStudents.length}
          icon={Users}
          color="from-indigo-500 to-fuchsia-500"
        />
        <KpiCard
          label="Avg productivity"
          value={avgProductivity}
          unit="/100"
          icon={Activity}
          progress={avgProductivity}
          color="from-emerald-500 to-cyan-500"
        />
        <KpiCard
          label="High burnout risk"
          value={highRisk}
          icon={ShieldAlert}
          color="from-rose-500 to-orange-500"
        />
        <KpiCard
          label="Weekly engagement"
          value={88}
          unit="%"
          icon={TrendingUp}
          progress={88}
          color="from-fuchsia-500 to-purple-500"
        />
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Students</CardTitle>
          <div className="w-64">
            <Input
              placeholder="Search students…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b">
                <th className="text-left py-3 px-2 font-medium">Name</th>
                <th className="text-left py-3 px-2 font-medium">Email</th>
                <th className="text-left py-3 px-2 font-medium">Productivity</th>
                <th className="text-left py-3 px-2 font-medium">Burnout</th>
                <th className="text-left py-3 px-2 font-medium">Attendance</th>
                <th className="text-left py-3 px-2 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <motion.tr
                  key={s.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className="border-b last:border-0 hover:bg-accent/40"
                >
                  <td className="py-3 px-2 font-medium">{s.name}</td>
                  <td className="py-3 px-2 text-muted-foreground">{s.email}</td>
                  <td className="py-3 px-2 w-40">
                    <div className="flex items-center gap-2">
                      <Progress value={s.productivity} className="w-24" />
                      <span className="text-xs">{s.productivity}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 w-40">
                    <div className="flex items-center gap-2">
                      <Progress
                        value={s.burnout}
                        className="w-24"
                        indicatorClassName="bg-gradient-to-r from-rose-500 to-orange-500"
                      />
                      <span className="text-xs">{s.burnout}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">{s.attendance}%</td>
                  <td className="py-3 px-2">
                    <Badge
                      variant={
                        s.risk === "high"
                          ? "destructive"
                          : s.risk === "medium"
                          ? "warning"
                          : "success"
                      }
                    >
                      {s.risk}
                    </Badge>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
