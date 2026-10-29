import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Account overview", robots: { index: false, follow: false } };

export default function AccountOverviewPage() {
  return <section className="account-gate"><span className="eyebrow">AROVA / CUSTOMER ACCOUNT</span><h1>Your gifting,<br /><em>in progress.</em></h1><p>Quote history, approvals and order progress will live here once customer authentication and authorized company access are connected.</p><div className="gate-panel"><strong>No customer account is connected.</strong><p>This page does not expose quote or order records. Sign-in and account access are still being configured.</p><Link className="text-link" href="/account/login">View sign-in information <span aria-hidden="true">↗</span></Link></div></section>;
}
