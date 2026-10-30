import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ObjectStudy } from "@/components/editorial";
import { collections, occasionBySlug, occasions } from "@/lib/catalogue";

export function generateStaticParams() { return occasions.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const occasion = occasionBySlug(slug);
  return { title: occasion?.short ?? "Gifting occasion" };
}

export default async function OccasionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const occasion = occasionBySlug(slug);
  if (!occasion) notFound();
  const related = collections.filter((collection) => collection.occasions.includes(slug));
  const occasionImage = slug === "new-joiners" ? "/images/home/occasion-new-employee-joining.webp" : undefined;
  return <div className="page-shell"><div className="detail-layout solution-layout"><div><span className="eyebrow">SOLUTION / {occasion.number} · {occasion.short.toUpperCase()}</span><h1>Start with<br /><em>the moment.</em></h1><p className="detail-lede">Gifting for {occasion.short.toLowerCase()} begins with the people, quantity, budget and date. Share what you know and keep the rest open for discussion.</p><Link className="button button--dark" href={`/build-a-kit?occasion=${occasion.slug}`}>Build a brief for this occasion <span aria-hidden="true">↗</span></Link></div><ObjectStudy number={occasion.number} tone={related[0]?.tone ?? "sand"} imageSrc={occasionImage} imageAlt={occasionImage ? "Welcome gift box with onboarding items for a new employee" : undefined} label={occasionImage ? "NEW EMPLOYEE WELCOME / CONCEPT" : undefined} /></div><section className="related-section"><span className="eyebrow">DIRECTIONS TO EXPLORE</span><h2>Begin with an idea.</h2><div className="related-links">{related.map((collection) => <Link href={`/collections/${collection.slug}`} key={collection.slug}><span>{collection.index} / COLLECTION</span><strong>{collection.name}</strong><span aria-hidden="true">↗</span></Link>)}</div></section><p className="fine-print">Concept directions only. Product availability, customization, minimum quantities, costs and delivery are confirmed against your actual brief.</p></div>;
}
