import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-lavender-200 bg-lavender-50/80 px-3 py-1 text-xs font-semibold tracking-wide text-brand-violet uppercase",
        className,
      )}
    >
      <span className="bg-brand-gradient h-1.5 w-1.5 rounded-full" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance text-navy-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {description && <p className="mt-5 text-lg leading-relaxed text-pretty text-ink-600">{description}</p>}
    </Reveal>
  );
}
