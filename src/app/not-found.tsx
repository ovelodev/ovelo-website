import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { LogoSymbol } from "@/components/brand/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { Aurora } from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[85svh] items-center overflow-hidden pt-32 pb-20">
      <Aurora />
      <Container className="text-center">
        <Reveal>
          <div className="relative mx-auto flex w-fit items-center justify-center">
            <span className="text-gradient animate-gradient-pan text-[7rem] leading-none font-semibold tracking-tighter sm:text-[11rem]">
              4
            </span>
            <span className="mx-1 inline-flex animate-float">
              <LogoSymbol className="h-24 w-24 animate-spin-slow [animation-duration:14s] sm:h-36 sm:w-36" gradientId="logo-404" />
            </span>
            <span className="text-gradient animate-gradient-pan text-[7rem] leading-none font-semibold tracking-tighter sm:text-[11rem]">
              4
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-8 text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
            This page has drifted out of orbit.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-ink-600">
            The page you’re looking for doesn’t exist or may have moved.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">
            Back to home <ArrowRight className="h-4 w-4" aria-hidden />
          </ButtonLink>
          <ButtonLink href="/products" variant="secondary">
            Browse products
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
