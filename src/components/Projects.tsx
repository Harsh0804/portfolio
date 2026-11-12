"use client";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, type MouseEvent } from "react";
import { Section } from "./Section";
import { projects, type Project } from "@/data/portfolio";

function Preview({ kind }: { kind: Project["preview"] }) {
  if (kind === "cluster")
    return (
      <svg viewBox="0 0 240 110" className="h-full w-full" aria-hidden="true">
        {[[50, 55], [120, 25], [190, 55]].map(([x, y], i, arr) => (
          <g key={i}>
            <line x1={x} y1={y} x2={arr[(i + 1) % 3][0]} y2={arr[(i + 1) % 3][1]} stroke="#00D9FF" strokeOpacity={0.6} className="dash-flow" />
          </g>
        ))}
        {[[50, 55], [120, 25], [190, 55]].map(([x, y], i) => (
          <g key={`n${i}`}>
            <rect x={x - 18} y={y - 10} width={36} height={20} rx={4} fill="#0A1028" stroke="#00D9FF" />
            <motion.circle cx={x + 11} cy={y} r={2.5} fill="#00FFAA" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }} />
          </g>
        ))}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={70 + i * 26} y={82} width={20} height={14} rx={3} fill="rgba(125,95,255,0.25)" stroke="#7D5FFF" strokeOpacity={0.6} />
        ))}
        <text x={120} y={106} textAnchor="middle" fontSize="8" fill="#9AA6C7">VMs</text>
      </svg>
    );
  if (kind === "pipeline")
    return (
      <svg viewBox="0 0 240 110" className="h-full w-full" aria-hidden="true">
        {["Push", "Build", "Test", "Deploy"].map((s, i) => (
          <g key={s}>
            {i < 3 && <line x1={42 + i * 56} y1={55} x2={68 + i * 56} y2={55} stroke="#7D5FFF" strokeOpacity={0.6} className="dash-flow" />}
            <motion.rect
              x={14 + i * 56}
              y={40}
              width={28 + 0}
              height={30}
              rx={6}
              fill="#0A1028"
              stroke="#7D5FFF"
              animate={{ stroke: ["#7D5FFF", "#00FFAA", "#7D5FFF"] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6 }}
            />
            <text x={28 + i * 56} y={88} textAnchor="middle" fontSize="9" fill="#9AA6C7">{s}</text>
          </g>
        ))}
      </svg>
    );
  return (
    <svg viewBox="0 0 240 110" className="h-full w-full" aria-hidden="true">
      <motion.path
        d="M0,70 C30,40 50,90 80,60 S130,30 160,55 S210,80 240,45"
        fill="none"
        stroke="#00FFAA"
        strokeWidth={1.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <path d="M0,80 C40,70 70,95 110,75 S180,60 240,72" fill="none" stroke="#00D9FF" strokeOpacity={0.4} />
      <line x1={0} y1={38} x2={240} y2={38} stroke="#FFB547" strokeOpacity={0.5} strokeDasharray="3 4" />
      <text x={236} y={33} textAnchor="end" fontSize="8" fill="#FFB547">alert threshold</text>
    </svg>
  );
}

function TiltCard({ p, featured }: { p: Project; featured: boolean }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`group glass relative overflow-hidden rounded-3xl ${featured ? "md:col-span-2" : ""}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: useTransform([glowX, glowY], ([x, y]) => `radial-gradient(400px circle at ${x} ${y}, rgba(0,217,255,0.12), transparent 60%)`) }}
      />
      <div className={`grid gap-6 p-6 ${featured ? "md:grid-cols-[1.3fr_1fr] md:items-center" : ""}`}>
        <div style={{ transform: "translateZ(30px)" }}>
          <span className="rounded-md bg-violet/15 px-2 py-0.5 text-xs text-violet ring-1 ring-violet/30">{p.category}</span>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">{p.name}</h3>
          <p className="mt-2 text-mist">{p.summary}</p>
          <ul className="mt-4 space-y-1.5 text-sm text-white/80">
            {p.points.map((pt) => (
              <li key={pt} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                {pt}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span key={s} className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[11px] text-white/70">
                {s}
              </span>
            ))}
          </div>
          {p.link && (
            <a href={p.link} target="_blank" rel="noreferrer" className="mt-5 inline-block font-medium text-cyan underline-offset-4 hover:underline">
              View on GitHub
            </a>
          )}
        </div>
        <div className="h-36 rounded-2xl border border-white/[0.06] bg-[#070b1d]/70 p-3 md:h-44">
          <Preview kind={p.preview} />
        </div>
      </div>
    </motion.article>
  );
}

const filters = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const list = projects.filter((p) => filter === "All" || p.category === filter);
  return (
    <Section id="projects" title="Projects" intro="Systems I designed and built, from a production private cloud to a published IoT research project.">
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${filter === f ? "text-void" : "glass text-mist hover:text-white"}`}
          >
            {filter === f && <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-cyan to-mint" />}
            {f}
          </button>
        ))}
      </div>
      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <TiltCard key={p.name} p={p} featured={filter === "All" ? i === 0 : list.length === 1} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
