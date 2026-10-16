import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { focusAreas } from "@/data/brand";


export function FocusAreas() {
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="what-we-do">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What we do"
            title={<span id="what-we-do">Software for the moments that should feel simpler.</span>}
            description="These are the areas we explore. Not every area has a launched product yet — we’d rather build slowly and well."
          />
        </div>

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map(({ icon: Icon, title, body }, i) => (
            <StaggerItem key={title} className="h-full">
              <SpotlightCard className="h-full">
                <div className="flex h-full flex-col p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender-100 text-brand-violet transition-all duration-500 ease-out-expo group-hover:bg-brand-violet group-hover:text-white group-hover:shadow-[0_10px_30px_-10px_rgba(109,74,240,0.8)]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-ink-500">0{i + 1}</span>
                  </div>
                  <h3 className="mt-10 text-lg font-semibold text-navy-950">{title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-600">{body}</p>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
