import Link from "next/link";
import { Brain } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative grid lg:grid-cols-2">
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-cyan-500 text-white p-12 flex-col justify-between">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-fuchsia-300/30 blur-3xl" />

        <Link href="/" className="relative flex items-center gap-2">
          <span className="grid place-items-center h-10 w-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20">
            <Brain className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="font-display font-bold">Digital Twin</p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/70">
              for Students
            </p>
          </div>
        </Link>

        <div className="relative space-y-6">
          <h2 className="font-display text-4xl font-bold leading-tight">
            One twin. Endless insights.
          </h2>
          <p className="text-white/85 max-w-md">
            "The AI predicted my burnout 4 days before finals. I shifted my
            schedule, slept better, and scored my best GPA ever."
          </p>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 grid place-items-center font-semibold">
              A
            </div>
            <div className="text-sm">
              <p className="font-medium">Aarav S.</p>
              <p className="text-white/70">CS Senior · GPA 3.9</p>
            </div>
          </div>
        </div>

        <p className="relative text-xs text-white/70">
          © {new Date().getFullYear()} Student Digital Twin AI
        </p>
      </div>

      <div className="flex items-center justify-center p-6">{children}</div>
    </div>
  );
}
