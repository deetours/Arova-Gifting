import type { Metadata } from "next";
import { BriefForm } from "@/components/brief-form";

export const metadata: Metadata = { title: "Request a quotation" };

export default function QuoteRequestPage() {
  return <div className="page-shell page-shell--builder"><header className="page-heading page-heading--builder"><span className="eyebrow">AROVA / QUOTE REQUEST</span><h1>Tell us what<br /><em>you need.</em></h1><p>Share the essentials. Your request will be reviewed before any formal quotation is sent.</p></header><BriefForm /></div>;
}
