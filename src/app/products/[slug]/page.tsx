import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Clock, LifeBuoy, Lock, Monitor } from "lucide-react";
import { CTASection } from "@/components/home/CTASection";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { IslandPreview } from "@/components/products/IslandPreview";
import { OlynkPreview } from "@/components/products/OlynkPreview";
import { ProductIcon } from "@/components/products/ProductIcon";
import { Accordion } from "@/components/ui/Accordion";
import { Aurora } from "@/components/ui/Aurora";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getProduct, products, type Product } from "@/data/products";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({ title: product.name, description: product.shortDescription, path: `/products/${slug}` });
}

function StatusCTA({ product }: { product: Product }) {
  if (product.status === "available" && product.storeLinks.length > 0) {
    return (
      <div className="flex flex-wrap gap-3">
        {product.storeLinks.map((l) => (
          <ButtonLink key={l.href} href={l.href} external>
            Get the app — {l.label} <ArrowRight className="h-4 w-4" aria-hidden />
          </ButtonLink>
        ))}
      </div>
    );
  }
  const updatesHref = `/contact?reason=updates&product=${product.slug}`;
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ButtonLink href={updatesHref}>
        Join updates <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </ButtonLink>
      {product.status !== "available" && (
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink-600">
          <Clock className="h-4 w-4" aria-hidden /> Coming soon
        </span>
      )}
    </div>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const exploring = product.status === "in-development";
  const supportEmail = product.support?.email ?? site.supportEmail;

  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 lg:pb-24">
        <Aurora />
        <Container>
          <Reveal y={10}>
            <Link
              href="/products"
              className="group inline-flex items-center gap-1.5 rounded-full text-sm font-medium text-ink-600 hover:text-navy-950"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden /> All products
            </Link>
          </Reveal>
          <div className="mt-10 grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-4">
                  <ProductIcon icon={product.icon} className="h-16 w-16 rounded-[1.25rem]" />
                  <StatusBadge status={product.status} />
                  <span className="text-sm font-medium text-ink-500">{product.category}</span>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-8 text-5xl font-semibold tracking-tight text-navy-950 sm:text-6xl lg:text-7xl">
                  {product.name}
                </h1>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 max-w-xl text-xl leading-relaxed text-pretty text-ink-600 sm:text-2xl">
                  {product.tagline}
                </p>
              </Reveal>
              <Reveal delay={0.2} className="mt-10">
                <StatusCTA product={product} />
              </Reveal>
            </div>
            {product.preview && (
              <Reveal delay={0.2}>{product.preview === "olynk" ? <OlynkPreview /> : <IslandPreview />}</Reveal>
            )}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">What it does</h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-600">
                {product.fullDescription.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </Reveal>
            <Reveal className="mt-14">
              <h2 className="text-2xl font-semibold tracking-tight text-navy-950">Who it’s for</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-600">{product.audience}</p>
            </Reveal>

            <div className="mt-14">
              <Reveal>
                <h2 className="text-2xl font-semibold tracking-tight text-navy-950">
                  {exploring ? "What we’re exploring" : "Features"}
                </h2>
                {exploring && (
                  <p className="mt-3 text-ink-600">
                    These are goals for the product, not finished features. Details may change during development.
                  </p>
                )}
                {product.status === "coming-soon" && (
                  <p className="mt-3 text-ink-600">Built and being prepared for release.</p>
                )}
              </Reveal>
              <Stagger as="ul" className="mt-8 grid gap-4 sm:grid-cols-2">
                {product.features.map((f) => (
                  <StaggerItem
                    as="li"
                    key={f}
                    className="flex gap-3 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-lavender-200"
                  >
                    <span className="bg-brand-gradient mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white">
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <span className="leading-relaxed text-navy-900">{f}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start" aria-label="Product information">
            <Reveal>
              <div className="rounded-3xl border border-line bg-canvas p-7">
                <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wide text-ink-500 uppercase">
                  <Monitor className="h-4 w-4" aria-hidden /> Platforms &amp; availability
                </h2>
                <p className="mt-4 text-navy-900">
                  {product.platforms.length > 0 ? product.platforms.join(", ") : "Platforms not yet confirmed."}
                </p>
                <p className="mt-2 text-sm text-ink-600">
                  {product.status === "available"
                    ? "Available now from the official store links above."
                    : "Not yet available to download."}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-3xl border border-line bg-canvas p-7">
                <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wide text-ink-500 uppercase">
                  <LifeBuoy className="h-4 w-4" aria-hidden /> Support
                </h2>
                <p className="mt-4 text-navy-900">
                  Questions about {product.name}? Email{" "}
                  <a href={`mailto:${supportEmail}`} className="font-semibold text-brand-violet hover:underline">
                    {supportEmail}
                  </a>{" "}
                  or visit the{" "}
                  <Link href="/support" className="font-semibold text-brand-violet hover:underline">
                    support page
                  </Link>
                  .
                </p>
                {product.releaseNotesUrl && (
                  <a href={product.releaseNotesUrl} className="mt-3 inline-block text-sm font-semibold text-brand-violet hover:underline">
                    Release notes
                  </a>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="rounded-3xl border border-line bg-canvas p-7">
                <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wide text-ink-500 uppercase">
                  <Lock className="h-4 w-4" aria-hidden /> Privacy
                </h2>
                <p className="mt-4 text-navy-900">
                  {product.privacyPolicyUrl ? (
                    <a href={product.privacyPolicyUrl} className="font-semibold text-brand-violet hover:underline">
                      {product.name} privacy policy
                    </a>
                  ) : (
                    <>
                      A dedicated privacy policy for {product.name} will be published before it launches. Until then,
                      our{" "}
                      <Link href="/privacy" className="font-semibold text-brand-violet hover:underline">
                        website privacy policy
                      </Link>{" "}
                      applies to this site.
                    </>
                  )}
                </p>
              </div>
            </Reveal>
          </aside>
        </Container>
      </section>

      {product.faqs.length > 0 && (
        <section className="bg-canvas py-16 sm:py-24" aria-labelledby="faq">
          <Container className="max-w-4xl">
            <Reveal>
              <h2 id="faq" className="text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
                Frequently asked questions
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <Accordion items={product.faqs} />
            </Reveal>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}
