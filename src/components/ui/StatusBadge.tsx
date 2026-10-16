import { statusLabels, type ProductStatus } from "@/data/products";
import { cn } from "@/lib/utils";

const styles: Record<ProductStatus, { wrap: string; dot: string }> = {
  available: { wrap: "bg-emerald-50 text-emerald-800 ring-emerald-200", dot: "bg-emerald-500" },
  "coming-soon": { wrap: "bg-blue-50 text-blue-800 ring-blue-200", dot: "bg-blue-500" },
  "in-development": { wrap: "bg-lavender-50 text-brand-violet ring-lavender-200", dot: "bg-brand-violet" },
};

export function StatusBadge({ status, className }: { status: ProductStatus; className?: string }) {
  const s = styles[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        s.wrap,
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        {status !== "available" && (
          <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", s.dot)} />
        )}
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", s.dot)} />
      </span>
      {statusLabels[status]}
    </span>
  );
}
