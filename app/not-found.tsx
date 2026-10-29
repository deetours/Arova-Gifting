import Link from "next/link";

export default function NotFound() {
  return <section className="receipt-page not-found-page"><span className="eyebrow">AROVA / NOT FOUND</span><h1>This page took<br /><em>another turn.</em></h1><p className="receipt-lede">That page or reference could not be found. The details are kept private if the reference is not valid.</p><Link className="button button--dark" href="/">Return home <span aria-hidden="true">↗</span></Link></section>;
}
