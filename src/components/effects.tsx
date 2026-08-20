"use client";

import { useEffect, useMemo, useState } from "react";

const SPARKS = [
  { t: 8, l: 6, s: 6, d: "0s" },
  { t: 18, l: 92, s: 8, d: "0.6s" },
  { t: 28, l: 14, s: 5, d: "1.1s" },
  { t: 36, l: 78, s: 7, d: "0.3s" },
  { t: 48, l: 4, s: 4, d: "1.8s" },
  { t: 58, l: 88, s: 6, d: "0.9s" },
  { t: 68, l: 22, s: 5, d: "1.4s" },
  { t: 76, l: 70, s: 8, d: "0.2s" },
  { t: 84, l: 40, s: 4, d: "2s" },
  { t: 12, l: 55, s: 5, d: "1.6s" },
  { t: 42, l: 48, s: 6, d: "0.7s" },
  { t: 90, l: 12, s: 7, d: "1.2s" },
  { t: 6, l: 32, s: 4, d: "2.2s" },
  { t: 52, l: 96, s: 5, d: "0.4s" },
] as const;

export function SparkField() {
  const sparks = useMemo(() => SPARKS, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {sparks.map((s, i) => (
        <span
          key={i}
          className="sparkle absolute rounded-full bg-paper"
          style={{
            top: `${s.t}%`,
            left: `${s.l}%`,
            width: s.s,
            height: s.s,
            animationDelay: s.d,
            boxShadow: "0 0 10px 2px var(--color-glow)",
          }}
        />
      ))}
    </div>
  );
}

export function PointerGlow() {
  const [pos, setPos] = useState({ x: 50, y: 20 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
      aria-hidden="true"
      style={{
        background: `radial-gradient(420px 420px at ${pos.x}px ${pos.y}px, color-mix(in srgb, var(--color-glow) 28%, transparent), transparent 70%)`,
      }}
    />
  );
}
