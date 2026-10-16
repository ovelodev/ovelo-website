"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { principles } from "@/data/brand";


export function Approach() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="our-approach">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow>Our approach</Eyebrow>
            <h2
              id="our-approach"
              className="mt-5 text-3xl font-semibold tracking-tight text-balance text-navy-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
            >
              Principles we build by.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-600">
              The same five ideas guide every product decision we make, from the first sketch to each update.
            </p>
          </motion.div>
        </div>

        <ol ref={listRef} className="relative space-y-4 pl-10 sm:pl-14">
          <span aria-hidden className="absolute top-2 bottom-2 left-[15px] w-px bg-line sm:left-[23px]" />
          <motion.span
            aria-hidden
            style={{ scaleY }}
            className="bg-brand-gradient absolute top-2 bottom-2 left-[15px] w-px origin-top sm:left-[23px]"
          />
          {principles.map(({ icon: Icon, title, body }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0.25, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.8, once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl border border-line bg-white p-6 transition-shadow duration-500 hover:shadow-[0_24px_60px_-30px_rgba(46,54,140,0.35)] sm:p-7"
            >
              <span className="absolute top-7 -left-10 flex h-8 w-8 -translate-x-[1px] items-center justify-center rounded-full border border-line bg-white text-xs font-semibold text-brand-violet sm:-left-14 sm:h-12 sm:w-12 sm:text-sm">
                {i + 1}
              </span>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-lavender-100 text-brand-violet transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-navy-950">{title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink-600">{body}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
