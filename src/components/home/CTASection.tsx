import { ArrowRight } from "lucide-react";
import { LogoSymbol } from "@/components/brand/Logo";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CTASection({
  title = "Curious about what’s next?",
  description = "Explore our products, get in touch, or check back here for updates as new tools take shape.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-navy-950 px-6 py-16 text-center sm:px-16 sm:py-24">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="aurora-blob -top-24 -left-24 h-96 w-96 bg-[#2f6bff]/45" />
              <div className="aurora-blob -right-24 -bottom-32 h-[28rem] w-[28rem] bg-[#a855f7]/40" style={{ animationDelay: "-9s" }} />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] mask-radial bg-[size:48px_48px]" />
            </div>
            <LogoSymbol className="mx-auto h-14 w-14 animate-float" gradientId="logo-cta" />
            <h2 className="mx-auto mt-8 max-w-2xl text-3xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75">{description}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Magnetic>
                <ButtonLink href="/products" variant="light" className="px-7 py-3.5 text-base">
                  Explore products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </ButtonLink>
              </Magnetic>
              <Magnetic>
                <ButtonLink
                  href="/contact"
                  variant="ghost"
                  className="border border-white/25 px-7 py-3.5 text-base text-white hover:bg-white/10"
                >
                  Contact Ovelo
                </ButtonLink>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
