"use client";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <nav className="glass-strong mx-auto flex max-w-6xl items-center gap-4 rounded-2xl px-4 py-2.5" aria-label="Main">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-cyan to-violet text-[13px] font-bold text-void">HS</span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>
        <ul className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`relative rounded-lg px-3 py-1.5 text-sm transition-colors ${active === l.id ? "text-white" : "text-mist hover:text-white"}`}
              >
                {active === l.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-lg bg-white/[0.07] ring-1 ring-cyan/30" />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="ml-auto hidden items-center gap-2 rounded-full border border-mint/25 bg-mint/[0.06] px-3 py-1 text-xs text-mint md:flex lg:ml-2">
          <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_8px_#00FFAA]" />
          Operational
        </span>
        <button
          className="ml-auto rounded-lg border border-white/10 px-3 py-1.5 text-sm lg:hidden md:ml-0"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass-strong mx-auto mt-2 grid max-w-6xl gap-1 rounded-2xl p-2 lg:hidden"
          >
            {links.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-mist hover:bg-white/5 hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-cyan via-violet to-mint" />
    </header>
  );
}
