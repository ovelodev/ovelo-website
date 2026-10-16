import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export interface LegalSection {
  id: string;
  heading: string;
  body: React.ReactNode;
}

export function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro: React.ReactNode;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} description={intro}>
        <p className="mt-6 text-sm text-ink-500">Last updated: {updated}</p>
      </PageHero>
      <section className="pb-24 sm:pb-32">
        <Container className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-20">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold tracking-wide text-ink-500 uppercase">On this page</p>
              <ol className="mt-4 space-y-1 border-l border-line">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-ink-600 transition-colors hover:border-brand-violet hover:text-navy-950"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <div className="max-w-3xl space-y-12">
            {sections.map((s) => (
              <Reveal key={s.id} y={16}>
                <section id={s.id} className="scroll-mt-28">
                  <h2 className="text-2xl font-semibold tracking-tight text-navy-950">{s.heading}</h2>
                  <div className="mt-4 space-y-4 leading-relaxed text-ink-600 [&_a]:font-semibold [&_a]:text-brand-violet [&_a:hover]:underline [&_li]:pl-1 [&_strong]:text-navy-900 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                    {s.body}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
