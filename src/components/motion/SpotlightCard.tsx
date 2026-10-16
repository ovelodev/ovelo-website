"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

/** Card with a cursor-following glow and a gentle 3D tilt (mouse only, off for reduced motion). */
export function SpotlightCard({
  children,
  className,
  tilt = true,
  glow = "rgba(109, 74, 240, 0.14)",
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const rotateX = useSpring(0, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 18 });
  const background = useMotionTemplate`radial-gradient(380px circle at ${mx}% ${my}%, ${glow}, transparent 65%)`;

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mx.set(px * 100);
    my.set(py * 100);
    if (tilt && !reduce) {
      rotateY.set((px - 0.5) * 7);
      rotateX.set(-(py - 0.5) * 7);
    }
  }

  function onPointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={cn(
        "group relative isolate overflow-hidden rounded-3xl border border-line bg-white transition-[box-shadow,border-color] duration-500 hover:border-lavender-200 hover:shadow-[0_24px_60px_-28px_rgba(46,54,140,0.35)]",
        className,
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
      />
      {children}
    </motion.div>
  );
}
