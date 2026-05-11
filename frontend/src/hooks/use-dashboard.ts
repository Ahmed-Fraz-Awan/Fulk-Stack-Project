"use client";

import { useEffect, useState } from "react";
import { api, endpoints } from "@/lib/api";
import {
  mockKpis,
  mockWeekly,
  mockSubjects,
  mockInsights,
} from "@/lib/mock-data";

export interface DashboardData {
  kpis: typeof mockKpis;
  weekly: typeof mockWeekly;
  subjects: typeof mockSubjects;
  insights: typeof mockInsights;
}

export function useDashboard() {
  const [data, setData] = useState<DashboardData>({
    kpis: mockKpis,
    weekly: mockWeekly,
    subjects: mockSubjects,
    insights: mockInsights,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api
      .get<DashboardData>(endpoints.dashboard)
      .then((res) => !cancelled && setData((d) => ({ ...d, ...res.data })))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
