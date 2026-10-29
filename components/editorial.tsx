import Link from "next/link";
import type { Collection } from "@/lib/catalogue";

export function ObjectStudy({ number, tone = "sand", label = "DESIGN STUDY · CONCEPT IMAGE" }: { number: string; tone?: string; label?: string }) {
  return (
    <div className={`object-study object-study--${tone}`} role="img" aria-label={`Abstract packaging illustration, design study ${number}`}>
      <div className="study-frame"><span className="study-index">OBJECT STUDY / {number}</span><div className="study-object"><div className="study-lid" /><div className="study-box"><span className="study-mark">a.</span></div><div className="study-ribbon" /></div><span className="study-caption">{label}</span></div>
    </div>
  );
}

export function CollectionTile({ collection, compact = false }: { collection: Collection; compact?: boolean }) {
  return (
    <Link className={`collection-tile collection-tile--${collection.tone}${compact ? " collection-tile--compact" : ""}`} href={`/collections/${collection.slug}`}>
      <div className="collection-tile__art"><span className="collection-tile__index">COLLECTION / {collection.index}</span><div className="tile-object"><span>{collection.index}</span></div><span className="collection-tile__arrow" aria-hidden="true">↗</span></div>
      <div className="collection-tile__copy"><span className="eyebrow">{collection.note}</span><h3>{collection.name}</h3><span className="text-link">Explore the direction <span aria-hidden="true">↗</span></span></div>
    </Link>
  );
}

export function SectionIntro({ index, eyebrow, title, copy, href, action }: { index: string; eyebrow: string; title: string; copy: string; href?: string; action?: string }) {
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
