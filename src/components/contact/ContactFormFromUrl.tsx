"use client";

import { useSearchParams } from "next/navigation";
import { getProduct } from "@/data/products";
import { enquiryTypes, type EnquiryType } from "@/lib/site";
import { ContactForm } from "./ContactForm";

/** Reads ?reason= and ?product= in the browser so /contact can stay a static page. */
export function ContactFormFromUrl() {
  const params = useSearchParams();
  const reason = params.get("reason");
  const product = params.get("product");
  const initialReason = enquiryTypes.some((t) => t.value === reason) ? (reason as EnquiryType) : undefined;
  const productName = product ? getProduct(product)?.name : undefined;
  return <ContactForm initialReason={initialReason} product={productName} />;
}
