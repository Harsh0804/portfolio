"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { rackUnits } from "@/data/portfolio";

export default function Rack() {
  const [selected, setSelected] = useState(rackUnits[0].id);
  const current = rackUnits.find((u) => u.id === selected)!;
  const totalU = rackUnits.reduce((n, u) => n + u.size, 0);
  let u = totalU;

  return (
    <div className="grid gap-3">
      <div className="glass-strong relative overflow-hidden rounded-2xl p-3 shadow-[0_30px_80px_-20px_rgba(0,217,255,0.25)]">
        <div className="mb-2 flex items-center justify-between px-1 font-mono text-[11px] text-mist">
          <span>Rack A1, Mumbai DC</span>
          <span className="flex items-center gap-1.5 text-mint">
            <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_6px_#00FFAA]" /> {rackUnits.length} units online
          </span>
        </div>
        <div className="relative rounded-xl border border-white/[0.06] bg-[#070b1d]/80 p-2">
          <div aria-hidden="true" className="rack-scan pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-cyan/[0.07] to-transparent" />
          <ul className="grid gap-[3px]" aria-label="Infrastructure I work on. Select a unit for details.">
            {rackUnits.map((unit) => {
              const top = u;
              u -= unit.size;
              const active = unit.id === selected;
              return (
                <li key={unit.id} className="grid grid-cols-[2.1rem_1fr] items-center gap-1.5">
                  <span aria-hidden="true" className="text-right font-mono text-[10px] text-mist/70">
                    {unit.size === 2 ? `${top}-${top - 1}` : top}
                  </span>
                  <button
                    onClick={() => setSelected(unit.id)}
                    aria-pressed={active}
                    className={`group relative grid w-full grid-cols-[auto_1fr_auto_auto] items-center gap-3 overflow-hidden rounded-md border px-2.5 text-left transition-colors ${
                      unit.size === 2 ? "h-[3.9rem]" : "h-[1.9rem]"
                    } ${active ? "border-cyan/60 bg-cyan/[0.12] shadow-[inset_0_0_20px_rgba(0,217,255,0.15)]" : "border-white/[0.07] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"}`}
                  >
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-mist/50" />
                    <span className={`truncate text-[13px] font-medium ${active ? "text-white" : "text-white/80"}`}>{unit.label}</span>
                    {unit.size === 2 && (
                      <span aria-hidden="true" className="hidden h-7 w-24 rounded-sm bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.08)_0_2px,transparent_2px_6px)] sm:block" />
                    )}
                    <span aria-hidden="true" className="flex gap-1">
                      <span className={`h-1.5 w-1.5 rounded-full ${unit.status === "busy" ? "led-busy bg-amber shadow-[0_0_6px_#FFB547]" : "bg-mint shadow-[0_0_6px_#00FFAA]"}`} />
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan/40" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="glass relative min-h-[8.5rem] overflow-hidden rounded-2xl p-4" aria-live="polite">
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-cyan to-violet" />
        <AnimatePresence mode="wait">
          <motion.div key={current.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold">{current.label}</h3>
              <span className={`font-mono text-[11px] ${current.status === "busy" ? "text-amber" : "text-mint"}`}>
                {current.status === "busy" ? "Job running" : "Healthy"}
              </span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-mist">{current.detail}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {current.tags.map((t) => (
                <span key={t} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-white/80">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
