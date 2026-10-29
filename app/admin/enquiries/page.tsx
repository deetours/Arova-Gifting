import type { Metadata } from "next";
import { AdminNav } from "@/components/admin-nav";
import Link from "next/link";
import { listEnquiries } from "@/lib/enquiries";

export const metadata: Metadata = { title: "Enquiry desk" };
export const dynamic = "force-dynamic";

export default function EnquiriesPage() {
  if (process.env.NODE_ENV === "production") return <main className="admin-locked"><span className="eyebrow">AROVA / INTERNAL OPERATIONS</span><h1>Enquiry records<br /><em>are not available.</em></h1><p>Connect the approved authentication and authorization provider before enabling the internal desk.</p></main>;
  const enquiries = listEnquiries();
  return <div className="admin-shell"><AdminNav /><Link className="text-link" href="/admin">← Operations desk</Link><header className="admin-subheading"><span className="eyebrow">01 / ENQUIRY PIPELINE</span><h1>The brief, <em>preserved.</em></h1><p>Review what the buyer sent, keep the request distinct from a quotation, and record the next internal status.</p></header><div className="dev-warning"><strong>Local development only</strong><span>Do not expose this route publicly. Production access stays closed until a proper identity provider is configured.</span></div>{enquiries.length ? <div className="enquiry-table enquiry-table--full"><div className="enquiry-table__head"><span>REFERENCE / COMPANY</span><span>CONTACT</span><span>OCCASION</span><span>QUANTITY</span><span>STATUS</span><span>DATE</span></div>{enquiries.map((item) => <Link className="enquiry-table__row enquiry-table__row--full" href={`/admin/enquiries/${encodeURIComponent(item.reference)}`} key={item.reference}><span><strong>{item.reference}</strong><small>{item.company}</small></span><span>{item.name}<small>{item.email}</small></span><span>{item.occasion.replaceAll("-", " ")}</span><span>{item.quantity.toLocaleString("en-IN")}</span><span><i className={`status-dot status-dot--${item.status}`} />{item.status}</span><span>{new Date(item.createdAt).toLocaleDateString("en-IN")}</span></Link>)}</div> : <div className="empty-admin"><span className="empty-mark">00</span><h3>The desk is clear.</h3><p>New quote requests will show here after they are saved.</p></div>}</div>;
}
