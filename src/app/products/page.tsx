import { CTASection } from "@/components/home/CTASection";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { products } from "@/data/products";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Products",
  description:
    "Browse Ovelo products and see the current status of each one — available, coming soon, or in development.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title={
          <>
            Tools we’re <span className="text-gradient">building</span>.
          </>
        }
        description="Every Ovelo product in one place. Each one is clearly labelled, so you always know what you can use today and what’s still on the way."
      >
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Status key">
          <li>
            <StatusBadge status="available" />
          </li>
          <li>
            <StatusBadge status="coming-soon" />
          </li>
          <li>
            <StatusBadge status="in-development" />
          </li>
        </ul>
      </PageHero>
      <section className="pb-8" aria-label="Product catalogue">
        <Container>
          <ProductGrid products={products} />
        </Container>
      </section>
      <CTASection
        title="Have an idea or a question?"
        description="We’re always happy to hear what would make your day simpler."
      />
    </>
  );
}
