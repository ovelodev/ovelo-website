const words = ["Useful", "Simple", "Thoughtful", "Trustworthy", "Always improving", "Practical", "Calm", "Focused"];

/** Decorative scrolling band of brand values. */
export function Marquee() {
  const row = [...words, ...words];
  return (
    <div aria-hidden className="mask-fade-x relative overflow-hidden border-y border-line bg-canvas py-6">
      <div className="flex w-max animate-marquee gap-10">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 text-2xl font-semibold tracking-tight text-navy-900/80 sm:text-3xl">
            {w}
            <span className="bg-brand-gradient h-2 w-2 rounded-full" />
          </span>
        ))}
      </div>
    </div>
  );
}
