import type { Metadata } from "next";
import { AdminNav } from "@/components/admin-nav";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEnquiry, listEnquiryEvents } from "@/lib/enquiries";
import { StatusControl } from "@/components/status-control";

export const metadata: Metadata = { title: "Enquiry record" };
export const dynamic = "force-dynamic";

export default async function EnquiryDetailPage({ params }: { params: Promise<{ reference: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { reference } = await params;
  const enquiry = getEnquiry(reference);
  if (!enquiry) notFound();
  const events = listEnquiryEvents(reference);
  return <div className="admin-shell"><AdminNav /><Link className="text-link" href="/admin/enquiries">← Enquiry desk</Link><header className="admin-subheading"><span className="eyebrow">ENQUIRY / {enquiry.reference}</span><h1>{enquiry.company}<br /><em>Gifting brief.</em></h1><p>Received {new Date(enquiry.createdAt).toLocaleString("en-IN")} · This is an enquiry, not a quotation or order.</p></header><div className="dev-warning"><strong>Local development record</strong><span>Private customer details shown in this development-only view.</span></div><div className="record-layout"><section className="record-main"><div className="record-panel"><span className="eyebrow">REQUEST DETAILS</span><dl className="record-list"><div><dt>Occasion</dt><dd>{enquiry.occasion.replaceAll("-", " ")}</dd></div><div><dt>Quantity</dt><dd>{enquiry.quantity.toLocaleString("en-IN")}</dd></div><div><dt>Budget range</dt><dd>{enquiry.budget || "Not decided"}</dd></div><div><dt>Target delivery</dt><dd>{enquiry.deliveryDate || "Not provided"}</dd></div><div><dt>Contact</dt><dd>{enquiry.name}<br /><a href={`mailto:${enquiry.email}`}>{enquiry.email}</a></dd></div><div><dt>Consent</dt><dd>{enquiry.consent ? "Contact about this request confirmed" : "Not recorded"}</dd></div><div className="record-list__wide"><dt>Brief notes</dt><dd>{enquiry.message || "No additional notes"}</dd></div></dl></div><div className="record-panel"><span className="eyebrow">ACTIVITY HISTORY</span><ol className="activity-list">{events.map((event, index) => <li key={`${event.occurredAt}-${index}`}><span className="activity-dot" /><div><strong>{event.previousStatus ? `${event.previousStatus} → ${event.nextStatus}` : `Enquiry ${event.nextStatus}`}</strong><small>{event.actor} · {new Date(event.occurredAt).toLocaleString("en-IN")}</small></div></li>)}</ol></div><div className="record-panel record-panel--pricing"><span className="eyebrow">QUOTE WORKSPACE / NOT READY</span><h2>Commercial terms need review.</h2><p>No supplier cost, customization cost, freight rule, tax treatment or approved margin schedule has been connected. Do not issue a price from this record.</p><span className="pending-label">AWAITING APPROVED COSTS</span></div></section><aside className="record-side"><div className="record-panel"><span className="eyebrow">INTERNAL STATUS</span><StatusControl reference={enquiry.reference} status={enquiry.status} /></div><div className="record-panel"><span className="eyebrow">NEXT SAFE ACTION</span><p>Confirm the product direction and supplier feasibility, then prepare a versioned quotation for authorized review.</p></div></aside></div></div>;
}
