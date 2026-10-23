"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import type { PointerEvent } from "react";

// ponytail: tilt 3D via framer-motion CSS transform (bukan WebGL); kalau butuh mesh 3D sungguhan → upgrade ke R3F
export function Card3D({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 200, damping: 20 });
  const my = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(my, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mx, [-0.5, 0.5], ["-8deg", "8deg"]);

  function move(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }
  function leave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onPointerMove={move}
      onPointerLeave={leave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
