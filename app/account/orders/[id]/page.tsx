import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Order details", robots: { index: false, follow: false } };

export default async function AccountOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <section className="account-gate"><span className="eyebrow">AROVA / ORDER / {id.slice(0, 8)}</span><h1>Order details<br /><em>need a sign-in.</em></h1><p>Order information is private and can only be shown after the customer identity and company authorization checks are active.</p><div className="gate-panel"><strong>No order information is exposed here.</strong><p>A quote or enquiry does not become an order until an authorized acceptance and separate order confirmation are recorded.</p><Link className="text-link" href="/account/login">Sign-in information <span aria-hidden="true">↗</span></Link></div></section>;
}
