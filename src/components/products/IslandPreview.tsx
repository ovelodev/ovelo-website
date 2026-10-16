"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Bell, Music2, Pause, Phone, SkipBack, SkipForward, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "idle" | "notify" | "music" | "call" | "timer";

const shapes: Record<Mode, { width: number; height: number; radius: number }> = {
  idle: { width: 92, height: 28, radius: 14 },
  notify: { width: 244, height: 46, radius: 23 },
  music: { width: 264, height: 118, radius: 30 },
  call: { width: 232, height: 46, radius: 23 },
  timer: { width: 196, height: 46, radius: 23 },
};

const cycle: Mode[] = ["idle", "notify", "idle", "music", "call", "timer"];

const controls: { mode: Exclude<Mode, "idle">; label: string; icon: typeof Bell }[] = [
  { mode: "notify", label: "Notification", icon: Bell },
  { mode: "music", label: "Music", icon: Music2 },
  { mode: "call", label: "Call", icon: Phone },
  { mode: "timer", label: "Timer", icon: Timer },
];

function IslandContent({ mode }: { mode: Mode }) {
  switch (mode) {
    case "notify":
      return (
        <div className="flex h-full items-center gap-2.5 px-2">
          <span className="bg-brand-gradient flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
            <Bell className="h-4 w-4 text-white" />
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block text-[11px] font-semibold text-white">New message</span>
            <span className="block truncate text-[11px] text-white/60">See you at 6?</span>
          </span>
          <span className="mr-2 text-[10px] text-white/50">now</span>
        </div>
      );
    case "music":
      return (
        <div className="flex h-full flex-col justify-between p-3">
          <div className="flex items-center gap-3">
            <span className="h-11 w-11 shrink-0 rounded-xl bg-linear-to-br from-[#2f6bff] via-[#7b5cff] to-[#f472b6]" />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-[12px] font-semibold text-white">Now playing</span>
              <span className="block truncate text-[11px] text-white/60">Track title · Artist</span>
            </span>
            <span className="flex h-6 items-end gap-[3px]">
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-full bg-[#a78bfa]"
                  animate={{ height: ["30%", "100%", "45%", "80%", "30%"] }}
                  transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                />
              ))}
            </span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="bg-brand-gradient h-full rounded-full"
              initial={{ width: "18%" }}
              animate={{ width: "62%" }}
              transition={{ duration: 6, ease: "linear" }}
            />
          </div>
          <div className="flex items-center justify-center gap-7 text-white">
            <SkipBack className="h-4 w-4" />
            <Pause className="h-5 w-5" />
            <SkipForward className="h-4 w-4" />
          </div>
        </div>
      );
    case "call":
      return (
        <div className="flex h-full items-center gap-2.5 px-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500">
            <Phone className="h-4 w-4 text-white" />
          </span>
          <span className="flex-1 text-[11px] font-semibold text-white">Ongoing call</span>
          <span className="mr-2 font-mono text-[11px] text-emerald-400">02:14</span>
        </div>
      );
    case "timer":
      return (
        <div className="flex h-full items-center gap-2.5 px-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500">
            <Timer className="h-4 w-4 text-white" />
          </span>
          <span className="flex-1 text-[11px] font-semibold text-white">Timer</span>
          <span className="mr-2 font-mono text-[12px] text-amber-400">04:59</span>
        </div>
      );
    default:
      return <span className="absolute top-1/2 right-3 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#1c2456] ring-1 ring-white/10" />;
  }
}

/** Illustrative mock-up of the island on an Android phone. Always shown with a "Preview" label. */
export function IslandPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(1);
  const [picked, setPicked] = useState<Mode | null>(null);
  const mode: Mode = picked ?? (reduce ? "music" : cycle[step % cycle.length]);
  const shape = shapes[mode];

  useEffect(() => {
    if (reduce || !inView || picked) return;
    const id = setInterval(() => setStep((s) => s + 1), 2600);
    return () => clearInterval(id);
  }, [inView, reduce, picked]);

  return (
    <figure ref={ref} className="relative mx-auto w-full max-w-[320px]">
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-full bg-[#4f7bff]/20 blur-3xl" />
      <div
        role="img"
        aria-label="Mock-up of Dynamic Island on an Android phone: a black pill at the top of the screen expands to show notifications, music controls, calls and timers."
        className="relative h-[560px] overflow-hidden rounded-[2.75rem] border-[10px] border-navy-950 bg-linear-to-b from-[#c7d2fe] via-[#ddd6fe] to-[#fbcfe8] shadow-[0_40px_90px_-30px_rgba(17,24,66,0.55)]"
      >
        {/* Island */}
        <div className="absolute inset-x-0 top-3 z-10 flex justify-center">
          <motion.div
            animate={{ width: shape.width, height: shape.height, borderRadius: shape.radius }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="relative overflow-hidden bg-black shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={mode}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                <IslandContent mode={mode} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Lock-screen style backdrop */}
        <div className="flex h-full flex-col items-center pt-40 text-navy-950">
          <p className="text-6xl font-semibold tracking-tight">9:41</p>
          <p className="mt-1 text-sm font-medium text-navy-800/70">Friday, 16 October</p>
          <div className="mt-auto mb-8 grid grid-cols-4 gap-4 opacity-70">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="h-11 w-11 rounded-2xl bg-white/60 shadow-sm" />
            ))}
          </div>
        </div>
      </div>

      <div role="group" aria-label="Show an island state" className="mt-6 -mx-8 flex flex-wrap justify-center gap-2">
        {controls.map(({ mode: m, label, icon: Icon }) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setPicked(picked === m ? null : m)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-300",
              mode === m
                ? "bg-brand-gradient border-transparent text-white shadow-[0_8px_20px_-8px_rgba(109,74,240,0.8)]"
                : "border-line bg-white text-ink-600 hover:text-navy-950",
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden />
            {label}
          </button>
        ))}
      </div>
      <figcaption className="mt-4 text-center text-sm text-ink-500">
        <span className="rounded-full bg-lavender-100 px-2.5 py-1 text-xs font-semibold text-brand-violet">Preview</span>{" "}
        Illustrative mock-up — final app may differ.
      </figcaption>
    </figure>
  );
}
