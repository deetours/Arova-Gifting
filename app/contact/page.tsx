import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <div className="page-shell contact-page"><span className="eyebrow">AROVA / CONTACT</span><h1>Tell us what<br /><em>you have in mind.</em></h1><p className="detail-lede">The quickest way to give us useful context is the gifting brief. It asks only for the details needed to understand your request.</p><div className="contact-card"><span className="eyebrow">START WITH THE ESSENTIALS</span><p>Occasion · quantity · budget (if known) · target date · your contact details.</p><Link className="button button--dark" href="/build-a-kit">Build your gifting brief <span aria-hidden="true">↗</span></Link></div><p className="fine-print">Direct phone, email and business-hour details will be added after the business confirms the correct contact channels.</p></div>;
}
