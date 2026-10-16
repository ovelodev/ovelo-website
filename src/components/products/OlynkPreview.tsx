"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Send } from "lucide-react";

const nearby = [
  { initial: "A", x: "22%", y: "38%" },
  { initial: "S", x: "74%", y: "30%" },
  { initial: "J", x: "64%", y: "72%" },
];

const messages = [
  { from: "them", text: "Hi! Are you in the same room?" },
  { from: "me", text: "Yes — by the window 👋" },
  { from: "them", text: "Great, I’ll come over." },
];

/** Illustrative concept mock-up. Always rendered with a visible "Concept preview" label. */
export function OlynkPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const shown = reduce ? messages.length : step;

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setInterval(() => setStep((s) => (s >= messages.length + 1 ? 0 : s + 1)), 1600);
    return () => clearInterval(id);
  }, [inView, reduce]);

  return (
    <figure ref={ref} className="relative mx-auto w-full max-w-[320px]">
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-full bg-[#7b5cff]/20 blur-3xl" />
      <div
        className="relative overflow-hidden rounded-[2.75rem] border-[10px] border-navy-950 bg-white shadow-[0_40px_90px_-30px_rgba(17,24,66,0.55)]"
        role="img"
        aria-label="Concept mock-up of Olynk: a radar view showing three nearby people, above a short message thread."
      >
        <div className="absolute top-2 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-navy-950" />

        {/* Radar */}
        <div className="relative h-56 overflow-hidden bg-linear-to-b from-lavender-100 to-white">
          <div className="absolute inset-0 flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute h-48 w-48 animate-pulse-ring rounded-full border border-brand-violet/40"
                style={{ animationDelay: `${i * 0.9}s` }}
              />
            ))}
            <span className="absolute h-24 w-24 rounded-full border border-brand-violet/20" />
            <span className="absolute h-44 w-44 rounded-full border border-brand-violet/15" />
            <span className="bg-brand-gradient relative h-4 w-4 rounded-full ring-4 ring-white" />
          </div>
          {nearby.map((p, i) => (
            <motion.span
              key={p.initial}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.35, type: "spring", stiffness: 260, damping: 16 }}
              className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-navy-900 text-xs font-semibold text-white shadow-lg"
              style={{ left: p.x, top: p.y }}
            >
              {p.initial}
            </motion.span>
          ))}
          <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-navy-800 backdrop-blur">
            3 nearby
          </p>
        </div>

        {/* Thread */}
        <div className="flex h-60 flex-col justify-end gap-2 px-4 pb-3">
          <AnimatePresence>
            {messages.slice(0, shown).map((m) => (
              <motion.p
                key={m.text}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className={
                  m.from === "me"
                    ? "bg-brand-gradient ml-auto max-w-[78%] rounded-2xl rounded-br-md px-3.5 py-2 text-[13px] text-white"
                    : "max-w-[78%] rounded-2xl rounded-bl-md bg-lavender-100 px-3.5 py-2 text-[13px] text-navy-900"
                }
              >
                {m.text}
              </motion.p>
            ))}
          </AnimatePresence>
          <div className="mt-2 flex items-center gap-2 rounded-full border border-line px-3 py-2">
            <span className="flex-1 text-[12px] text-ink-500">Message nearby…</span>
            <span className="bg-brand-gradient flex h-7 w-7 items-center justify-center rounded-full text-white">
              <Send className="h-3.5 w-3.5" aria-hidden />
            </span>
          </div>
        </div>
      </div>
      <figcaption className="mt-5 text-center text-sm text-ink-500">
        <span className="rounded-full bg-lavender-100 px-2.5 py-1 text-xs font-semibold text-brand-violet">
          Concept preview
        </span>{" "}
        Illustrative only — not the final design.
      </figcaption>
    </figure>
  );
}
