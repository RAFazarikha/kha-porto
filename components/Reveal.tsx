"use client";

import { motion } from "framer-motion";

export function Reveal({ children, delay = 0, className, role }: { children: React.ReactNode; delay?: number; className?: string; role?: string }) {
  return (
    <motion.div
      className={className}
      role={role}
      data-reveal
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.div>
  );
}
