import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms that apply when you use the Ovelo website.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    id: "about",
    heading: "About these terms",
    body: (
      <p>
        These terms apply to your use of the Ovelo website. By using the site, you agree to them. Individual Ovelo
        products may have their own terms, which will be provided with those products.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    heading: "Acceptable use",
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>use the website in a way that breaks any law or regulation;</li>
          <li>try to gain unauthorised access to the website or the systems behind it;</li>
          <li>interfere with the website’s operation, for example by introducing malicious code or overloading it;</li>
          <li>use automated means to send spam through any contact route.</li>
        </ul>
      </>
    ),
  },
  {
    id: "ip",
    heading: "Intellectual property",
    body: (
      <p>
        The Ovelo name, logo, website design and content belong to Ovelo unless stated otherwise. You may view and
        share links to pages for personal, non-commercial purposes, but you may not copy, modify or reuse the content or
        branding without permission.
      </p>
    ),
  },
  {
    id: "product-information",
    heading: "Product information",
    body: (
      <p>
        We aim to describe our products accurately and label their status clearly. Products marked “Coming soon” or “In
        development” are not yet available, and their features, platforms and timing may change or may not be released.
        Concept previews are illustrations, not final designs.
      </p>
    ),
  },
  {
    id: "external-links",
    heading: "External links",
    body: (
      <p>
        The website may link to other sites, such as app stores. We are not responsible for the content, terms or
        privacy practices of those sites.
      </p>
    ),
  },
  {
    id: "disclaimer",
    heading: "Disclaimer",
    body: (
      <p>
        The website is provided “as is”. While we try to keep it accurate and available, we do not guarantee that it
        will always be complete, up to date, uninterrupted or error-free. To the extent permitted by law, we are not
        liable for losses arising from your use of the website. Nothing in these terms limits rights you have under
        applicable consumer law.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    body: (
      <p>
        We may update these terms from time to time. Changes take effect when published on this page, and the “Last
        updated” date above will change. Please check back occasionally.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact",
    body: (
      <p>
        Questions about these terms? Email <a href={`mailto:${site.email}`}>{site.email}</a> or use the{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro="The ground rules for using this website."
      updated={site.legalLastUpdated}
      sections={sections}
    />
  );
}
