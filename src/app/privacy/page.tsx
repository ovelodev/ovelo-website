import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How the Ovelo AI website handles information, including contact messages and technical data.",
  path: "/privacy",
});

// Keep this policy in step with the real implementation. If analytics, a form
// provider, embeds or cookies are added, update the relevant sections first.
const sections: LegalSection[] = [
  {
    id: "summary",
    heading: "Summary",
    body: (
      <>
        <p>
          This policy covers the Ovelo AI website. We keep data collection to a minimum: the website does not use
          analytics, advertising or tracking cookies, and does not include third-party embeds.
        </p>
        <p>
          Individual Ovelo AI apps may handle data differently. Where that applies, each app will have its own privacy
          policy, linked from its product page.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    heading: "Information we collect",
    body: (
      <>
        <p>
          <strong>Messages you send us.</strong> The contact form on this website does not send or store anything on
          our servers. It prepares an email in your own email app, which you then choose to send. When you email us,
          we receive your email address, your name if you include it, and whatever you write.
        </p>
        <p>
          <strong>Technical data.</strong> Like most websites, the service that hosts this site may automatically
          record standard technical information when pages are requested — such as IP address, browser type, the page
          requested, and the date and time. This is used to deliver the site and keep it secure.
        </p>
        <p>We do not ask for, and you should not send us, passwords, payment-card details or other sensitive data.</p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    heading: "How we use information",
    body: (
      <ul>
        <li>To read and reply to your message, and to follow up on support or feedback you’ve sent.</li>
        <li>To operate, maintain and protect the website, including preventing abuse.</li>
      </ul>
    ),
  },
  {
    id: "third-parties",
    heading: "Service providers",
    body: (
      <>
        <p>We use a small number of providers to run this website and handle email:</p>
        <ul>
          <li>
            <strong>GitHub Pages</strong> (GitHub, Inc.) hosts this website. It serves the pages you visit and may
            keep the technical logs described above. See the{" "}
            <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
              GitHub Privacy Statement
            </a>
            .
          </li>
          <li>
            <strong>Gmail</strong> (Google) stores and delivers the emails you send us. See the{" "}
            <a href="https://policies.google.com/privacy">Google Privacy Policy</a>.
          </li>
        </ul>
        <p>
          Fonts are served from this website directly, so loading a page does not contact external font services. We
          do not sell personal information.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    heading: "Cookies and analytics",
    body: (
      <p>
        This website does not set cookies for analytics, advertising or tracking, and does not use analytics tools. If
        that changes, we will update this policy before doing so and ask for consent where required.
      </p>
    ),
  },
  {
    id: "retention",
    heading: "Retention and deletion",
    body: (
      <p>
        We keep emails for as long as needed to deal with your enquiry and any reasonable follow-up, then delete them.
        Hosting logs are kept for the limited period set by our hosting provider. You can ask us to delete your
        messages at any time.
      </p>
    ),
  },
  {
    id: "your-rights",
    heading: "Your choices and rights",
    body: (
      <p>
        Depending on where you live, you may have the right to access, correct or delete personal information we hold
        about you, or to object to how it is used. To make a request, email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: (
      <p>
        We will update this page when our practices change and revise the “Last updated” date above. Significant
        changes will be highlighted on this page.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact",
    body: (
      <p>
        Questions about privacy? Email <a href={`mailto:${site.email}`}>{site.email}</a> or use the{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="What information this website handles, why, and the choices you have."
      updated={site.legalLastUpdated}
      sections={sections}
    />
  );
}
