"use client";
import { motion } from "framer-motion";
import { Section } from "./Section";
import { achievements } from "@/data/portfolio";

const tone = {
  critical: { dot: "bg-mint shadow-[0_0_10px_#00FFAA]", text: "text-mint", label: "Top result" },
  high: { dot: "bg-cyan shadow-[0_0_10px_#00D9FF]", text: "text-cyan", label: "Top result" },
  info: { dot: "bg-violet shadow-[0_0_10px_#7D5FFF]", text: "text-violet", label: "Recognition" },
} as const;

export default function Achievements() {
  return (
    <Section id="achievements" title="Achievements" intro="Logged like events on a monitoring board.">
      <div className="glass-strong overflow-hidden rounded-3xl">
        <div className="grid grid-cols-[1fr_auto] border-b border-white/5 px-5 py-3 text-xs text-mist sm:grid-cols-[9rem_1fr_auto]">
          <span className="hidden sm:block">Source</span>
          <span>Event</span>
          <span>Type</span>
        </div>
        <ul>
          {achievements.map((a, i) => {
            const t = tone[a.level];
            return (
              <motion.li
                key={a.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="group grid grid-cols-[1fr_auto] items-start gap-4 border-b border-white/5 px-5 py-4 transition-colors last:border-0 hover:bg-white/[0.03] sm:grid-cols-[9rem_1fr_auto]"
              >
                <span className="hidden font-mono text-xs text-mist sm:block sm:pt-1">{a.tag}</span>
                <div className="flex gap-3">
                  <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${t.dot}`} />
                  <div>
                    <p className="font-medium">{a.title}</p>
                    <p className="text-sm text-mist">{a.detail}</p>
                  </div>
                </div>
                <span className={`pt-0.5 text-xs ${t.text}`}>{t.label}</span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
