"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-cyan-500 p-10 md:p-16 text-center text-white"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,white,transparent_40%)] opacity-20 pointer-events-none" />
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              Free for students
            </div>
            <h2 className="mt-5 font-display text-4xl md:text-5xl font-bold leading-tight">
              Meet the smartest version of yourself.
            </h2>
            <p className="mt-4 text-white/85">
              Spin up your AI Twin in under 60 seconds — no credit card required.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-white text-indigo-700 hover:bg-white/90 group"
                >
                  Create my twin
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/features">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/0 text-white hover:bg-white/10"
                >
                  Explore features
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
