import type { Metadata } from "next";
import { BriefForm } from "@/components/brief-form";
import { collections, occasions } from "@/lib/catalogue";

export const metadata: Metadata = { title: "Build a gifting brief" };

export default async function BuildKitPage({ searchParams }: { searchParams: Promise<{ occasion?: string; product?: string; collection?: string }> }) {
  const search = await searchParams;
  const occasion = occasions.some((item) => item.slug === search.occasion) ? search.occasion : "";
  const product = ["welcome-kit", "branded-desk-set", "executive-gift-set", "seasonal-hamper"].includes(search.product ?? "") ? search.product : "";
  const collection = collections.find((item) => item.slug === search.collection);
  return <div className="page-shell page-shell--builder"><header className="page-heading page-heading--builder"><span className="eyebrow">AROVA / CORPORATE CONFIGURATOR</span><h1>Build your gifting<br /><em>brief.</em></h1><p>Start with your occasion, quantity and timing. We’ll help you shape the rest. This is a request for a quotation, not a confirmed order or price.</p></header><BriefForm initialOccasion={occasion} initialProduct={product} initialCollection={collection?.slug} /></div>;
}
