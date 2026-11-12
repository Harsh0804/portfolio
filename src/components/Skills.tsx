"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Section } from "./Section";
import { skillGroups } from "@/data/portfolio";

const W = 640;
const H = 600;
const CX = W / 2;
const CY = H / 2;
const colors = ["#00D9FF", "#7D5FFF", "#00FFAA", "#00D9FF", "#7D5FFF", "#00FFAA"];

function Galaxy({ active, setActive }: { active: string; setActive: (id: string) => void }) {
  const layout = useMemo(
    () =>
      skillGroups.map((g, i) => {
        const a = (i / skillGroups.length) * Math.PI * 2 - Math.PI / 2;
        const gx = CX + Math.cos(a) * 170;
        const gy = CY + Math.sin(a) * 160;
        const items = g.items.map((name, j) => {
          const spread = (j - (g.items.length - 1) / 2) * 0.32;
          const ia = a + spread;
          return { name, x: gx + Math.cos(ia) * 78, y: gy + Math.sin(ia) * 70 };
        });
        return { ...g, x: gx, y: gy, color: colors[i], items };
      }),
    []
  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="group" aria-label="Skill galaxy. Choose a skill group to highlight it.">
      <defs>
        <radialGradient id="core">
          <stop offset="0" stopColor="#00D9FF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#7D5FFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[90, 170, 240].map((r) => (
        <ellipse key={r} cx={CX} cy={CY} rx={r * 1.05} ry={r * 0.95} fill="none" stroke="rgba(255,255,255,0.05)" />
      ))}
      {layout.map((g) => {
        const on = g.id === active;
        return (
          <g key={g.id} opacity={on ? 1 : 0.35} style={{ transition: "opacity .3s" }}>
            <line x1={CX} y1={CY} x2={g.x} y2={g.y} stroke={g.color} strokeOpacity={0.5} className={on ? "dash-flow" : ""} />
            {g.items.map((it) => (
              <line key={it.name} x1={g.x} y1={g.y} x2={it.x} y2={it.y} stroke={g.color} strokeOpacity={on ? 0.5 : 0.2} />
            ))}
          </g>
        );
      })}
      <circle cx={CX} cy={CY} r={46} fill="url(#core)" opacity={0.6} />
      <circle cx={CX} cy={CY} r={22} fill="#0A1028" stroke="#00D9FF" />
      <text x={CX} y={CY + 4} textAnchor="middle" fontSize="12" fill="#fff" fontWeight={600}>
        HS
      </text>
      {layout.map((g, i) => {
        const on = g.id === active;
        return (
          <motion.g
            key={g.id}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          >
            {g.items.map((it) => (
              <g key={it.name} opacity={on ? 1 : 0.3} style={{ transition: "opacity .3s" }}>
                <circle cx={it.x} cy={it.y} r={on ? 4 : 3} fill={g.color} />
                <title>{it.name}</title>
              </g>
            ))}
            <g
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={g.name}
              onMouseEnter={() => setActive(g.id)}
              onFocus={() => setActive(g.id)}
              onClick={() => setActive(g.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(g.id)}
              style={{ cursor: "pointer", outline: "none" }}
            >
              <circle cx={g.x} cy={g.y} r={on ? 30 : 24} fill="#0A1028" stroke={g.color} strokeWidth={on ? 2 : 1} style={{ transition: "r .25s" }} />
              {on && <circle cx={g.x} cy={g.y} r={38} fill="none" stroke={g.color} strokeOpacity={0.3} />}
              <text x={g.x} y={g.y + (g.y < CY - 10 ? 50 : -42)} textAnchor="middle" fontSize="13" fontWeight={600} fill="#fff">
                {g.name}
              </text>
              <text x={g.x} y={g.y + 4} textAnchor="middle" fontSize="11" fill={g.color} fontFamily="var(--font-geist-mono)">
                {g.items.length}
              </text>
            </g>
          </motion.g>
        );
      })}
    </svg>
  );
}

function Radar({ active }: { active: string }) {
  const R = 110;
  const c = 140;
  const n = skillGroups.length;
  const pt = (i: number, r: number) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [c + Math.cos(a) * r, c + Math.sin(a) * r];
  };
  const shape = skillGroups.map((g, i) => pt(i, (g.level / 100) * R).join(",")).join(" ");
  return (
    <svg viewBox="0 0 280 280" className="mx-auto h-auto w-full max-w-[300px]" aria-hidden="true">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon key={f} points={skillGroups.map((_, i) => pt(i, R * f).join(",")).join(" ")} fill="none" stroke="rgba(255,255,255,0.08)" />
      ))}
      {skillGroups.map((g, i) => {
        const [x, y] = pt(i, R);
        return <line key={g.id} x1={c} y1={c} x2={x} y2={y} stroke={g.id === active ? "#00D9FF" : "rgba(255,255,255,0.08)"} />;
      })}
      <motion.polygon
        points={shape}
        fill="rgba(0,217,255,0.15)"
        stroke="#00D9FF"
        strokeWidth={1.5}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: `${c}px ${c}px` }}
      />
      {skillGroups.map((g, i) => {
        const [x, y] = pt(i, (g.level / 100) * R);
        return <circle key={g.id} cx={x} cy={y} r={g.id === active ? 5 : 3} fill={g.id === active ? "#00FFAA" : "#00D9FF"} />;
      })}
    </svg>
  );
}

export default function Skills() {
  const [active, setActive] = useState(skillGroups[0].id);
  const group = skillGroups.find((g) => g.id === active)!;
  return (
    <Section id="skills" title="Skills" intro="Six areas I work in every week. Hover or tab through the groups to see what each one covers.">
      <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="glass rounded-3xl p-2 sm:p-4">
          <Galaxy active={active} setActive={setActive} />
        </div>
        <div className="glass-strong rounded-3xl p-6">
          <Radar active={active} />
          <AnimatePresence mode="wait">
            <motion.div key={group.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="mt-4">
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-semibold">{group.name}</h3>
                <span className="font-mono text-sm text-cyan">{group.level}%</span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-cyan to-mint" initial={{ width: 0 }} animate={{ width: `${group.level}%` }} transition={{ duration: 0.6 }} />
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <li key={s} className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-sm">
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
          <div className="mt-5 flex flex-wrap gap-1.5" role="group" aria-label="Skill groups">
            {skillGroups.map((g) => (
              <button
                key={g.id}
                onClick={() => setActive(g.id)}
                aria-pressed={g.id === active}
                className={`rounded-md px-2 py-1 text-xs transition-colors ${g.id === active ? "bg-cyan/15 text-cyan ring-1 ring-cyan/40" : "text-mist hover:text-white"}`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
