import type { Metadata } from "next";
import Link from "next/link";
import { NoteBand } from "@/components/editorial";

export const metadata: Metadata = { title: "Digital catalogue" };

export default function CataloguePage() {
  return <div className="page-shell catalogue-page"><span className="eyebrow">AROVA / DIGITAL CATALOGUE</span><h1>A catalogue that is<br /><em>worth sharing.</em></h1><p className="detail-lede">The product catalogue is being prepared from verified item details and photography. A downloadable catalogue will appear here once that material is approved.</p><div className="catalogue-placeholder"><span>CATALOGUE / IN PREPARATION</span><strong>Product facts before product pages.</strong><p>No products, prices or supplier capabilities are listed as confirmed in this first build.</p></div><NoteBand>Need a tailored direction now? Start a brief and share your occasion, quantity and target date. This request does not confirm availability.</NoteBand><Link className="button button--dark" href="/build-a-kit">Start a gifting brief <span aria-hidden="true">↗</span></Link></div>;
}
