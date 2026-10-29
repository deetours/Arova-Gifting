import type { Metadata } from "next";
import { AdminNav } from "@/components/admin-nav";
import Link from "next/link";

export const metadata: Metadata = { title: "Reporting", robots: { index: false, follow: false } };

const measures = [
  ["Enquiry to quote", "Qualified enquiries that receive a formal quote ÷ qualified enquiries", "Requires qualification and quote event records"],
  ["Quote acceptance", "Accepted quote versions ÷ sent quote versions", "Requires versioned sent and accepted states"],
  ["Quote turnaround", "Elapsed time from enquiry receipt to formal quote send", "Requires reliable timestamps and pause rules"],
  ["Fulfilment reliability", "Orders delivered by confirmed date ÷ orders due in period", "Requires confirmed dates and delivery events"],
  ["Repeat order rate", "Companies with another confirmed order ÷ companies with an order", "Requires company identity and order history"],
];

export default function AdminReportsPage() {
  if (process.env.NODE_ENV === "production") return <main className="admin-locked"><span className="eyebrow">AROVA / REPORTS</span><h1>Reporting is<br /><em>not configured.</em></h1><p>Metrics are disabled until operational data definitions and staff access controls are approved.</p></main>;
  return <div className="admin-shell"><AdminNav /><Link className="text-link" href="/admin">← Operations desk</Link><header className="admin-subheading"><span className="eyebrow">04 / REPORTING</span><h1>Measure what<br /><em>the data can support.</em></h1><p>These are metric definitions to review, not current performance figures.</p></header><div className="dev-warning"><strong>No business metrics are shown</strong><span>There is not enough verified operating data for honest performance reporting.</span></div><div className="metric-definitions">{measures.map(([name, definition, dependency]) => <article key={name}><span className="eyebrow">PROPOSED MEASURE</span><h2>{name}</h2><p>{definition}</p><small>{dependency}</small></article>)}</div></div>;
}
