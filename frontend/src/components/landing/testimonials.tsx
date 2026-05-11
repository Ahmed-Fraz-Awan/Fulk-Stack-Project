"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "CS Senior",
    text: "It predicted my burnout 4 days before my finals. The schedule it built helped me ace databases.",
    avatar: "https://api.dicebear.com/9.x/lorelei/svg?seed=Aarav",
  },
  {
    name: "Fatima Khan",
    role: "AI Researcher",
    text: "Feels like a real digital twin. My focus score went from 58 to 84 in three weeks.",
    avatar: "https://api.dicebear.com/9.x/lorelei/svg?seed=Fatima",
  },
  {
    name: "Diya Patel",
    role: "Med Student",
    text: "The mood analyzer caught my stress dip and rebalanced my plan automatically. Game changer.",
    avatar: "https://api.dicebear.com/9.x/lorelei/svg?seed=Diya",
  },
  {
    name: "Hamza Ali",
    role: "Engineering",
    text: "The analytics dashboard is gorgeous. My advisor uses it now to monitor at-risk students.",
    avatar: "https://api.dicebear.com/9.x/lorelei/svg?seed=Hamza",
  },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-sm font-semibold text-indigo-400 tracking-widest uppercase">
            Loved by students
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Real students, <span className="text-gradient">real wins</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border bg-card p-7 relative overflow-hidden"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-fuchsia-500/15" />
              <p className="text-foreground/90 leading-relaxed">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full bg-muted"
                />
                <div>
                  <p className="font-medium text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
