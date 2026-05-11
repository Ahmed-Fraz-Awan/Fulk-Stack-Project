"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  Calendar,
  Brain,
  FileText,
  Settings,
  MessageSquare,
  HeartPulse,
  Shield,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import { useSession } from "next-auth/react";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/planner", label: "Study Planner", icon: Calendar },
  { href: "/twin", label: "AI Twin", icon: Brain },
  { href: "/chat", label: "AI Assistant", icon: MessageSquare },
  { href: "/mood", label: "Mood & Stress", icon: HeartPulse },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
];

const adminItem = { href: "/admin", label: "Admin", icon: Shield };

export function Sidebar() {
  const path = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin";

  const nav = isAdmin ? [...items, adminItem] : items;

  return (
    <motion.aside
      animate={{ width: sidebarOpen ? 252 : 80 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sticky top-0 h-screen border-r bg-background/60 backdrop-blur-xl flex flex-col z-40"
    >
      <div className="h-16 px-4 flex items-center justify-between border-b">
        <Link href="/dashboard" className="flex items-center gap-2 overflow-hidden">
          <span className="grid place-items-center h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 text-white shadow-lg shadow-indigo-500/30">
            <Brain className="h-5 w-5" />
          </span>
          {sidebarOpen && (
            <div className="leading-tight whitespace-nowrap">
              <p className="font-display font-bold text-sm">Digital Twin</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                for Students
              </p>
            </div>
          )}
        </Link>
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              !sidebarOpen && "rotate-180",
            )}
          />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scroll-hide">
        {nav.map((it) => {
          const active = path === it.href || path?.startsWith(it.href + "/");
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors relative",
                active
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
              )}
            >
              {active && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 via-fuchsia-500/10 to-cyan-400/10 border border-fuchsia-500/20"
                />
              )}
              <it.icon className="h-4 w-4 shrink-0 relative" />
              {sidebarOpen && (
                <span className="relative font-medium">{it.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t">
        <div className="rounded-xl border bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-cyan-400/10 p-3">
          {sidebarOpen ? (
            <>
              <p className="text-xs font-semibold">AI Twin v2.0</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Real‑time predictions are live.
              </p>
              <span className="mt-2 inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </>
          ) : (
            <div className="h-2 w-2 mx-auto rounded-full bg-emerald-400 animate-pulse" />
          )}
        </div>
      </div>
    </motion.aside>
  );
}
