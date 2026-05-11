"use client";

import { useEffect, useRef, useState } from "react";

export interface TypingStats {
  wpm: number;
  accuracy: number;
  pauses: number;
  sessionMinutes: number;
}

/**
 * Lightweight typing-pattern hook. Attach to any element and it computes
 * WPM, pause count and accuracy in real time. Intended for the typing analyzer.
 */
export function useTypingTracker() {
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 100,
    pauses: 0,
    sessionMinutes: 0,
  });
  const start = useRef<number | null>(null);
  const lastKey = useRef<number | null>(null);
  const correct = useRef(0);
  const total = useRef(0);
  const pauses = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const now = Date.now();
      if (!start.current) start.current = now;
      if (lastKey.current && now - lastKey.current > 1500) pauses.current += 1;
      lastKey.current = now;
      total.current += 1;
      if (e.key.length === 1) correct.current += 1;

      const minutes = (now - start.current) / 60000;
      const words = total.current / 5;
      const wpm = minutes > 0 ? words / minutes : 0;
      const accuracy = total.current
        ? (correct.current / total.current) * 100
        : 100;
      setStats({
        wpm: Math.round(wpm),
        accuracy: Math.round(accuracy),
        pauses: pauses.current,
        sessionMinutes: Math.round(minutes * 10) / 10,
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return stats;
}
