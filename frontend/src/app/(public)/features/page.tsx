import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CTA } from "@/components/landing/cta";

export const metadata = { title: "Features" };

export default function FeaturesPage() {
  return (
    <>
      <section className="pt-32 pb-10">
        <div className="container text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-fuchsia-400 tracking-widest uppercase">
            Features
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-3">
            Built for <span className="text-gradient">peak performance</span>
          </h1>
          <p className="mt-5 text-muted-foreground">
            Every feature is designed to make studying feel effortless and
            data‑driven.
          </p>
        </div>
      </section>
      <Features />
      <HowItWorks />
      <CTA />
    </>
  );
}
