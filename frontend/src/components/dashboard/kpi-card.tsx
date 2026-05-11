"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface KpiCardProps {
  label: string;
  value: number | string;
  unit?: string;
  delta?: number;
  hint?: string;
  icon?: LucideIcon;
  color?: string; // tailwind gradient classes e.g. "from-indigo-500 to-fuchsia-500"
  progress?: number;
  index?: number;
}

export function KpiCard({
  label,
  value,
  unit,
  delta,
  hint,
  icon: Icon,
  color = "from-indigo-500 to-fuchsia-500",
  progress,
  index = 0,
}: KpiCardProps) {
  const positive = (delta ?? 0) >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Card className="relative overflow-hidden">
        <div
          className={cn(
            "absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl opacity-30 bg-gradient-to-br",
            color,
          )}
        />
        <CardContent className="p-5 relative">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{label}</p>
            {Icon && (
              <div
                className={cn(
                  "grid place-items-center h-9 w-9 rounded-xl text-white bg-gradient-to-br shadow-md",
                  color,
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
            )}
          </div>

          <div className="mt-3 flex items-baseline gap-1.5">
            <p className="font-display text-3xl font-bold">{value}</p>
            {unit && (
              <span className="text-sm text-muted-foreground">{unit}</span>
            )}
          </div>

          {typeof delta === "number" && (
            <div
              className={cn(
                "mt-1 inline-flex items-center gap-0.5 text-xs font-medium",
                positive ? "text-emerald-500" : "text-rose-500",
              )}
            >
              {positive ? (
                <ArrowUpRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5" />
              )}
              {Math.abs(delta)}% {hint || "vs last week"}
            </div>
          )}

          {typeof progress === "number" && (
            <div className="mt-4">
              <Progress value={progress} />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
