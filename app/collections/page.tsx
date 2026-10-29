import type { Metadata } from "next";
import { CollectionTile, SectionIntro } from "@/components/editorial";
import { collections } from "@/lib/catalogue";

export const metadata: Metadata = { title: "Collections" };

export default function CollectionsPage() {
  return <div className="page-shell"><header className="page-heading"><span className="eyebrow">AROVA / COLLECTION INDEX</span><h1>Different moments.<br /><em>Different objects.</em></h1><p>Explore a set of visual starting points for your corporate gifting brief. They are directions for discussion; exact products and availability are confirmed after we understand your requirements.</p></header><SectionIntro index="01" eyebrow="FOUR STARTING DIRECTIONS" title="Choose a place to begin." copy="A collection can support more than one occasion. Tell us what you have in mind and we can shape the brief together." /><div className="collection-grid collection-grid--page">{collections.map((collection) => <CollectionTile key={collection.slug} collection={collection} />)}</div></div>;
}
