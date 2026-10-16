"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CircleAlert, CircleCheck, Copy, Send } from "lucide-react";
import { enquiryTypes, site, type EnquiryType } from "@/lib/site";
import { cn } from "@/lib/utils";

type Fields = { name: string; email: string; reason: EnquiryType | ""; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_FILL_MS = 2500;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  else if (f.name.length > 100) e.name = "Please keep your name under 100 characters.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (!f.reason) e.reason = "Please choose a reason for getting in touch.";
  if (f.message.trim().length < 10) e.message = "Please write a message of at least 10 characters.";
  else if (f.message.length > 4000) e.message = "Please keep your message under 4,000 characters.";
  return e;
}

/**
 * There is no form backend yet, so this form validates input in the browser and then
 * opens the visitor's email app with a pre-filled message to the official address.
 * Nothing is sent to or stored on this website.
 */
export function ContactForm({ initialReason, product }: { initialReason?: EnquiryType; product?: string }) {
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    reason: initialReason ?? "",
    message: product ? `I’d like to hear about updates for ${product}.\n\n` : "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "error" | "success">("idle");
  const [mailto, setMailto] = useState("");
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // Spam protection: hidden honeypot field + minimum time on page.
    if (data.get("website") || Date.now() - startedAt.current < MIN_FILL_MS) {
      setState("error");
      setErrors({ message: "Something went wrong. Please wait a moment and try again." });
      return;
    }
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setState("error");
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const reasonLabel = enquiryTypes.find((t) => t.value === fields.reason)?.label ?? "Enquiry";
    const subject = `${reasonLabel} — ${fields.name.trim()}`;
    const body = `${fields.message.trim()}\n\n—\nName: ${fields.name.trim()}\nReply to: ${fields.email.trim()}`;
    const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMailto(href);
    setState("success");
    window.location.href = href;
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const fieldClass = (key: keyof Fields) =>
    cn(
      "mt-2 block w-full rounded-2xl border bg-white px-4 py-3 text-navy-950 placeholder:text-ink-500/70 transition-[border-color,box-shadow] duration-300 focus:border-brand-violet focus:shadow-[0_0_0_4px_rgba(109,74,240,0.15)] focus:outline-none",
      errors[key] ? "border-red-400" : "border-line-strong",
    );

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            role="status"
            className="text-center"
          >
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
              className="bg-brand-gradient mx-auto flex h-16 w-16 items-center justify-center rounded-full text-white shadow-[0_16px_40px_-14px_rgba(109,74,240,0.8)]"
            >
              <CircleCheck className="h-8 w-8" aria-hidden />
            </motion.span>
            <h3 className="mt-6 text-2xl font-semibold text-navy-950">Your message is ready</h3>
            <p className="mx-auto mt-3 max-w-sm leading-relaxed text-ink-600">
              Your email app should now be open with your message filled in. Press send there to reach us.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
              <a href={mailto} className="rounded-full border border-line-strong px-4 py-2 font-semibold text-navy-900 hover:bg-lavender-50">
                Open email again
              </a>
              <button
                type="button"
                onClick={() => {
                  setState("idle");
                  setFields({ name: "", email: "", reason: "", message: "" });
                  startedAt.current = Date.now();
                }}
                className="rounded-full px-4 py-2 font-semibold text-brand-violet hover:bg-lavender-50"
              >
                Write another message
              </button>
            </div>
            <p className="mt-6 text-sm text-ink-500">
              Nothing opened? Email us directly at{" "}
              <a className="font-semibold text-brand-violet underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-5"
            aria-describedby="form-privacy"
          >
            <AnimatePresence>
              {state === "error" && Object.values(errors).some(Boolean) && (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                    <CircleAlert className="h-4 w-4 shrink-0" aria-hidden />
                    Please check the highlighted fields and try again.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-semibold text-navy-900">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={fields.name}
                  onChange={(e) => update("name", e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={fieldClass("name")}
                  placeholder="Your name"
                  maxLength={100}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-sm text-red-700">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-semibold text-navy-900">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={(e) => update("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={fieldClass("email")}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-sm text-red-700">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="reason" className="text-sm font-semibold text-navy-900">
                Reason for getting in touch
              </label>
              <div className="relative">
              <select
                id="reason"
                name="reason"
                value={fields.reason}
                onChange={(e) => update("reason", e.target.value as EnquiryType)}
                aria-invalid={!!errors.reason}
                aria-describedby={errors.reason ? "reason-error" : undefined}
                className={cn(fieldClass("reason"), "appearance-none pr-12")}
              >
                <option value="" disabled>
                  Choose one…
                </option>
                {enquiryTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-4 mt-1 h-5 w-5 -translate-y-1/2 text-ink-500" aria-hidden />
              </div>
              {errors.reason && (
                <p id="reason-error" className="mt-1.5 text-sm text-red-700">
                  {errors.reason}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-semibold text-navy-900">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={fields.message}
                onChange={(e) => update("message", e.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : "message-hint"}
                className={cn(fieldClass("message"), "resize-y")}
                placeholder="How can we help?"
                maxLength={4000}
              />
              {errors.message ? (
                <p id="message-error" className="mt-1.5 text-sm text-red-700">
                  {errors.message}
                </p>
              ) : (
                <p id="message-hint" className="mt-1.5 text-sm text-ink-500">
                  Please don’t include passwords, payment details or other sensitive information.
                </p>
              )}
            </div>

            {/* Honeypot: hidden from people, often filled by bots. */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="bg-brand-gradient group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-semibold text-white shadow-[0_10px_28px_-10px_rgba(109,74,240,0.7)] transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Send message
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 text-sm font-medium text-ink-600 hover:text-navy-950"
              >
                <Copy className="h-4 w-4" aria-hidden />
                <span aria-live="polite">{copied ? "Email address copied" : "Copy our email address"}</span>
              </button>
            </div>

            <p id="form-privacy" className="text-sm leading-relaxed text-ink-500">
              This form doesn’t send or store anything on our website — it prepares an email in your own email app.
              We use what you send only to reply to you. See our{" "}
              <Link href="/privacy" className="font-semibold text-brand-violet hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
