import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Arova Gifting home">
        <span className="wordmark__name">arova<span>.</span></span>
        <span className="wordmark__descriptor">CORPORATE GIFTING</span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        <Link href="/collections">Collections</Link>
        <Link href="/solutions/new-joiners">Occasions</Link>
        <Link href="/how-we-work">How we work</Link>
        <Link href="/about">About</Link>
      </nav>
      <Link className="header-cta" href="/build-a-kit">Build your brief <span aria-hidden="true">↗</span></Link>
      <details className="mobile-nav">
        <summary aria-label="Open navigation"><span /><span /></summary>
        <nav aria-label="Mobile navigation">
          <Link href="/collections">Collections</Link>
          <Link href="/solutions/new-joiners">Occasions</Link>
          <Link href="/how-we-work">How we work</Link>
          <Link href="/about">About</Link>
          <Link href="/build-a-kit">Build your brief ↗</Link>
        </nav>
      </details>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link className="wordmark wordmark--footer" href="/">
            <span className="wordmark__name">arova<span>.</span></span>
            <span className="wordmark__descriptor">CORPORATE GIFTING</span>
          </Link>
          <p>Thoughtful objects. A clear process.<br />A gifting brief made around your team.</p>
        </div>
        <div className="footer-links"><span className="eyebrow">EXPLORE</span><Link href="/collections">Collections</Link><Link href="/how-we-work">How we work</Link><Link href="/catalogue">Catalogue</Link></div>
        <div className="footer-links"><span className="eyebrow">START HERE</span><Link href="/build-a-kit">Build a brief</Link><Link href="/contact">Contact</Link></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Arova Gifting</span><span>Availability, pricing and delivery are confirmed for each brief.</span><Link href="/admin">Operations</Link></div>
    </footer>
  );
}
