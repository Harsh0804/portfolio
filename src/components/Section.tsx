"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({ id, title, intro, children, className = "" }: { id: string; title: string; intro?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-5 py-24 md:py-32 ${className}`} aria-labelledby={`${id}-title`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 max-w-2xl"
      >
        <h2 id={`${id}-title`} className="text-4xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h2>
        {intro && <p className="mt-4 text-lg leading-relaxed text-mist">{intro}</p>}
      </motion.div>
      {children}
    </section>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
