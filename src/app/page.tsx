import { Approach } from "@/components/home/Approach";
import { CTASection } from "@/components/home/CTASection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FocusAreas } from "@/components/home/FocusAreas";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { site } from "@/lib/site";

export default function HomePage() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    description: site.description,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <Hero />
      <Marquee />
      <FocusAreas />
      <FeaturedProducts />
      <Approach />
      <CTASection />
    </>
  );
}
