import { ListChecks, Radar, Sparkles, Wrench, type LucideIcon } from "lucide-react";
import type { ProductIconKey } from "@/data/products";
import { cn } from "@/lib/utils";

const icons: Record<ProductIconKey, LucideIcon> = {
  olynk: Radar,
  sparkles: Sparkles,
  checklist: ListChecks,
  wrench: Wrench,
};

export function ProductIcon({ icon, className }: { icon: ProductIconKey; className?: string }) {
  const Icon = icons[icon];
  return (
    <span
      className={cn(
        "bg-brand-gradient relative flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-[0_12px_30px_-12px_rgba(109,74,240,0.75)]",
        className,
      )}
    >
      <span className="absolute inset-px rounded-[15px] bg-linear-to-b from-white/25 to-transparent" />
      <Icon className="relative h-1/2 w-1/2" strokeWidth={1.8} aria-hidden />
    </span>
  );
}
