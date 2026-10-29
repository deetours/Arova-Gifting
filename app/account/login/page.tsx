import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign in", robots: { index: false, follow: false } };

export default function AccountLoginPage() {
  return <section className="account-gate"><span className="eyebrow">AROVA / CUSTOMER ACCOUNT</span><h1>Your orders,<br /><em>all in one place.</em></h1><p>Account access will be enabled after the secure sign-in provider and company-membership rules are configured.</p><div className="gate-panel"><strong>Sign-in is not available yet.</strong><p>Your quote request can still be submitted without an account. The team can follow up using the contact details you provide.</p><a className="button button--dark" href="/build-a-kit">Build a gifting brief <span aria-hidden="true">↗</span></a></div></section>;
}
