"use client";
import { motion } from "framer-motion";
import { Section, Reveal } from "./Section";
import { profile } from "@/data/portfolio";

const rows: [string, string][] = [
  ["user", profile.name],
  ["role", "Cloud & Server Engineer"],
  ["location", profile.location],
  ["focus", profile.focus.join(", ")],
  ["status", "available"],
];

export default function About() {
  return (
    <Section id="about" title="About" intro="Hardware in the rack, software in the cloud, and the automation in between.">
      <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-white/85">
          {profile.about.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <div className="glass-strong overflow-hidden rounded-2xl">
            <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-mist">harsh@infra:~</span>
            </div>
            <div className="p-5 font-mono text-sm">
              <p className="text-mist">
                <span className="text-mint">$</span> whoami --verbose
              </p>
              <dl className="mt-3 grid grid-cols-[6.5rem_1fr] gap-y-2">
                {rows.map(([k, v], i) => (
                  <motion.div
                    key={k}
                    className="contents"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.12 }}
                  >
                    <dt className="text-cyan">{k}</dt>
                    <dd className={k === "status" ? "text-mint" : "text-white/90"}>{v}</dd>
                  </motion.div>
                ))}
              </dl>
              <p className="mt-4 text-mist">
                <span className="text-mint">$</span> <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-cyan/80" />
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
