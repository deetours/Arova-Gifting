import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "How we work" };

const steps = [
  ["01", "Share the brief", "Tell us about the occasion, quantity, budget, target date and destination. If you do not know a detail yet, leave it open."],
  ["02", "Curate and check", "The request is reviewed against product options, customization requirements and what needs supplier confirmation."],
  ["03", "Review a quotation", "A formal quote, when ready, sets out the agreed products, price, assumptions, validity and delivery details for your approval."],
  ["04", "Approve the details", "Where customization applies, the exact proof and specifications are reviewed before production proceeds."],
  ["05", "Fulfil the order", "Procurement, production, quality checks, packing and delivery follow the confirmed order plan."],
];

export default function HowWeWorkPage() {
  return <div className="page-shell"><header className="page-heading"><span className="eyebrow">AROVA / HOW WE WORK</span><h1>Good gifting starts<br /><em>with a clear process.</em></h1><p>From first thought to final handoff, the important details stay visible: what is known, what needs confirmation and what you are being asked to approve.</p></header><div className="steps-list">{steps.map(([number, title, copy]) => <article className="steps-row" key={number}><span className="steps-row__number">{number}</span><h2>{title}</h2><p>{copy}</p></article>)}</div><div className="full-note"><span className="eyebrow">A NOTE ON DATES AND PRICING</span><p>Submitting a brief is not a confirmed booking. Product availability, supplier costs, customization feasibility, taxes and delivery are checked before a formal quotation is issued. Any delivery commitment is confirmed in the approved quote or order.</p><Link className="button button--dark" href="/build-a-kit">Start your brief <span aria-hidden="true">↗</span></Link></div></div>;
}
