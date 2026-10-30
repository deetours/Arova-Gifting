import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ObjectStudy, NoteBand } from "@/components/editorial";
import { collections } from "@/lib/catalogue";

type ProductConcept = { slug: string; name: string; collection: string; tone: string; description: string };
const concepts: ProductConcept[] = [
  { slug: "welcome-kit", name: "The Welcome Kit", collection: "WELCOME EDITION / 001", tone: "sand", description: "A concept direction for welcoming a new colleague. Contents, branding, packaging, minimum quantities, price and lead time are confirmed for each brief." },
  { slug: "branded-desk-set", name: "Branded Desk Set", collection: "BRANDED ESSENTIALS / 001", tone: "blue", description: "A concept direction for useful branded objects. Product selection and available branding methods require confirmation before quotation." },
  { slug: "executive-gift-set", name: "Executive Gift Set", collection: "EXECUTIVE OBJECTS / 001", tone: "wine", description: "A concept direction for client and leadership gifting. Exact items, packaging and availability are curated after we understand the requirement." },
  { slug: "seasonal-hamper", name: "Seasonal Hamper", collection: "SEASONAL HAMPERS / 001", tone: "olive", description: "A concept direction for seasonal gifting. Contents and sourcing depend on the event, quantity, destination and requested date." },
];

export function generateStaticParams() { return concepts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: concepts.find((item) => item.slug === slug)?.name ?? "Gift concept" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = concepts.find((item) => item.slug === slug);
  if (!product) notFound();
  const relatedSlug: Record<string, string> = { "welcome-kit": "welcome-editions", "branded-desk-set": "branded-essentials", "executive-gift-set": "executive-objects", "seasonal-hamper": "seasonal-hampers" };
  const collection = collections.find((item) => item.slug === relatedSlug[slug]);
  const productImage = `/images/home/concept-${product.slug}.webp`;
  return <div className="page-shell"><div className="product-detail"><div className="product-detail__gallery"><ObjectStudy number={product.collection.split("/").at(-1)?.trim() ?? "001"} tone={product.tone} imageSrc={productImage} imageAlt={`${product.name} gifting concept`} label="CONCEPT IMAGE · NOT VERIFIED INVENTORY" /><span className="eyebrow product-image-caption">CONCEPT IMAGE · NOT A PHOTOGRAPH OF AVAILABLE STOCK</span></div><div className="product-detail__info"><span className="eyebrow">{product.collection}</span><h1>{product.name}<br /><em>Made around your brief.</em></h1><p className="detail-lede">{product.description}</p><div className="product-facts"><div><span>CONTENTS</span><strong>Confirmed during quotation</strong></div><div><span>BRANDING</span><strong>Options to be confirmed</strong></div><div><span>QUANTITY</span><strong>Share your requirement</strong></div><div><span>DELIVERY</span><strong>Availability to be confirmed</strong></div></div><Link className="button button--dark" href={`/build-a-kit?product=${product.slug}`}>Request a tailored quote <span aria-hidden="true">↗</span></Link><p className="fine-print">No price or delivery date is confirmed until it appears in an approved quotation.</p></div></div><NoteBand>This is an illustrative product concept, not a verified product listing. Product contents, supplier, cost and availability have not yet been supplied.</NoteBand>{collection ? <Link className="text-link back-link" href={`/collections/${collection.slug}`}>← Explore {collection.name}</Link> : null}</div>;
}
