import Link from "next/link";
import { ArrowUpRight, BookOpen, Mail, MessageCircleQuestion, ShieldAlert } from "lucide-react";
import { CTASection } from "@/components/home/CTASection";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { ProductIcon } from "@/components/products/ProductIcon";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { products } from "@/data/products";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Support",
  description: "How to get help with Ovelo products, where to find product information, and how to contact support.",
  path: "/support",
});

const steps = [
  {
    icon: BookOpen,
    title: "Check the product page",
    body: "Each product page has its current status, platform details and frequently asked questions.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Tell us what’s happening",
    body: "Send a short description of the problem, which product it’s about, and the device you’re using.",
  },
  {
    icon: Mail,
    title: "We’ll reply by email",
    body: "We read every message and reply as soon as we reasonably can.",
  },
];

const generalFaqs = [
  {
    question: "Where can I download Ovelo products?",
    answer:
      "Only from the official store links shown on each product page. If a product page doesn’t show a store link, that product isn’t available yet.",
  },
  {
    question: "How do I report a security issue?",
    answer: `Please email ${site.email} with the subject “Security issue” and as much detail as you can. Please don’t disclose it publicly until we’ve had a chance to respond.`,
  },
  {
    question: "Can I suggest a feature?",
    answer: "Yes, please do. Choose “Feedback / feature request” on the contact page.",
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title={
          <>
            How can we <span className="text-gradient">help</span>?
          </>
        }
        description="Find answers about our products, or get in touch and we’ll help you directly."
      />

      <section className="pb-16 sm:pb-24">
        <Container>
          <Stagger className="grid gap-5 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <StaggerItem key={title} className="h-full">
                <SpotlightCard className="h-full">
                  <div className="p-7">
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender-100 text-brand-violet">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span className="text-gradient text-4xl font-semibold">{i + 1}</span>
                    </div>
                    <h2 className="mt-8 text-lg font-semibold text-navy-950">{title}</h2>
                    <p className="mt-2 leading-relaxed text-ink-600">{body}</p>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-10">
            <div className="flex flex-col gap-4 rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:flex-row sm:items-start sm:p-8">
              <ShieldAlert className="h-6 w-6 shrink-0 text-amber-700" aria-hidden />
              <div>
                <h2 className="font-semibold text-amber-950">Keep your information safe</h2>
                <p className="mt-1 leading-relaxed text-amber-900">
                  Never send passwords, payment-card details or other sensitive information when contacting us. We will
                  never ask for them.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact?reason=support"
              className="bg-brand-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Contact support <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={`mailto:${site.supportEmail}`}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-lavender-50"
            >
              <Mail className="h-4 w-4" aria-hidden /> {site.supportEmail}
            </a>
          </Reveal>
        </Container>
      </section>

      <section className="bg-canvas py-16 sm:py-24" aria-labelledby="product-support">
        <Container>
          <SectionHeading eyebrow="By product" title={<span id="product-support">Product help</span>} />
          <Stagger as="ul" className="mt-12 grid gap-5 md:grid-cols-2">
            {products.map((p) => (
              <StaggerItem as="li" key={p.slug} className="rounded-3xl border border-line bg-white p-7">
                <div className="flex items-center gap-4">
                  <ProductIcon icon={p.icon} className="h-12 w-12" />
                  <div>
                    <h3 className="text-lg font-semibold text-navy-950">{p.name}</h3>
                    <StatusBadge status={p.status} className="mt-1" />
                  </div>
                </div>
                <ul className="mt-6 space-y-2 text-sm">
                  <li>
                    <Link href={`/products/${p.slug}`} className="font-semibold text-brand-violet hover:underline">
                      Product page &amp; FAQs
                    </Link>
                  </li>
                  <li>
                    {p.privacyPolicyUrl ? (
                      <a href={p.privacyPolicyUrl} className="font-semibold text-brand-violet hover:underline">
                        {p.name} privacy policy
                      </a>
                    ) : (
                      <span className="text-ink-600">Product privacy policy will be published at launch.</span>
                    )}
                  </li>
                  <li>
                    <a
                      href={`mailto:${p.support?.email ?? site.supportEmail}`}
                      className="font-semibold text-brand-violet hover:underline"
                    >
                      Email support
                    </a>
                  </li>
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="py-16 sm:py-24" aria-labelledby="general-faq">
        <Container className="max-w-4xl">
          <Reveal>
            <h2 id="general-faq" className="text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
              Common questions
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <Accordion items={generalFaqs} />
          </Reveal>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
