import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-out-expo active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-white shadow-[0_10px_28px_-10px_rgba(109,74,240,0.7)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(109,74,240,0.8)]",
  secondary:
    "border border-line-strong bg-white text-navy-900 hover:-translate-y-0.5 hover:border-lavender-200 hover:bg-lavender-50",
  ghost: "text-navy-900 hover:bg-lavender-50",
  light: "bg-white text-navy-900 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(255,255,255,0.45)]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      )}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (external || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
