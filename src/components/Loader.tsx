"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const steps = ["Powering on rack A1", "Mounting storage", "Bringing up network", "Starting services", "All systems operational"];

export default function Loader() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    const timers = steps.map((_, i) => setTimeout(() => setStep(i), i * 280));
    const end = setTimeout(() => setDone(true), steps.length * 280 + 350);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(end);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-void"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          <div className="w-[min(360px,80vw)] font-mono text-sm">
            <ul className="space-y-1.5">
              {steps.slice(0, step + 1).map((s, i) => (
                <motion.li key={s} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${i === steps.length - 1 ? "bg-mint shadow-[0_0_8px_#00FFAA]" : "bg-cyan"}`} />
                  <span className={i === step ? "text-white" : "text-mist"}>{s}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-5 h-[3px] overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan via-violet to-mint"
                initial={{ width: "0%" }}
                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                transition={{ ease: "easeOut", duration: 0.25 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
