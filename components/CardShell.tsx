"use client";

import { motion } from "framer-motion";

export default function CardShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/60 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.9)] backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-px rounded-[1rem] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_60%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.2),transparent_55%)] opacity-70" />
      <div className="relative flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-medium tracking-tight text-slate-50">
            {title}
          </h3>
          {description ? (
            <p className="mt-1 text-xs text-slate-400">{description}</p>
          ) : null}
        </div>
      </div>
      <div className="relative mt-4">{children}</div>
    </motion.section>
  );
}

