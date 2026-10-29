import type { Metadata } from "next";
import { AdminNav } from "@/components/admin-nav";
import Link from "next/link";
import { collections } from "@/lib/catalogue";

export const metadata: Metadata = { title: "Catalogue management", robots: { index: false, follow: false } };

export default function AdminCataloguePage() {
  if (process.env.NODE_ENV === "production") return <main className="admin-locked"><span className="eyebrow">AROVA / CATALOGUE</span><h1>Catalogue management<br /><em>is not configured.</em></h1><p>Internal catalogue editing is disabled in production until staff authentication and verified data sources are in place.</p></main>;
  return <div className="admin-shell"><AdminNav /><Link className="text-link" href="/admin">← Operations desk</Link><header className="admin-subheading"><span className="eyebrow">02 / CATALOGUE MANAGEMENT</span><h1>Directions, not<br /><em>inventory.</em></h1><p>The current records are concept directions for design review. They are not publishable product listings.</p></header><div className="dev-warning"><strong>Local development only</strong><span>Supplier, pricing and availability records have not been provided.</span></div><div className="admin-catalogue-list">{collections.map((collection) => <article key={collection.slug}><div className={`catalogue-swatch catalogue-swatch--${collection.tone}`} /><div><span className="eyebrow">COLLECTION / {collection.index}</span><h2>{collection.name}</h2><p>{collection.description}</p></div><span className="pending-label">CONCEPT · UNPUBLISHED</span></article>)}</div></div>;
}
