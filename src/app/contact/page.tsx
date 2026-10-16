import { Bug, Briefcase, LifeBuoy, Mail, MessageSquareText, Sparkles } from "lucide-react";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactFormFromUrl } from "@/components/contact/ContactFormFromUrl";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with Ovelo AI for general enquiries, product support, feedback, business or security matters.",
  path: "/contact",
});

const topics = [
  { icon: MessageSquareText, title: "General enquiry", body: "Questions about Ovelo AI or what we’re working on." },
  { icon: LifeBuoy, title: "Product support", body: "Help with one of our products." },
  { icon: Sparkles, title: "Feedback & ideas", body: "Feature requests and suggestions are always welcome." },
  { icon: Briefcase, title: "Business enquiry", body: "Collaboration and partnership conversations." },
  { icon: Bug, title: "Security issue", body: "Found a vulnerability? Please tell us privately by email." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let’s <span className="text-gradient">talk</span>.
          </>
        }
        description="Whether it’s a question, an idea or a problem to report, we read every message."
      />
      <section className="pb-24 sm:pb-32">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
          <div className="space-y-8">
            <Reveal>
              <a
                href={`mailto:${site.email}`}
                className="group relative flex items-center gap-5 overflow-hidden rounded-3xl border border-line bg-white p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-lavender-200 hover:shadow-[0_24px_60px_-30px_rgba(46,54,140,0.45)]"
              >
                <span className="bg-brand-gradient flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white transition-transform duration-500 group-hover:-rotate-6">
                  <Mail className="h-6 w-6" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm text-ink-500">Email us directly</span>
                  <span className="block text-lg font-semibold break-all text-navy-950">{site.email}</span>
                </span>
              </a>
            </Reveal>
            <Stagger as="ul" className="space-y-2">
              {topics.map(({ icon: Icon, title, body }) => (
                <StaggerItem as="li" key={title} className="flex gap-4 rounded-2xl p-3 transition-colors hover:bg-lavender-50">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-violet" aria-hidden />
                  <span>
                    <span className="block font-semibold text-navy-950">{title}</span>
                    <span className="block text-sm leading-relaxed text-ink-600">{body}</span>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-[2rem] border border-line bg-white p-6 shadow-[0_30px_80px_-40px_rgba(46,54,140,0.4)] sm:p-10">
              <h2 className="text-2xl font-semibold tracking-tight text-navy-950">Send us a message</h2>
              <p className="mt-2 mb-8 text-ink-600">All fields are required.</p>
              <Suspense fallback={<ContactForm />}>
                <ContactFormFromUrl />
              </Suspense>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
