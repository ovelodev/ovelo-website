export const site = {
  name: "Ovelo",
  tagline: "Useful technology. Thoughtfully built.",
  description:
    "Ovelo creates practical software, AI-powered experiences, and digital tools designed to make everyday tasks simpler.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  email: "ovelo.dev@gmail.com",
  supportEmail: "ovelo.dev@gmail.com",
  // Only add official profiles that actually exist.
  social: [] as { label: string; href: string }[],
  legalLastUpdated: "16 October 2026",
} as const;

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const enquiryTypes = [
  { value: "general", label: "General enquiry" },
  { value: "support", label: "Product support" },
  { value: "feedback", label: "Feedback / feature request" },
  { value: "business", label: "Business enquiry" },
  { value: "security", label: "Security issue" },
  { value: "updates", label: "Product updates" },
] as const;

export type EnquiryType = (typeof enquiryTypes)[number]["value"];
