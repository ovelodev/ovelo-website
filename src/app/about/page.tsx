import { CTASection } from "@/components/home/CTASection";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { focusAreas, principles } from "@/data/brand";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Why Ovelo exists, how we think about building software, and the areas we explore across AI, productivity and everyday utilities.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Ovelo"
        title={
          <>
            Making everyday technology <span className="text-gradient">quietly better</span>.
          </>
        }
        description="Ovelo is a software brand building practical digital products. We focus on tools that are genuinely useful, easy to understand, and respectful of the people who use them."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-lavender-200 bg-lavender-50 p-8 sm:p-14 lg:p-20">
              <div aria-hidden className="bg-dots absolute inset-0 opacity-60" />
              <p className="relative text-sm font-semibold tracking-wide text-brand-violet uppercase">Our purpose</p>
              <blockquote className="relative mt-6 max-w-4xl text-2xl leading-snug font-semibold tracking-tight text-balance text-navy-950 sm:text-4xl lg:text-5xl lg:leading-[1.15]">
                To build software that removes a little friction from people’s day —{" "}
                <span className="text-gradient">useful first, simple always.</span>
              </blockquote>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-24" aria-labelledby="philosophy">
        <Container className="grid gap-14 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Product philosophy"
            title={<span id="philosophy">Build less, but build it well.</span>}
            description="We would rather ship one tool that people rely on than ten that they forget. That means taking time over the details, being honest about what a product does, and improving it steadily based on real feedback."
          />
          <Stagger as="ul" className="space-y-3">
            {principles.map(({ icon: Icon, title, body }) => (
              <StaggerItem
                as="li"
                key={title}
                className="group flex gap-4 rounded-2xl border border-line bg-white p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-lavender-200 hover:shadow-[0_20px_50px_-30px_rgba(46,54,140,0.4)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lavender-100 text-brand-violet transition-transform duration-500 group-hover:rotate-6">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-semibold text-navy-950">{title}</h3>
                  <p className="mt-1 leading-relaxed text-ink-600">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="bg-canvas py-16 sm:py-24" aria-labelledby="areas">
        <Container>
          <SectionHeading
            eyebrow="Areas we explore"
            title={<span id="areas">Where we spend our time.</span>}
            description="Our work spans a few related areas. These describe where we’re exploring — not a list of finished products."
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {focusAreas.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title} className="h-full">
                <SpotlightCard className="h-full">
                  <div className="p-7">
                    <Icon className="h-6 w-6 text-brand-violet" aria-hidden />
                    <h3 className="mt-6 font-semibold text-navy-950">{title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-600">{body}</p>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CTASection title="Let’s talk." description="Questions, ideas or collaboration enquiries — we’d love to hear from you." />
    </>
  );
}
