"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Section } from "./Section";
import { certifications } from "@/data/portfolio";

function Card({ c, i }: { c: (typeof certifications)[number]; i: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: i * 0.1 }}
      className="h-64 [perspective:1100px]"
    >
      <button
        onClick={() => setFlipped((f) => !f)}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        aria-label={`${c.name}, ${c.issuer}. ${flipped ? "Showing details" : "Show details"}`}
        className="relative h-full w-full text-left transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div className="holo-border animate-holo absolute inset-0 flex flex-col justify-between rounded-3xl p-5 shadow-[0_0_30px_rgba(125,95,255,0.15)] [backface-visibility:hidden]">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-cyan/25 via-violet/25 to-mint/20 font-mono text-lg font-semibold ring-1 ring-white/15"
          >
            {c.code}
          </motion.div>
          <div>
            <p className="text-lg font-semibold leading-snug">{c.name}</p>
            <p className="mt-1 text-sm text-mist">{c.issuer}</p>
          </div>
        </div>
        <div className="glass-strong absolute inset-0 rounded-3xl p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-sm text-mist">Covers</p>
          <ul className="mt-3 space-y-2">
            {c.covers.map((x) => (
              <li key={x} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_6px_#00FFAA]" />
                {x}
              </li>
            ))}
          </ul>
          <p className="absolute bottom-5 left-5 text-sm text-cyan">{c.issuer}</p>
        </div>
      </button>
    </motion.div>
  );
}

export default function Certifications() {
  return (
    <Section id="certifications" title="Certifications" intro="Hover or tap a card to see what it covers.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((c, i) => (
          <Card key={c.name} c={c} i={i} />
        ))}
      </div>
    </Section>
  );
}
