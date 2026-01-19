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
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.995 }}
      className="relative overflow-hidden rounded-2xl border p-5 backdrop-blur-xl transition will-change-transform [border-color:var(--border)] [background:var(--panel)] shadow-[0_20px_80px_rgba(15,23,42,0.22)]"
    >
      <div className="pointer-events-none absolute inset-px rounded-[1rem] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_60%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.2),transparent_55%)] opacity-70" />
      <div className="relative flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-medium tracking-tight [color:var(--muted-strong)]">
            {title}
          </h3>
          {description ? (
            <p className="mt-1 text-xs [color:var(--muted)]">{description}</p>
          ) : null}
        </div>
      </div>
      <div className="relative mt-4">{children}</div>
    </motion.section>
  );
}

