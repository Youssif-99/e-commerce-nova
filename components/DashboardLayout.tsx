"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const SpaceBackground = dynamic(() => import("./SpaceBackground"), {
  ssr: false,
  loading: () => null,
});
const GlowOrbits = dynamic(() => import("./GlowOrbits"), {
  ssr: false,
  loading: () => null,
});

function useParallax() {
  const { scrollYProgress } = useScroll();
  const yBackground = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yForeground = useTransform(scrollYProgress, [0, 1], [0, -60]);
  return { yBackground, yForeground };
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { yBackground, yForeground } = useParallax();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: "/", label: "Live overview", icon: "●" },
    { href: "/orders", label: "Orders", icon: null },
    { href: "/products", label: "Products", icon: null },
    { href: "/users", label: "Customers", icon: null },
    { href: "/revenue", label: "Revenue", icon: null },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="pointer-events-none fixed inset-0 z-0">
        <SpaceBackground />
        <GlowOrbits />
      </div>

      <motion.div
        style={{ y: yBackground }}
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(129,140,248,0.15),transparent_55%)] mix-blend-screen"
      />

      <div className="relative z-10 flex min-h-screen flex-col md:flex-row">
        <aside className="flex w-full flex-none flex-row items-center justify-between border-b border-cyan-500/10 bg-black/10 px-5 py-3 backdrop-blur-xl md:h-screen md:w-64 md:flex-col md:items-stretch md:border-b-0 md:border-r">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-2xl border border-cyan-400/40 bg-slate-900 shadow-[0_0_40px_rgba(34,211,238,0.5)]">
              <div className="absolute inset-0 bg-[conic-gradient(from_180deg,_#22d3ee,_#6366f1,_#22d3ee)] opacity-70" />
              <div className="absolute inset-[3px] rounded-[0.9rem] bg-slate-950" />
              <div className="relative flex h-full items-center justify-center text-xs font-semibold tracking-[0.18em] text-cyan-300">
                NX
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Nova Commerce
              </p>
              <p className="text-[10px] text-slate-500">
                Next‑Gen E‑commerce Control
              </p>
            </div>
          </div>

          <nav className="mt-0 flex gap-1 text-xs md:mt-6 md:flex-col">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] transition-all md:w-full md:justify-start ${
                    active
                      ? "border border-cyan-400/30 bg-cyan-500/10 font-medium text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.35)] backdrop-blur"
                      : "text-slate-400 hover:bg-slate-900/80 hover:text-slate-50"
                  }`}
                >
                  {item.icon && (
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        active
                          ? "bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.9)]"
                          : ""
                      }`}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden flex-col gap-2 text-[11px] text-slate-500 md:mt-auto md:flex">
            <div className="flex items-center justify-between">
              <span>System status</span>
              <span className="inline-flex items-center gap-1 text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                Stable
              </span>
            </div>
            <p className="text-[10px] text-slate-500">
              API‑agnostic UI. Wire any backend via REST, GraphQL or TRPC.
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className="ml-4 inline-flex items-center gap-2 rounded-full border border-slate-500/40 px-3 py-1.5 text-[11px] font-medium text-slate-200 transition hover:border-cyan-400/60 hover:text-cyan-100 md:ml-0 md:mt-3"
            aria-label="Toggle theme"
          >
            <span
              className={`h-2.5 w-2.5 rounded-full transition ${
                theme === "dark"
                  ? "bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.9)]"
                  : "bg-slate-300 shadow-[0_0_12px_rgba(226,232,240,0.9)]"
              }`}
            />
            {theme === "dark" ? "Dark" : "Light"} mode
          </button>
        </aside>

        <motion.div
          style={{ y: yForeground }}
          className="flex-1 px-4 pb-6 pt-4 md:px-7 md:pt-6"
        >
          {children}
        </motion.div>
      </div>
    </main>
  );
}

