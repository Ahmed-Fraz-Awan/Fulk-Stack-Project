"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { TrendChart } from "@/components/charts/trend-chart";
import { MiniBarChart } from "@/components/charts/bar-chart";
import { RadarSubjects } from "@/components/charts/radar-subjects";
import {
  mockWeekly,
  mockSubjects,
  mockAttendance,
} from "@/lib/mock-data";

export default function AnalyticsPage() {
  const monthly = React.useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
        value: 50 + Math.round(Math.sin(i / 1.5) * 18 + Math.random() * 12),
      })),
    [],
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Analytics
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">
          Deep <span className="text-gradient">analytics</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Explore your study data through interactive charts.
        </p>
      </div>

      <Tabs defaultValue="trends">
        <TabsList>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>7‑day signals</CardTitle>
            </CardHeader>
            <CardContent>
              <TrendChart
                data={mockWeekly}
                xKey="day"
                height={340}
                series={[
                  { key: "productivity", label: "Productivity", color: "rgb(99,102,241)" },
                  { key: "focus", label: "Focus", color: "rgb(34,211,238)" },
                  { key: "stress", label: "Stress", color: "rgb(244,63,94)" },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>30‑day attendance rate</CardTitle>
            </CardHeader>
            <CardContent>
              <TrendChart
                data={mockAttendance}
                xKey="date"
                height={340}
                series={[
                  { key: "rate", label: "Rate %", color: "rgb(16,185,129)" },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects">
          <div className="grid lg:grid-cols-2 gap-5">
            <Card>
              <CardHeader>
                <CardTitle>Subject radar</CardTitle>
              </CardHeader>
              <CardContent>
                <RadarSubjects data={mockSubjects} height={340} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Predicted scores</CardTitle>
              </CardHeader>
              <CardContent>
                <MiniBarChart
                  data={mockSubjects.map((s) => ({
                    name: s.subject,
                    value: s.score,
                  }))}
                  height={340}
                  color="rgb(168,85,247)"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="productivity">
          <Card>
            <CardHeader>
              <CardTitle>Monthly productivity</CardTitle>
            </CardHeader>
            <CardContent>
              <MiniBarChart data={monthly} height={340} color="rgb(99,102,241)" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
