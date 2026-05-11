import Link from "next/link";
import { Brain, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background/60 backdrop-blur-xl">
      <div className="container py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 text-white">
              <Brain className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="font-display font-bold text-sm">Digital Twin</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                for Students
              </p>
            </div>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            An AI operating system for students. Predict performance, prevent
            burnout, and unlock your peak focus.
          </p>
          <div className="mt-5 flex gap-2">
            <a className="p-2 rounded-lg hover:bg-accent" href="#" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
            <a className="p-2 rounded-lg hover:bg-accent" href="#" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </a>
            <a className="p-2 rounded-lg hover:bg-accent" href="#" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3">Product</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/features" className="hover:text-foreground">Features</Link></li>
            <li><Link href="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
            <li><Link href="/twin" className="hover:text-foreground">AI Twin</Link></li>
            <li><Link href="/planner" className="hover:text-foreground">Planner</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3">Company</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-foreground">About</Link></li>
            <li><Link href="/login" className="hover:text-foreground">Login</Link></li>
            <li><Link href="/signup" className="hover:text-foreground">Signup</Link></li>
            <li><a href="mailto:hello@twin.ai" className="hover:text-foreground">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container py-5 text-xs text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Student Digital Twin AI. All rights reserved.</p>
          <p>Built with Next.js, FastAPI & MongoDB.</p>
        </div>
      </div>
    </footer>
  );
}
