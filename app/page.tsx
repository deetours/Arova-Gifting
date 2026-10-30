import Link from "next/link";
import { CollectionTile, ObjectStudy, SectionIntro } from "@/components/editorial";
import { collections, occasions } from "@/lib/catalogue";

export default function HomePage() {
  return (
    <>
      <section className="hero-shell">
        <div className="hero-copy">
          <span className="eyebrow hero-kicker"><span className="eyebrow-dot" /> OBJECTS OF APPRECIATION <span>·</span> BENGALURU / CORPORATE GIFTING</span>
          <h1>Corporate gifts,<br /><em>considered.</em></h1>
          <p className="hero-lede">Make the gesture matter.</p>
          <p className="hero-body">A thoughtful starting point for employee welcomes, client appreciation and the moments your team wants to remember.</p>
          <div className="hero-actions"><Link className="button button--dark" href="/build-a-kit">Build your gifting brief <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/collections">Explore collections <span aria-hidden="true">↓</span></Link></div>
          <div className="hero-foot"><span>FOR TEAMS, CLIENTS<br />AND COMPANY MILESTONES</span><span>01—04<br />CURATED DIRECTIONS</span></div>
        </div>
        <div className="hero-art"><ObjectStudy number="001" tone="sand" imageSrc="/images/home/hero-gifting-editorial.webp" imageAlt="Thoughtfully arranged corporate gifts" label="AROVA / CORPORATE GIFTING" /><span className="hero-art-note">A visual study, not a product listing</span></div>
        <div className="hero-side-index" aria-hidden="true">AROVA / 01</div>
      </section>

      <section className="collection-section section-pad" id="collections">
        <SectionIntro index="01" eyebrow="THE COLLECTION INDEX" title={"Start with the feeling.\nFind the right object."} copy="Four starting directions for a gifting brief. Final products, options and availability are confirmed around your quantity, budget and date." href="/collections" action="View all collections" />
        <div className="collection-grid">{collections.map((collection) => <CollectionTile key={collection.slug} collection={collection} />)}</div>
      </section>

      <section className="occasion-section">
        <div className="occasion-copy"><span className="eyebrow">02 / BEGIN WITH THE OCCASION</span><h2>Some days deserve<br /><em>a little more thought.</em></h2><p>Not sure which product to choose? Start with the moment. We’ll use your brief to understand what needs to be made possible.</p><Link className="text-link text-link--light" href="/solutions/new-joiners">Explore gifting occasions <span aria-hidden="true">↗</span></Link></div>
        <div className="occasion-list">{occasions.map((occasion) => <Link href={`/solutions/${occasion.slug}`} key={occasion.slug}><span>{occasion.number}</span><strong>{occasion.label}</strong><span aria-hidden="true">↗</span></Link>)}</div>
      </section>

      <section className="process-section section-pad">
        <SectionIntro index="03" eyebrow="A CLEARER WAY THROUGH" title={<>From first thought<br />to a gift, well made.</>} copy="A considered process keeps the details close: what you need, what can be sourced, what the quote includes and what has been approved." href="/how-we-work" action="See how we work" />
        <div className="process-ribbon"><div><span>01</span><strong>Curate</strong><p>Share the moment, people and constraints.</p></div><i aria-hidden="true">→</i><div><span>02</span><strong>Confirm</strong><p>Review the options, costs and delivery details.</p></div><i aria-hidden="true">→</i><div><span>03</span><strong>Make it yours</strong><p>Approve the specifications before production.</p></div><i aria-hidden="true">→</i><div><span>04</span><strong>Deliver</strong><p>Follow the agreed fulfilment plan.</p></div></div>
        <p className="fine-print">The exact sequence, lead time and delivery commitment depend on the confirmed order and supplier availability.</p>
      </section>

      <section className="brief-cta"><div><span className="eyebrow">YOUR IDEA CAN START HERE</span><h2>What are you hoping<br />to make someone <em>feel?</em></h2></div><div className="brief-cta__side"><p>Tell us a little about your quantity, occasion and timing. You can decide on the product details as you go.</p><Link className="button button--paper" href="/build-a-kit">Start a gifting brief <span aria-hidden="true">↗</span></Link><span className="fine-print fine-print--light">Submitting a brief is a request for a quotation, not an order.</span></div></section>
    </>
  );
}
