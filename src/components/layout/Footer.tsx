import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { products } from "@/data/products";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/products", label: "Products" },
      { href: "/about", label: "About" },
    ],
  },
  {
    title: "Products",
    links: products.map((p) => ({ href: `/products/${p.slug}`, label: p.name })),
  },
  {
    title: "Help",
    links: [
      { href: "/support", label: "Support" },
      { href: "/contact", label: "Contact" },
      { href: `mailto:${site.email}`, label: site.email },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-canvas">
      <Container className="relative pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Link href="/" aria-label="Ovelo home" className="inline-flex rounded-full">
              <Logo gradientId="logo-footer" />
            </Link>
            <p className="mt-5 leading-relaxed text-ink-600">
              A software brand building practical tools across AI experiences, productivity and everyday utilities.
            </p>
            {site.social.length > 0 && (
              <ul className="mt-6 flex gap-3">
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-ink-600 hover:text-navy-950">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-sm font-semibold text-navy-950">{col.title}</h2>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      {l.href.startsWith("mailto:") ? (
                        <a href={l.href} className="text-sm break-all text-ink-600 transition-colors hover:text-navy-950">
                          {l.label}
                        </a>
                      ) : (
                        <Link
                          href={l.href}
                          className="group relative text-sm text-ink-600 transition-colors hover:text-navy-950"
                        >
                          {l.label}
                          <span className="bg-brand-gradient absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <p
          aria-hidden
          className="pointer-events-none mt-16 bg-linear-to-b from-lavender-200 to-transparent bg-clip-text text-center text-[22vw] leading-none font-semibold tracking-tighter text-transparent select-none lg:text-[13rem]"
        >
          Ovelo
        </p>

        <div className="mt-4 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-sm text-ink-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Ovelo. All rights reserved.</p>
          <p>Useful technology. Thoughtfully built.</p>
        </div>
      </Container>
    </footer>
  );
}
