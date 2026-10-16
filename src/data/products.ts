/**
 * Central product catalogue. Add a product here and it automatically appears
 * on /products, gets its own /products/[slug] page, and is listed in the
 * footer, support hub and sitemap.
 *
 * Only publish verified information. Store links are shown only when a
 * product's status is "available".
 */

export type ProductStatus = "available" | "coming-soon" | "in-development";

export const statusLabels: Record<ProductStatus, string> = {
  available: "Available",
  "coming-soon": "Coming soon",
  "in-development": "In development",
};

export type ProductCategory =
  | "AI experiences"
  | "Productivity"
  | "Utilities"
  | "Connected experiences";

/** Keys map to icons in components/products/ProductIcon.tsx. */
export type ProductIconKey = "olynk" | "sparkles" | "checklist" | "wrench";

export interface StoreLink {
  label: string;
  href: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string[];
  audience: string;
  category: ProductCategory;
  status: ProductStatus;
  icon: ProductIconKey;
  featured?: boolean;
  /** For available products: confirmed features only. For upcoming products: what is being explored. */
  features: string[];
  /** Leave empty until platforms are confirmed. */
  platforms: string[];
  /** Official store pages. Only rendered when status is "available". */
  storeLinks: StoreLink[];
  support?: { email?: string; url?: string };
  privacyPolicyUrl?: string;
  releaseNotesUrl?: string;
  faqs: ProductFaq[];
  /** Optional UI mock-up, always labelled as a preview. */
  preview?: "olynk";
}

export const products: Product[] = [
  {
    slug: "olynk",
    name: "Olynk",
    tagline: "A concept for messaging the people and devices around you.",
    shortDescription:
      "An early-stage concept exploring simple messaging between people and devices that are nearby.",
    fullDescription: [
      "Olynk is a product concept we are currently developing. The idea is simple: make it easier to start a conversation with people or devices that are physically close by, without needing to swap contact details first.",
      "It is not available yet, and its features, design and supported platforms are still being worked out. We will update this page as development progresses.",
    ],
    audience:
      "People who want a quick, low-friction way to connect with others nearby — for example in a shared space, at an event or around the home.",
    category: "Connected experiences",
    status: "in-development",
    icon: "olynk",
    featured: true,
    features: [
      "Discovering nearby people or devices that have chosen to be visible",
      "Sending short messages to someone close by",
      "Clear controls over when you can be discovered",
      "A calm, focused interface with nothing you don’t need",
    ],
    platforms: [],
    storeLinks: [],
    faqs: [
      {
        question: "Is Olynk available yet?",
        answer:
          "No. Olynk is in development and not yet available to download. We will not list it in any app store until it is ready.",
      },
      {
        question: "Which platforms will it support?",
        answer:
          "Supported platforms have not been confirmed yet. This page will be updated once they are decided.",
      },
      {
        question: "How can I hear when there is news?",
        answer:
          "Use the “Join updates” option to send us a short message. We will reply when there is meaningful news to share. We do not run a mailing list yet.",
      },
      {
        question: "Will the final app look like the preview?",
        answer:
          "Not necessarily. The preview on this page is a concept mock-up to illustrate the idea, not a screenshot of a finished app.",
      },
    ],
    preview: "olynk",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}
