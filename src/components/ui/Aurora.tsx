import { cn } from "@/lib/utils";

/** Decorative animated gradient backdrop (pure CSS, GPU-friendly). */
export function Aurora({ className, intensity = "normal" }: { className?: string; intensity?: "normal" | "soft" }) {
  const o = intensity === "soft" ? "opacity-60" : "opacity-100";
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div className="bg-grid mask-radial absolute inset-0 opacity-70" />
      <div className={o}>
        <div className="aurora-blob -top-40 -left-32 h-[34rem] w-[34rem] bg-[#4f7bff]/25" />
        <div
          className="aurora-blob top-10 -right-40 h-[30rem] w-[30rem] bg-[#a855f7]/20"
          style={{ animationDelay: "-7s", animationDuration: "24s" }}
        />
        <div
          className="aurora-blob top-[45%] left-1/3 h-[26rem] w-[26rem] bg-[#7b5cff]/15"
          style={{ animationDelay: "-13s", animationDuration: "28s" }}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-white" />
    </div>
  );
}
