import type { Metadata } from "next";
import { AdminNav } from "@/components/admin-nav";
import Link from "next/link";
import { listEnquiries } from "@/lib/enquiries";

export const metadata: Metadata = { title: "Customer records", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function AdminCustomersPage() {
  if (process.env.NODE_ENV === "production") return <main className="admin-locked"><span className="eyebrow">AROVA / CUSTOMERS</span><h1>Customer records<br /><em>are not available.</em></h1><p>Customer data is protected until staff authentication and access policy are connected.</p></main>;
  const contacts = listEnquiries();
  const companies = new Map<string, typeof contacts>();
  for (const enquiry of contacts) companies.set(enquiry.company, [...(companies.get(enquiry.company) ?? []), enquiry]);
  return <div className="admin-shell"><AdminNav /><Link className="text-link" href="/admin">← Operations desk</Link><header className="admin-subheading"><span className="eyebrow">03 / CUSTOMER RECORDS</span><h1>Companies and<br /><em>their briefs.</em></h1><p>This local view groups quote enquiries by the company name provided. It is not a verified company account or customer directory.</p></header><div className="dev-warning"><strong>Private development data</strong><span>Contact details in this route are not exposed in production.</span></div>{companies.size ? <div className="customer-list">{[...companies.entries()].map(([company, requests]) => <article key={company}><div><span className="eyebrow">COMPANY / {String(requests.length).padStart(2, "0")} REQUEST{requests.length === 1 ? "" : "S"}</span><h2>{company}</h2></div><div>{requests.map((request) => <Link className="customer-request" href={`/admin/enquiries/${encodeURIComponent(request.reference)}`} key={request.reference}><span>{request.reference}</span><span>{request.name} · {request.email}</span><span>{request.occasion.replaceAll("-", " ")}</span><span aria-hidden="true">↗</span></Link>)}</div></article>)}</div> : <div className="empty-admin"><span className="empty-mark">00</span><h3>No company records yet.</h3><p>Submitted enquiries will appear after local development submissions are saved.</p></div>}</div>;
}
