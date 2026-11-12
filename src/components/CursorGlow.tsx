"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });
  const rx = useSpring(x, { stiffness: 900, damping: 45 });
  const ry = useSpring(y, { stiffness: 900, damping: 45 });
  const [fine, setFine] = useState(false);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFine(mq.matches);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHot(!!t?.closest("a,button,[role=button],input,textarea"));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!fine) return null;
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-0 h-[520px] w-[520px] rounded-full"
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(0,217,255,0.10), rgba(125,95,255,0.06) 40%, transparent 70%)",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-cyan/70 mix-blend-screen"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hot ? 40 : 22, height: hot ? 40 : 22, opacity: hot ? 1 : 0.6 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
