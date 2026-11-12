"use client";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Section } from "./Section";
import { mapLinks, profile } from "@/data/portfolio";
import { worldDots } from "@/data/worldDots";

const MW = 720;
const MH = 340;
const project = ([lon, lat]: [number, number]) => [((lon + 180) / 360) * MW, ((80 - lat) / 140) * MH] as const;

function WorldMap() {
  const [hx, hy] = project(mapLinks[0].coords);
  return (
    <svg viewBox={`0 0 ${MW} ${MH}`} className="h-auto w-full" role="img" aria-label="World map with connections from Mumbai to Frankfurt, Singapore, Northern Virginia, Dubai and Tokyo">
      {worldDots.map(([lon, lat], i) => {
        const [x, y] = project([lon, lat]);
        return <circle key={i} cx={x} cy={y} r={1.6} fill="rgba(154,166,199,0.35)" />;
      })}
      {mapLinks.slice(1).map((l, i) => {
        const [x, y] = project(l.coords);
        const mx = (hx + x) / 2;
        const my = Math.min(hy, y) - Math.abs(x - hx) * 0.22 - 20;
        const d = `M${hx},${hy} Q${mx},${my} ${x},${y}`;
        return (
          <g key={l.name}>
            <path d={d} fill="none" stroke="#7D5FFF" strokeOpacity={0.35} />
            <motion.path
              d={d}
              fill="none"
              stroke="#00D9FF"
              strokeWidth={1.6}
              strokeLinecap="round"
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{ pathLength: [0, 0.25, 0], pathOffset: [0, 0.75, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            />
            <circle cx={x} cy={y} r={3} fill="#00D9FF" />
            <text x={x} y={y - 8} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.7)">
              {l.name}
            </text>
          </g>
        );
      })}
      <motion.circle cx={hx} cy={hy} r={4} fill="none" stroke="#00FFAA" animate={{ r: [4, 18], opacity: [0.9, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />
      <circle cx={hx} cy={hy} r={4.5} fill="#00FFAA" />
      <text x={hx + 8} y={hy + 16} fontSize="11" fontWeight={600} fill="#00FFAA">
        Mumbai
      </text>
    </svg>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setError("Add your name and a message so I know how to help.");
      return;
    }
    setError("");
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name}${form.email ? ` (${form.email})` : ""}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const socials = [
    { label: "Email", href: `mailto:${profile.email}`, value: profile.email },
    { label: "LinkedIn", href: profile.linkedin, value: "harsh-singh08" },
    { label: "GitHub", href: profile.github, value: "harsh0804" },
  ];

  const field = "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-mist/60 outline-none transition focus:border-cyan/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(0,217,255,0.12)]";

  return (
    <Section id="contact" title="Let’s talk infrastructure" intro={`Hiring for cloud, DevOps, SRE or data center operations? I’m based in ${profile.location} and open to remote work.`}>
      <div className="glass mb-8 overflow-hidden rounded-3xl p-4 sm:p-6">
        <WorldMap />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <form onSubmit={submit} className="glass-strong grid gap-4 rounded-3xl p-6" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm text-mist">
              Your name
              <input className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
            </label>
            <label className="grid gap-1.5 text-sm text-mist">
              Your email
              <input type="email" className={field} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
            </label>
          </div>
          <label className="grid gap-1.5 text-sm text-mist">
            Message
            <textarea rows={5} className={field} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </label>
          {error && (
            <p role="alert" className="text-sm text-amber">
              {error}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="rounded-xl bg-gradient-to-r from-cyan to-violet px-5 py-3 font-semibold text-void shadow-[0_0_30px_rgba(0,217,255,0.3)] transition-transform hover:-translate-y-0.5">
              Send message
            </button>
            <p className="text-xs text-mist">Opens your email app with the message filled in.</p>
          </div>
        </form>
        <ul className="grid gap-3">
          {socials.map((s, i) => (
            <motion.li key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="glass group flex items-center justify-between rounded-2xl px-5 py-4 transition-all hover:border-cyan/50 hover:shadow-[0_0_30px_rgba(0,217,255,0.15)]"
              >
                <span>
                  <span className="block text-sm text-mist">{s.label}</span>
                  <span className="font-medium">{s.value}</span>
                </span>
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-cyan/40 transition-all group-hover:bg-mint group-hover:shadow-[0_0_10px_#00FFAA]" />
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
