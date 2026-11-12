"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Section } from "./Section";
import { timeline } from "@/data/portfolio";

export default function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <Section id="experience" title="Experience" intro="From diploma to running a production data center, in order.">
      <ol ref={ref} className="relative ml-3 md:ml-0">
        <span aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-white/10 md:left-1/2" />
        <motion.span aria-hidden="true" style={{ scaleY }} className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-violet via-cyan to-mint shadow-[0_0_12px_#00D9FF] md:left-1/2" />
        {timeline.map((t, i) => {
          const right = i % 2 === 1;
          const work = t.kind === "work";
          return (
            <li key={t.title} className={`relative mb-12 pl-8 md:w-1/2 md:pl-0 ${right ? "md:ml-auto md:pl-12" : "md:pr-12"}`}>
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`absolute top-6 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-void ${work ? "bg-mint shadow-[0_0_14px_#00FFAA]" : "bg-cyan shadow-[0_0_10px_#00D9FF]"} left-0 ${right ? "md:left-0" : "md:left-full"}`}
              />
              <motion.article
                initial={{ opacity: 0, x: right ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-2xl p-5 ${work ? "glass-strong ring-1 ring-mint/25" : "glass"}`}
              >
                <p className={`font-mono text-xs ${work ? "text-mint" : "text-cyan"}`}>{t.period}</p>
                <h3 className="mt-1.5 text-xl font-semibold">{t.title}</h3>
                <p className="text-sm text-mist">{t.org}</p>
                <p className="mt-3 text-white/85">{t.note}</p>
                {t.points.length > 0 && (
                  <ul className="mt-3 space-y-2 text-sm text-white/80">
                    {t.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mint" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
