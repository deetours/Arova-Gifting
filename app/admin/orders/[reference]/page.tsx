import type { Metadata } from "next";
import { AdminNav } from "@/components/admin-nav";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEnquiry } from "@/lib/enquiries";

export const metadata: Metadata = { title: "Order fulfilment", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminOrderPage({ params }: { params: Promise<{ reference: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { reference } = await params;
  const enquiry = getEnquiry(reference);
  if (!enquiry) notFound();
  return <div className="admin-shell"><AdminNav /><Link className="text-link" href={`/admin/enquiries/${encodeURIComponent(reference)}`}>← Enquiry record</Link><header className="admin-subheading"><span className="eyebrow">ORDER DESK / {enquiry.reference}</span><h1>No order has<br /><em>been confirmed.</em></h1><p>{enquiry.company} · enquiry status: {enquiry.status}</p></header><div className="dev-warning"><strong>This is still an enquiry</strong><span>A confirmed order requires acceptance of an exact approved quote version and a distinct order confirmation.</span></div><div className="order-gate"><span className="eyebrow">FULFILMENT TIMELINE</span><ol>{["Procurement", "Artwork proof", "Production", "Quality check", "Packing", "Dispatch", "Delivery"].map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{step}</strong><small>Not started — no confirmed order</small></div></li>)}</ol></div></div>;
}
