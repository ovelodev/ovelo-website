import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Product } from "@/data/products";
import { ProductIcon } from "./ProductIcon";

export function ProductCard({ product }: { product: Product }) {
  return (
    <SpotlightCard className="h-full">
      <article className="relative flex h-full flex-col p-7 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <ProductIcon icon={product.icon} className="transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:-rotate-6" />
          <StatusBadge status={product.status} />
        </div>
        <p className="mt-7 text-xs font-semibold tracking-wide text-ink-500 uppercase">{product.category}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-navy-950">
          <Link
            href={`/products/${product.slug}`}
            className="rounded-sm after:absolute after:inset-0 after:content-['']"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-3 flex-1 leading-relaxed text-ink-600">{product.shortDescription}</p>
        <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-violet">
          View details
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </span>
      </article>
    </SpotlightCard>
  );
}

/** Honest placeholder card used while the catalogue is small. */
export function MoreComingCard() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-dashed border-line-strong bg-lavender-50/50 p-7 sm:p-8">
      <div aria-hidden className="bg-dots absolute inset-0 opacity-50" />
      <div className="relative">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-lavender-200 bg-white">
          <span className="bg-brand-gradient h-2.5 w-2.5 animate-pulse rounded-full" />
        </span>
        <h3 className="mt-7 text-2xl font-semibold tracking-tight text-navy-950">More on the way</h3>
        <p className="mt-3 leading-relaxed text-ink-600">
          We’re working on further tools. New products will appear here only once there is something real to show.
        </p>
      </div>
      <Link
        href="/contact?reason=updates"
        className="relative mt-7 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-violet hover:underline"
      >
        Ask to hear about updates <ArrowUpRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}
