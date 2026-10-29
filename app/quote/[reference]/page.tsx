import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEnquiryReceipt } from "@/lib/enquiries";
import { occasions } from "@/lib/catalogue";

export const metadata: Metadata = { title: "Brief received" };
export const dynamic = "force-dynamic";

export default async function QuoteResultPage({ params }: { params: Promise<{ reference: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { reference } = await params;
  if (!/^AR-\d{6}-[A-Z0-9_-]{12}$/i.test(reference)) notFound();
  const enquiry = getEnquiryReceipt(reference);
  if (!enquiry) notFound();
  const occasion = occasions.find((item) => item.slug === enquiry.occasion)?.label ?? "Corporate gifting";

  return <section className="receipt-page"><div className="receipt-stamp"><span>REQUEST RECEIVED</span><span>AROVA / {reference.slice(-4)}</span></div><span className="eyebrow">YOUR BRIEF IS WITH US</span><h1>Thank you.<br /><em>We have it.</em></h1><p className="receipt-lede">Your request has been saved. A member of the team can review the details and confirm what options are available.</p><div className="receipt-details"><div><span>REFERENCE</span><strong>{enquiry.reference}</strong></div><div><span>OCCASION</span><strong>{occasion}</strong></div><div><span>REQUEST STATUS</span><strong>{enquiry.status === "received" ? "Received · awaiting review" : enquiry.status}</strong></div></div><div className="receipt-notice"><strong>A request is not yet a quotation or order.</strong><p>Price, product availability and delivery date are confirmed only in an approved quotation. No response time has been promised here.</p></div><Link className="text-link" href="/">Return to Arova <span aria-hidden="true">↗</span></Link></section>;
}
