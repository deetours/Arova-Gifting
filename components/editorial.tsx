import Link from "next/link";
import Image from "next/image";
import type { Collection } from "@/lib/catalogue";

const collectionImages: Record<string, { src: string; alt: string }> = {
  "welcome-editions": { src: "/images/home/collection-welcome-edition.webp", alt: "Welcome edition corporate gift set" },
  "branded-essentials": { src: "/images/home/collection-branded-essentials.webp", alt: "Branded essentials gift collection" },
  "executive-objects": { src: "/images/home/collection-executive-objects.webp", alt: "Executive gift objects" },
  "seasonal-hampers": { src: "/images/home/collection-seasonal-hampers.webp", alt: "Seasonal corporate gift hamper" },
};

export function ObjectStudy({ number, tone = "sand", label = "DESIGN STUDY · CONCEPT IMAGE", imageSrc, imageAlt = "Corporate gifting collection photograph" }: { number: string; tone?: string; label?: string; imageSrc?: string; imageAlt?: string }) {
  return (
    <div className={`object-study object-study--${tone}`}>
      {imageSrc ? <Image className="object-study__image" src={imageSrc} alt={imageAlt} fill priority sizes="(max-width: 700px) 100vw, 50vw" /> : null}
      <div className="study-frame" aria-hidden="true"><span className="study-index">OBJECT STUDY / {number}</span>{!imageSrc && <div className="study-object"><div className="study-lid" /><div className="study-box"><span className="study-mark">a.</span></div><div className="study-ribbon" /></div>}<span className="study-caption">{label}</span></div>
    </div>
  );
}

export function CollectionTile({ collection, compact = false }: { collection: Collection; compact?: boolean }) {
  return (
    <Link className={`collection-tile collection-tile--${collection.tone}${compact ? " collection-tile--compact" : ""}`} href={`/collections/${collection.slug}`}>
      <div className="collection-tile__art">{collectionImages[collection.slug] && <Image src={collectionImages[collection.slug].src} alt={collectionImages[collection.slug].alt} fill sizes="(max-width: 700px) 50vw, 25vw" />}<span className="collection-tile__index">COLLECTION / {collection.index}</span><span className="collection-tile__arrow" aria-hidden="true">↗</span></div>
      <div className="collection-tile__copy"><span className="eyebrow">{collection.note}</span><h3>{collection.name}</h3><span className="text-link">Explore the direction <span aria-hidden="true">↗</span></span></div>
    </Link>
  );
}

export function SectionIntro({ index, eyebrow, title, copy, href, action }: { index: string; eyebrow: string; title: React.ReactNode; copy: string; href?: string; action?: string }) {
  return (
    <div className="section-intro">
      <div className="section-intro__label"><span className="eyebrow">{index} / {eyebrow}</span><i /></div>
      <div className="section-intro__body"><h2>{title}</h2><p>{copy}</p>{href && action ? <Link className="text-link" href={href}>{action} <span aria-hidden="true">↗</span></Link> : null}</div>
    </div>
  );
}

export function NoteBand({ children }: { children: React.ReactNode }) {
  return <aside className="note-band"><span className="note-band__mark" aria-hidden="true">i</span><p>{children}</p></aside>;
}
