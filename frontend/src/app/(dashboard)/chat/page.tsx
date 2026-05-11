"use client";

import * as React from "react";
import { Bot, User, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { aiApi } from "@/lib/api";

type Msg = { id: string; from: "ai" | "me"; text: string };

const presets = [
  "Why am I burning out?",
  "Best 2‑hour plan for DSA tonight",
  "Explain my focus dip on Saturday",
  "Motivate me for tomorrow's quiz",
];

const FALLBACKS: Record<string, string> = {
  burn: "Your stress spiked by 18% this week and sleep dropped to 5.8h on average. I recommend a 15‑min wind‑down at 10:30 PM and one 'no‑screen' block at lunch.",
  plan: "Try this 2‑hour DSA sprint: 25 min recap → 50 min new problems (graphs) → 10 min break → 35 min review. Save the hardest problem for last when your focus typically peaks.",
  focus:
    "Saturday focus dropped to 55 — well below your 78 average. Looking at your patterns, late nights on Friday correlated 3 of the last 4 weeks. A 11 PM cutoff could lift Saturday focus by ~14%.",
  motivate:
    "You're better prepared than you think. You've cleared 11 of 14 mocks above 80%. Sleep well, water, light review only — momentum will do the rest.",
};

function fallbackReply(q: string) {
  const t = q.toLowerCase();
  if (t.includes("burn")) return FALLBACKS.burn;
  if (t.includes("plan") || t.includes("dsa") || t.includes("schedule")) return FALLBACKS.plan;
  if (t.includes("focus") || t.includes("saturday")) return FALLBACKS.focus;
  if (t.includes("motivate") || t.includes("quiz") || t.includes("exam")) return FALLBACKS.motivate;
  return "Got it. I'm analyzing the last 30 days of your twin's data. Try one of the suggestions on the right for the best demo experience.";
}

export default function ChatPage() {
  const [messages, setMessages] = React.useState<Msg[]>([
    {
      id: "m1",
      from: "ai",
      text: "Hey! I'm your AI Twin assistant. Ask me anything about your study, focus, or wellbeing.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text?: string) {
    const t = (text ?? input).trim();
    if (!t) return;
    setInput("");
    const userMsg: Msg = { id: `u_${Date.now()}`, from: "me", text: t };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);
    try {
      const res = await aiApi.post("/chat/assistant", { message: t });
      const reply: Msg = {
        id: `a_${Date.now()}`,
        from: "ai",
        text: res.data?.reply || fallbackReply(t),
      };
      setMessages((m) => [...m, reply]);
    } catch {
      setMessages((m) => [
        ...m,
        { id: `a_${Date.now()}`, from: "ai", text: fallbackReply(t) },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            AI assistant
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">
            Chat with your <span className="text-gradient">twin</span>
          </h1>
        </div>
        <Badge variant="success" className="gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Online
        </Badge>
      </div>

      <div className="grid lg:grid-cols-4 gap-5">
        <Card className="lg:col-span-3 flex flex-col h-[640px] overflow-hidden">
          <div ref={ref} className="flex-1 overflow-y-auto p-5 space-y-3 scroll-hide">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-2 ${
                    m.from === "me" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`h-8 w-8 grid place-items-center rounded-xl ${
                      m.from === "ai"
                        ? "bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 text-white"
                        : "bg-muted"
                    }`}
                  >
                    {m.from === "ai" ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.from === "me"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/60"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <div className="h-8 w-8 grid place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted/60 rounded-2xl px-4 py-2.5 flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:-0.2s]" />
                    <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:0.2s]" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="border-t p-3 flex items-center gap-2">
            <Input
              placeholder="Ask anything…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <Button variant="gradient" onClick={() => send()} disabled={loading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-fuchsia-400" />
              <p className="text-sm font-semibold">Try asking</p>
            </div>
            <div className="space-y-2">
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="w-full text-left text-sm px-3 py-2 rounded-xl border hover:bg-accent transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
