import { CTA } from "@/components/landing/cta";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20">
        <div className="container max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-cyan-400 tracking-widest uppercase">
            About
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-3">
            We're building the <span className="text-gradient">AI OS</span> for
            education.
          </h1>
          <div className="prose dark:prose-invert mt-8 max-w-none text-muted-foreground leading-relaxed space-y-5">
            <p>
              Student Digital Twin AI started as a final‑year project with a
              simple idea: every student deserves a personal AI that learns how
              they learn. By blending behavior science with modern ML, we
              turned that idea into a platform.
            </p>
            <p>
              The twin observes attendance patterns, study durations, typing
              consistency, and mood signals — synthesizing them into honest,
              actionable insights. No fluff. No vanity metrics. Just decisions
              that move the needle.
            </p>
            <p>
              We believe AI should amplify human judgment — not replace it. So
              every prediction comes with an explanation, and every
              recommendation is yours to accept, edit, or ignore.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {[
              { label: "Architecture", value: "Microservices" },
              { label: "Predictions", value: "Real‑time" },
              { label: "Privacy", value: "End‑to‑end" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border bg-card p-5 text-center"
              >
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="font-display text-2xl font-bold mt-1">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
