"use client";

import { motion, useReducedMotion, useSpring } from "framer-motion";
import { Layers, ListChecks, Sparkles, Wrench, type LucideIcon } from "lucide-react";
import { LogoSymbol } from "@/components/brand/Logo";

const nodes: { label: string; icon: LucideIcon; pos: string }[] = [
  { label: "AI experiences", icon: Sparkles, pos: "left-1/2 top-0" },
  { label: "Productivity", icon: ListChecks, pos: "left-full top-1/2" },
  { label: "Utilities", icon: Wrench, pos: "left-1/2 top-full" },
  { label: "Connected", icon: Layers, pos: "left-0 top-1/2" },
];

/** Decorative hero visual: the Ovelo symbol with the four focus areas in orbit. */
export function HeroOrbit() {
  const reduce = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 80, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 80, damping: 20 });

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 16);
    rotateX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 16);
  }

  return (
    <div
      aria-hidden
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      className="relative mx-auto aspect-square w-full max-w-[min(520px,80vw)]"
    >
      <motion.div style={{ rotateX, rotateY, transformPerspective: 1200 }} className="relative h-full w-full">
        {/* Glow */}
        <div className="absolute inset-[18%] rounded-full bg-linear-to-br from-[#4f7bff]/30 via-[#7b5cff]/25 to-[#a855f7]/30 blur-3xl" />

        {/* Rings */}
        <div className="absolute inset-0 rounded-full border border-line-strong/70" />
        <div className="absolute inset-[16%] rounded-full border border-dashed border-lavender-200" />
        <div className="absolute inset-[32%] rounded-full border border-line" />

        {/* Orbiting satellites on the inner ring */}
        <div className="absolute inset-[16%] animate-spin-slow-reverse [animation-duration:28s]">
          <span className="bg-brand-gradient absolute top-0 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_20px_rgba(123,92,255,0.8)]" />
          <span className="absolute bottom-[14%] left-[8%] h-2 w-2 rounded-full bg-[#4f7bff]/70" />
        </div>

        {/* Core */}
        <div className="absolute inset-[34%] flex items-center justify-center rounded-[2.2rem] border border-white/70 bg-white/80 shadow-[0_30px_80px_-30px_rgba(46,54,140,0.55)] backdrop-blur-xl">
          <div className="animate-float">
            <LogoSymbol className="h-20 w-20 sm:h-24 sm:w-24" gradientId="logo-hero" />
          </div>
          <span className="absolute inset-0 animate-pulse-ring rounded-[2.2rem] border border-brand-violet/30 [animation-duration:3.6s]" />
        </div>

        {/* Focus-area chips orbiting just inside the outer ring */}
        <div className="absolute inset-[7%] animate-spin-slow">
          {nodes.map(({ label, icon: Icon, pos }) => (
            <div key={label} className={`absolute ${pos} -translate-x-1/2 -translate-y-1/2`}>
              <div className="animate-spin-slow-reverse">
                <div className="glass flex items-center gap-2 rounded-2xl border border-white/80 py-2 pr-3.5 pl-2 shadow-[0_16px_40px_-18px_rgba(17,24,66,0.45)]">
                  <span className="bg-brand-gradient flex h-8 w-8 items-center justify-center rounded-xl text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-semibold whitespace-nowrap text-navy-900 sm:text-sm">{label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
