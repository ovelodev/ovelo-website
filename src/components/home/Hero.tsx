"use client";

import { Fragment, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Aurora } from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { HeroOrbit } from "./HeroOrbit";

const ease = [0.22, 1, 0.36, 1] as const;
const lines = [
  { words: ["Useful", "technology."], gradient: false },
  { words: ["Thoughtfully", "built."], gradient: true },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(123, 92, 255, 0.10), transparent 70%)`;

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 lg:min-h-[100svh] lg:pt-36 lg:pb-24"
    >
      <Aurora />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: spotlight }} />

      <Container className="grid items-center gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
        <motion.div style={reduce ? undefined : { y: textY, opacity: fade }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <Eyebrow>AI experiences · Productivity · Utilities</Eyebrow>
          </motion.div>

          <h1 className="mt-7 text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.035em] text-navy-950 sm:text-6xl lg:text-6xl xl:text-[4.4rem]">
            {lines.map((line, li) => (
              <span key={line.words.join(" ")} className="block">
                {line.words.map((word, wi) => {
                  const i = li * 2 + wi;
                  return (
                    <Fragment key={word}>
                    <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                      <motion.span
                        className={line.gradient ? "text-gradient inline-block animate-gradient-pan" : "inline-block"}
                        initial={{ y: "110%", rotate: 4 }}
                        animate={{ y: "0%", rotate: 0 }}
                        transition={{ duration: 1, ease, delay: 0.15 + i * 0.09 }}
                      >
                        {word}
                      </motion.span>
                    </span>
                    {wi < line.words.length - 1 && " "}
                    </Fragment>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.6 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-ink-600 sm:text-xl"
          >
            Ovelo AI creates practical software, AI-powered experiences, and digital tools designed to make everyday
            tasks simpler.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <ButtonLink href="/products" className="px-7 py-3.5 text-base">
                Explore products
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="/about" variant="secondary" className="px-7 py-3.5 text-base">
                About Ovelo AI
              </ButtonLink>
            </Magnetic>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-8 flex items-center gap-2 text-sm text-ink-500"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-violet opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-violet" />
            </span>
            Our first products are currently in development.
          </motion.p>
        </motion.div>

        <motion.div
          style={reduce ? undefined : { y: visualY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
        >
          <HeroOrbit />
        </motion.div>
      </Container>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-line-strong pt-2">
          <motion.span
            className="h-2 w-1 rounded-full bg-brand-violet"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
