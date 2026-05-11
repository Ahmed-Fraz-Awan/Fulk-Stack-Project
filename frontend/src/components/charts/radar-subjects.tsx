"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Props {
  data: { subject: string; score: number; fullMark: number }[];
  height?: number;
}

export function RadarSubjects({ data, height = 280 }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} outerRadius="78%">
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis
          dataKey="subject"
          stroke="hsl(var(--muted-foreground))"
          fontSize={11}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          stroke="hsl(var(--muted-foreground))"
          tick={false}
          axisLine={false}
        />
        <Radar
          dataKey="score"
          stroke="rgb(168,85,247)"
          fill="rgb(168,85,247)"
          fillOpacity={0.35}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 12,
            fontSize: 12,
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
