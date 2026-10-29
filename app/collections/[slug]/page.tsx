import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ObjectStudy, NoteBand } from "@/components/editorial";
import { collectionBySlug, collections } from "@/lib/catalogue";

export function generateStaticParams() { return collections.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = collectionBySlug(slug);
  return { title: collection?.name ?? "Collection" };
}

export default async function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collectionBySlug(slug);
  if (!collection) notFound();
  const productMap: Record<string, { slug: string; name: string }[]> = {
    "welcome-editions": [{ slug: "welcome-kit", name: "The Welcome Kit" }],
    "branded-essentials": [{ slug: "branded-desk-set", name: "Branded Desk Set" }],
    "executive-objects": [{ slug: "executive-gift-set", name: "Executive Gift Set" }],
    "seasonal-hampers": [{ slug: "seasonal-hamper", name: "Seasonal Hamper" }],
  };
  const concepts = productMap[slug] ?? [];
  return <div className="page-shell"><div className="detail-layout"><div><span className="eyebrow">COLLECTION / {collection.index} · OBJECTS OF APPRECIATION</span><h1>{collection.name}<br /><em>{collection.note}.</em></h1><p className="detail-lede">{collection.description}</p><Link className="button button--dark" href={`/build-a-kit?collection=${collection.slug}`}>Build a brief around this <span aria-hidden="true">↗</span></Link></div><ObjectStudy number={collection.index} tone={collection.tone} /></div><NoteBand>Concept imagery is used in this first build because verified product photography was not supplied. It does not represent current inventory or confirmed supplier capability.</NoteBand><div className="detail-footer"><span>GOOD FOR</span><p>{collection.occasions.join(" · ").replaceAll("-", " ")}</p></div>{concepts.length > 0 && <section className="related-section"><span className="eyebrow">OBJECT STUDY / CONCEPTS</span><h2>Ideas in this direction.</h2><div className="related-links">{concepts.map((product) => <Link href={`/products/${product.slug}`} key={product.slug}><span>CONCEPT / NOT VERIFIED INVENTORY</span><strong>{product.name}</strong><span aria-hidden="true">↗</span></Link>)}</div></section>}</div>;
}
