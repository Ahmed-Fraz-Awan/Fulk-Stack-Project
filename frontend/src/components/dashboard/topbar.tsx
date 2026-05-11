"use client";

import * as React from "react";
import { useSession, signOut } from "next-auth/react";
import { Bell, Search, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { mockNotifications } from "@/lib/mock-data";

export function Topbar() {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState<null | "notifications" | "profile">(
    null,
  );
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(null);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const name = session?.user?.name || "Student";

  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-background/70 backdrop-blur-xl flex items-center px-6 gap-4">
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search insights, subjects, sessions…"
          className="pl-9 bg-muted/50 border-transparent focus-visible:bg-background"
        />
      </div>

      <div className="ml-auto flex items-center gap-2" ref={ref}>
        <ThemeToggle />

        <div className="relative">
          <button
            onClick={() =>
              setOpen(open === "notifications" ? null : "notifications")
            }
            className="relative h-10 w-10 grid place-items-center rounded-xl hover:bg-accent"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-background" />
          </button>
          <AnimatePresence>
            {open === "notifications" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 mt-2 w-80 rounded-2xl border bg-popover shadow-xl p-2 z-50"
              >
                <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
                  Notifications
                </p>
                {mockNotifications.map((n) => (
                  <div
                    key={n.id}
                    className="px-3 py-2.5 rounded-xl hover:bg-accent cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{n.title}</p>
                      <span className="text-[10px] text-muted-foreground">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {n.body}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen(open === "profile" ? null : "profile")}
            className="flex items-center gap-2 pl-1 pr-3 h-10 rounded-xl hover:bg-accent"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium leading-tight">{name}</p>
              <p className="text-[10px] text-muted-foreground capitalize">
                {(session?.user as any)?.role || "student"}
              </p>
            </div>
          </button>
          <AnimatePresence>
            {open === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 mt-2 w-56 rounded-2xl border bg-popover shadow-xl p-2 z-50"
              >
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{name}</p>
                  <p className="text-xs text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </div>
                <div className="h-px bg-border my-1" />
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-accent text-rose-500"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
