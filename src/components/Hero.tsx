"use client";
import dynamic from "next/dynamic";
import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Rack from "./Rack";
import { metrics, profile } from "@/data/portfolio";

const NetworkScene = dynamic(() => import("./NetworkScene"), { ssr: false });

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const c = animate(0, value, { duration: 1.4, delay: 1.6, ease: "easeOut", onUpdate: (v) => (node.textContent = Math.round(v).toString()) });
    return () => c.stop();
  }, [inView, value]);
  return <span ref={ref}>0</span>;
}

function Throughput() {
  const [pts, setPts] = useState<number[]>(() => Array.from({ length: 28 }, (_, i) => 50 + Math.sin(i / 2) * 18));
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setPts((p) => [...p.slice(1), Math.max(12, Math.min(90, p[p.length - 1] + (Math.random() - 0.5) * 26))]), 700);
    return () => clearInterval(id);
  }, []);
  const d = pts.map((v, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * 200},${100 - v}`).join(" ");
  return (
    <div className="glass col-span-2 rounded-2xl p-4 sm:col-span-1 lg:col-span-1">
      <div className="flex items-baseline justify-between">
        <p className="text-xs text-mist">Network pulse</p>
        <p className="font-mono text-xs text-cyan">{Math.round(pts[pts.length - 1] * 9.4)} Mb/s</p>
      </div>
      <svg viewBox="0 0 200 100" className="mt-2 h-14 w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="tp" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#00D9FF" stopOpacity="0.35" />
            <stop offset="1" stopColor="#00D9FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${d} L200,100 L0,100 Z`} fill="url(#tp)" />
        <path d={d} fill="none" stroke="#00D9FF" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <p className="mt-1 text-[11px] text-mist/70">Simulated for display</p>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 1.7 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } }),
  };

  return (
    <section id="top" ref={ref} className="relative isolate min-h-screen overflow-hidden pt-28">
      <motion.div style={{ y: bgY, opacity: fade }} className="absolute inset-0 -z-10">
        <NetworkScene />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_20%,rgba(125,95,255,0.18),transparent_55%),radial-gradient(ellipse_at_80%_70%,rgba(0,217,255,0.12),transparent_50%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-void" />

      <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 pb-16 lg:grid-cols-[1.1fr_1fr] lg:pt-10">
        <div>
          <motion.p custom={0} variants={item} initial="hidden" animate="show" className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/[0.06] px-3 py-1 text-sm text-mint">
            <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_8px_#00FFAA]" /> {profile.status}
          </motion.p>
          <motion.h1 custom={1} variants={item} initial="hidden" animate="show" className="text-gradient mt-6 text-6xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            {profile.name}
          </motion.h1>
          <motion.p custom={2} variants={item} initial="hidden" animate="show" className="mt-5 text-xl font-medium text-cyan sm:text-2xl">
            {profile.role}
          </motion.p>
          <motion.p custom={3} variants={item} initial="hidden" animate="show" className="mt-5 max-w-xl text-lg leading-relaxed text-mist">
            {profile.intro}
          </motion.p>
          <motion.div custom={4} variants={item} initial="hidden" animate="show" className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="rounded-xl bg-gradient-to-r from-cyan to-violet px-5 py-3 font-semibold text-void shadow-[0_0_30px_rgba(0,217,255,0.35)] transition-transform hover:-translate-y-0.5">
              View projects
            </a>
            <a href="#contact" className="glass rounded-xl px-5 py-3 font-semibold transition-colors hover:border-cyan/50">
              Get in touch
            </a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, x: 30, rotateY: -8 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} transition={{ delay: 1.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} style={{ perspective: 1000 }}>
          <Rack />
        </motion.div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-5 pb-24 lg:grid-cols-5">
        {metrics.map((m, i) => (
          <motion.div key={m.label} custom={5 + i} variants={item} initial="hidden" animate="show" className="glass rounded-2xl p-4">
            <p className="font-mono text-3xl font-semibold text-white">
              <Counter value={m.value} />
              {m.suffix}
            </p>
            <p className="mt-1 text-xs leading-snug text-mist">{m.label}</p>
          </motion.div>
        ))}
        <motion.div custom={9} variants={item} initial="hidden" animate="show" className="contents">
          <Throughput />
        </motion.div>
      </div>
    </section>
  );
}
