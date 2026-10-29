import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Artwork approval", robots: { index: false, follow: false } };

export default async function ArtworkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <section className="account-gate"><span className="eyebrow">AROVA / ORDER / {id.slice(0, 8)} / ARTWORK</span><h1>A proof should be<br /><em>clear to approve.</em></h1><p>No artwork is available for this order. Proof review will be enabled only when a versioned artwork asset and authorized customer identity are present.</p><div className="gate-panel"><strong>Nothing is awaiting approval.</strong><p>Production cannot proceed from an unrecorded or ambiguous proof approval.</p><Link className="text-link" href="/account">Return to account overview <span aria-hidden="true">↗</span></Link></div></section>;
}
