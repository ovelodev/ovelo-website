import { Reveal } from "@/components/motion/Reveal";
import { Aurora } from "./Aurora";
import { Container } from "./Container";
import { Eyebrow } from "./SectionHeading";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      <Aurora intensity="soft" />
      <Container>
        <div className="max-w-3xl">
          {eyebrow && (
            <Reveal y={12}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance text-navy-950 sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              {title}
            </h1>
          </Reveal>
          {description && (
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-ink-600 sm:text-xl">
                {description}
              </p>
            </Reveal>
          )}
          {children && <Reveal delay={0.2}>{children}</Reveal>}
        </div>
      </Container>
    </section>
  );
}
