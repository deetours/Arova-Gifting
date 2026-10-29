import type { Metadata } from "next";
import { AdminNav } from "@/components/admin-nav";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEnquiry } from "@/lib/enquiries";

export const metadata: Metadata = { title: "Quote workspace", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function QuoteWorkspacePage({ params }: { params: Promise<{ reference: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { reference } = await params;
  const enquiry = getEnquiry(reference);
  if (!enquiry) notFound();
  return <div className="admin-shell"><AdminNav /><Link className="text-link" href={`/admin/enquiries/${encodeURIComponent(reference)}`}>← Enquiry record</Link><header className="admin-subheading"><span className="eyebrow">QUOTE WORKSPACE / {enquiry.reference}</span><h1>Prepare only what<br /><em>can be confirmed.</em></h1><p>Customer request from {enquiry.company}. This enquiry has not yet become a formal quote.</p></header><div className="dev-warning"><strong>Draft quote creation is gated</strong><span>No approved supplier cost, margin, freight or tax policy is connected.</span></div><div className="quote-input-review"><div><span className="eyebrow">REQUIREMENT</span><strong>{enquiry.quantity.toLocaleString("en-IN")} requested</strong><p>{enquiry.occasion.replaceAll("-", " ")} · Budget {enquiry.budget || "not decided"}</p></div><div><span className="eyebrow">COST BASIS</span><strong>Awaiting verified inputs</strong><p>Product and variant, supplier cost, customization, packaging, freight, tax and approved pricing rules must be recorded before any formal price is prepared.</p></div><div><span className="eyebrow">CUSTOMER STATE</span><strong>Enquiry received</strong><p>Do not communicate a price as confirmed and do not create an order from this record.</p></div></div></div>;
}
