import { ArrowRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { MoreComingCard, ProductCard } from "@/components/products/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProducts } from "@/data/products";

export function FeaturedProducts() {
  const featured = getFeaturedProducts();
  const anyAvailable = featured.some((p) => p.status === "available");

  return (
    <section className="relative overflow-hidden bg-canvas py-24 sm:py-32" aria-labelledby="featured-products">
      <div aria-hidden className="bg-dots mask-radial absolute inset-0 opacity-60" />
      <Container className="relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Products"
            title={<span id="featured-products">What we’re building.</span>}
            description={
              anyAvailable
                ? "A selection of Ovelo AI products. Each one is labelled with its current status."
                : "Nothing is publicly available yet. Here’s an honest look at what’s in development."
            }
          />
          <ButtonLink href="/products" variant="secondary" className="self-start lg:self-auto">
            All products <ArrowRight className="h-4 w-4" aria-hidden />
          </ButtonLink>
        </div>

        <Stagger className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <StaggerItem key={p.slug} className="h-full">
              <ProductCard product={p} />
            </StaggerItem>
          ))}
          <StaggerItem className="h-full">
            <MoreComingCard />
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}
