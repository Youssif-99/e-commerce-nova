"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GlowOrbits() {
  const orbitsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!orbitsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".orbit", {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
    }, orbitsRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={orbitsRef}
      className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)]"
    >
      <div className="orbit absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/10 shadow-[0_0_60px_rgba(34,211,238,0.2)]" />
      <div className="orbit absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/15 shadow-[0_0_60px_rgba(139,92,246,0.2)]" />
      <div className="orbit absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/10 shadow-[0_0_80px_rgba(59,130,246,0.25)]" />
    </div>
  );
}

