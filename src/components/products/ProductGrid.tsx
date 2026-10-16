"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import type { Product, ProductCategory } from "@/data/products";
import { cn } from "@/lib/utils";
import { MoreComingCard, ProductCard } from "./ProductCard";

/** Category filters only appear once the catalogue is large enough to need them. */
const FILTER_THRESHOLD = 6;

export function ProductGrid({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<ProductCategory | "All">("All");
  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))), [products]);
  const showFilters = products.length >= FILTER_THRESHOLD && categories.length > 1;
  const visible = category === "All" ? products : products.filter((p) => p.category === category);

  return (
    <LayoutGroup>
      {showFilters && (
        <div role="group" aria-label="Filter by category" className="mb-10 flex flex-wrap gap-2">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "relative rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                category === c ? "border-transparent text-white" : "border-line text-ink-600 hover:text-navy-950",
              )}
            >
              {category === c && (
                <motion.span layoutId="filter-pill" className="bg-brand-gradient absolute inset-0 rounded-full" />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>
      )}
      <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
            >
              <ProductCard product={p} />
            </motion.li>
          ))}
          {products.length < FILTER_THRESHOLD && (
            <motion.li
              key="more"
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: visible.length * 0.06 + 0.06 }}
            >
              <MoreComingCard />
            </motion.li>
          )}
        </AnimatePresence>
      </motion.ul>
    </LayoutGroup>
  );
}
