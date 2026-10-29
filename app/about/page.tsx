import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About Arova" };

export default function AboutPage() {
  return <div className="page-shell"><header className="page-heading"><span className="eyebrow">AROVA / ABOUT</span><h1>A thoughtful object.<br /><em>A dependable process.</em></h1><p>Arova Gifting is being shaped around corporate gifting briefs: the people you are gifting, the moment you are marking and the operational details needed to fulfil it well.</p></header><div className="about-block"><span className="eyebrow">WHAT THIS EXPERIENCE IS DESIGNED TO DO</span><h2>Keep the gesture and the details together.</h2><p>Help teams explore an idea, share the constraints and understand what still needs to be confirmed. Product, supplier and fulfilment details are reviewed against each request before a formal quotation is sent.</p><p>Company history, team biographies, certifications, client relationships and sourcing claims will be added only when the business supplies and approves those facts.</p></div><div className="about-cta"><p>Have a gifting occasion in mind?</p><Link className="button button--dark" href="/build-a-kit">Build a brief <span aria-hidden="true">↗</span></Link></div></div>;
}
