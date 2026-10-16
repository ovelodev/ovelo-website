import { cn } from "@/lib/utils";

/**
 * Ovelo symbol: a blue-to-purple ring with an orbiting dot.
 * TODO(before launch): swap for the owner's final logo files if they differ.
 */
export function LogoSymbol({
  className,
  gradientId = "ovelo-symbol-gradient",
  title,
}: {
  className?: string;
  gradientId?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={gradientId} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2f6bff" />
          <stop offset="0.55" stopColor="#7b5cff" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path
        d="M24 6a18 18 0 1 0 17.3 13"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="35.6" cy="10.2" r="4.6" fill={`url(#${gradientId})`} />
    </svg>
  );
}

export function Logo({ className, gradientId }: { className?: string; gradientId?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoSymbol className="h-8 w-8" gradientId={gradientId} />
      <span className="text-[1.15rem] font-semibold tracking-tight text-navy-900">
        Ovelo<span className="ml-1 font-medium text-navy-700">AI</span>
      </span>
    </span>
  );
}
