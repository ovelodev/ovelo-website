"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 12);
    setHidden(y > prev && y > 280);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: hidden && !open ? "-130%" : "0%", opacity: 1 }}
        transition={{ duration: 0.5, ease }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6"
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between rounded-full border py-2 pr-2 pl-4 transition-all duration-500 ease-out-expo",
            scrolled || open
              ? "glass border-line/80 shadow-[0_12px_40px_-20px_rgba(17,24,66,0.35)]"
              : "border-transparent bg-transparent",
          )}
        >
          <Link href="/" aria-label="Ovelo home" onClick={() => setOpen(false)} className="rounded-full">
            <Logo gradientId="logo-header" />
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        active ? "text-navy-950" : "text-ink-600 hover:text-navy-950",
                      )}
                    >
                      {item.label}
                    </Link>
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-lavender-100"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/products"
              className="bg-brand-gradient group hidden items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_22px_-10px_rgba(109,74,240,0.8)] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
            >
              Explore products
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-navy-900 md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass fixed inset-0 z-40 overflow-y-auto px-4 pt-28 pb-10 md:hidden"
          >
            <nav aria-label="Mobile">
              <motion.ul
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
                className="flex flex-col"
              >
                {[...mainNav, { href: "/support", label: "Support" }].map((item) => (
                  <motion.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                    }}
                    className="border-b border-line"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between py-5 text-3xl font-semibold tracking-tight",
                        isActive(item.href) ? "text-gradient" : "text-navy-950",
                      )}
                    >
                      {item.label}
                      <ArrowRight className="h-6 w-6 text-ink-500" aria-hidden />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.5, ease } }}
                exit={{ opacity: 0 }}
              >
                <Link
                  href="/products"
                  onClick={() => setOpen(false)}
                  className="bg-brand-gradient mt-10 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold text-white"
                >
                  Explore products <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
