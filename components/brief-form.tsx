"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const occasionOptions = [
  ["new-joiners", "Welcome new joiners"],
  ["client-appreciation", "Client appreciation"],
  ["recognition", "Employee recognition"],
  ["festive-gifting", "Festive gifting"],
  ["milestones", "Company milestone"],
] as const;

const productOptions = [
  ["welcome-kit", "Welcome kit", "/images/home/concept-welcome-kit.webp"],
  ["branded-desk-set", "Branded desk set", "/images/home/concept-branded-desk-set.webp"],
  ["executive-gift-set", "Executive gift set", "/images/home/concept-executive-gift-set.webp"],
  ["seasonal-hamper", "Seasonal hamper", "/images/home/concept-seasonal-hamper.webp"],
] as const;

type FormState = {
  occasion: string;
  quantity: string;
  budget: string;
  deliveryDate: string;
  products: string[];
  branding: string;
  packaging: string;
  name: string;
  email: string;
  company: string;
  message: string;
  website: string;
  consent: boolean;
};

const initialState: FormState = {
  occasion: "", quantity: "", budget: "", deliveryDate: "", products: [], branding: "", packaging: "", name: "", email: "", company: "", message: "", website: "", consent: false,
};

export function BriefForm({ initialOccasion = "", initialProduct = "", initialCollection = "" }: { initialOccasion?: string; initialProduct?: string; initialCollection?: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(() => ({ ...initialState, occasion: initialOccasion, products: initialProduct ? [initialProduct] : [], collection: initialCollection }));
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function nextStep() {
    setError("");
    if (step === 1 && (!form.occasion || !form.quantity || Number(form.quantity) < 1)) {
      setError("Choose an occasion and enter a quantity to continue.");
      return;
    }
    if (step === 3 && (!form.name.trim() || !form.company.trim() || !form.email.trim())) {
      setError("Add your name, company and work email before continuing.");
      return;
    }
    setStep((current) => Math.min(4, current + 1));
  }

  async function submitBrief(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.website) return;
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idempotencyKey,
          name: form.name,
          email: form.email,
          company: form.company,
          occasion: form.occasion,
          quantity: Number(form.quantity),
          budget: form.budget,
          deliveryDate: form.deliveryDate,
          message: [
            form.products.length ? `Concepts: ${form.products.join(", ")}` : "Products: would like recommendations",
            form.collection ? `Collection direction: ${form.collection}` : "",
            form.branding ? `Branding: ${form.branding}` : "",
            form.packaging ? `Packaging: ${form.packaging}` : "",
            form.message.trim(),
          ].filter(Boolean).join("\n"),
          consent: form.consent,
          website: form.website,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "We could not save your brief. Please try again.");
      router.push(`/quote/${encodeURIComponent(result.reference)}`);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "We could not save your brief. Your entries are still here; please try again.");
      setSubmitting(false);
    }
  }

  function toggleProduct(value: string) {
    setForm((current) => ({ ...current, products: current.products.includes(value) ? current.products.filter((item) => item !== value) : [...current.products, value] }));
  }

  const currentLabel = ["The occasion", "The direction", "The details", "Review & send"][step - 1];

  return (
    <div className="builder-layout">
      <form className="builder-form" onSubmit={submitBrief} noValidate>
        <div className="builder-progress"><div><span className="eyebrow">STEP 0{step} / 04</span><span className="builder-progress__title">{currentLabel}</span></div><div className="progress-track" role="progressbar" aria-label="Brief progress" aria-valuemin={1} aria-valuemax={4} aria-valuenow={step}><span style={{ width: `${step * 25}%` }} /></div></div>

        {step === 1 && <section className="builder-step" aria-labelledby="step-title"><span className="eyebrow">FIRST, THE MOMENT</span><h2 id="step-title">What are you planning?</h2><p className="step-intro">A few starting details help shape useful options. You can change these before sending.</p><fieldset className="choice-fieldset"><legend>Choose an occasion</legend><div className="occasion-choices">{occasionOptions.map(([value, label], index) => <button type="button" key={value} className={`occasion-choice${form.occasion === value ? " is-selected" : ""}`} aria-pressed={form.occasion === value} onClick={() => update("occasion", value)}><span>0{index + 1}</span><strong>{label}</strong><i aria-hidden="true">↗</i></button>)}</div></fieldset><div className="form-grid"><label className="field"><span>How many people or kits?</span><input min="1" max="50000" type="number" inputMode="numeric" placeholder="e.g. 80" value={form.quantity} onChange={(event) => update("quantity", event.target.value)} /></label><label className="field"><span>Target delivery date <em>Optional</em></span><input type="date" value={form.deliveryDate} onChange={(event) => update("deliveryDate", event.target.value)} /></label><label className="field field--wide"><span>Budget per gift <em>Optional</em></span><select value={form.budget} onChange={(event) => update("budget", event.target.value)}><option value="">Not decided yet</option><option value="Under ₹1,000">Under ₹1,000</option><option value="₹1,000–₹2,000">₹1,000–₹2,000</option><option value="₹2,000–₹4,000">₹2,000–₹4,000</option><option value="₹4,000+">₹4,000+</option></select><small>This is a planning range, not a confirmed price.</small></label></div></section>}

        {step === 2 && <section className="builder-step" aria-labelledby="step-title"><span className="eyebrow">NOW, A DIRECTION</span><h2 id="step-title">What feels right?</h2><p className="step-intro">Select any ideas you like, or leave them open and ask for recommendations.</p><fieldset className="choice-fieldset"><legend>Possible gift directions <span>Choose any</span></legend><div className="product-choices">{productOptions.map(([value, label, image], index) => <label key={value} className={`product-choice product-choice--${index + 1}${form.products.includes(value) ? " is-selected" : ""}`}><input type="checkbox" checked={form.products.includes(value)} onChange={() => toggleProduct(value)} /><span className="product-choice__art"><Image src={image} alt="" fill sizes="(max-width: 700px) 45vw, 220px" /> <span className="sr-only">Image for {label}</span></span><strong>{label}</strong><span className="product-choice__check" aria-hidden="true">✓</span></label>)}</div></fieldset><div className="form-grid"><label className="field"><span>Branding</span><select value={form.branding} onChange={(event) => update("branding", event.target.value)}><option value="">Open to recommendations</option><option>Logo print or engraving</option><option>Branded inserts or artwork</option><option>No branding required</option></select></label><label className="field"><span>Packaging</span><select value={form.packaging} onChange={(event) => update("packaging", event.target.value)}><option value="">Open to recommendations</option><option>Practical standard packaging</option><option>Premium rigid gift box</option><option>Custom packaging discussion</option></select></label></div><p className="fine-print">These are briefing choices. Product availability, branding methods and packaging are confirmed after review.</p></section>}

        {step === 3 && <section className="builder-step" aria-labelledby="step-title"><span className="eyebrow">A PERSON TO FOLLOW UP WITH</span><h2 id="step-title">Where should we send the reply?</h2><p className="step-intro">Your contact details are used to respond to this gifting brief.</p><div className="form-grid"><label className="field"><span>Your name</span><input autoComplete="name" required value={form.name} onChange={(event) => update("name", event.target.value)} /></label><label className="field"><span>Work email</span><input autoComplete="email" type="email" required value={form.email} onChange={(event) => update("email", event.target.value)} /></label><label className="field field--wide"><span>Company</span><input autoComplete="organization" required value={form.company} onChange={(event) => update("company", event.target.value)} /></label><label className="field field--wide"><span>Anything else we should know? <em>Optional</em></span><textarea rows={4} maxLength={2000} value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="Destination, multiple office locations, or details that would help us understand the request." /></label></div><p className="fine-print">Please do not include sensitive personal information. Secure logo and artwork uploads will be added once private storage and review controls are configured.</p></section>}

        {step === 4 && <section className="builder-step" aria-labelledby="step-title"><span className="eyebrow">LAST LOOK</span><h2 id="step-title">Review your brief.</h2><p className="step-intro">This sends a request for a quotation. It does not confirm an order, final price or delivery date.</p><dl className="review-list"><div><dt>Occasion</dt><dd>{occasionOptions.find(([value]) => value === form.occasion)?.[1] ?? "Not selected"}</dd></div><div><dt>Quantity</dt><dd>{form.quantity || "Not provided"}</dd></div><div><dt>Budget</dt><dd>{form.budget || "Not decided"}</dd></div><div><dt>Target delivery</dt><dd>{form.deliveryDate || "Not decided"}</dd></div><div><dt>Direction</dt><dd>{form.products.length ? productOptions.filter(([value]) => form.products.includes(value)).map(([, label]) => label).join(", ") : "Recommendations requested"}</dd></div><div><dt>Branding / packaging</dt><dd>{[form.branding || "Open", form.packaging || "open"].join(" · ")}</dd></div><div><dt>Contact</dt><dd>{form.name} · {form.company} · {form.email}</dd></div></dl><label className="honeypot" aria-hidden="true">Leave this field empty<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => update("website", event.target.value)} /></label><label className="consent-check"><input type="checkbox" required checked={form.consent} onChange={(event) => update("consent", event.target.checked)} /><span>I agree to be contacted about this quote request. My details will be used to respond to this enquiry.</span></label></section>}

        {error && <p className="form-alert" role="alert">{error}</p>}
        <div className="builder-actions">{step > 1 ? <button className="button button--quiet" type="button" onClick={() => { setError(""); setStep((current) => current - 1); }}>← Back</button> : <span className="fine-print">No price or date is confirmed by submitting.</span>}{step < 4 ? <button className="button button--dark" type="button" onClick={nextStep}>Continue <span aria-hidden="true">→</span></button> : <button className="button button--dark" type="submit" disabled={submitting || !form.consent}>{submitting ? "Sending your brief…" : "Send quote request"} <span aria-hidden="true">↗</span></button>}</div>
      </form>
      <aside className="builder-summary"><span className="eyebrow">YOUR BRIEF / IN PROGRESS</span><h3>A useful starting point.</h3><p>Keep the important details together as you shape the request.</p><dl><div><dt>Occasion</dt><dd>{occasionOptions.find(([value]) => value === form.occasion)?.[1] ?? "Choose a moment"}</dd></div><div><dt>Quantity</dt><dd>{form.quantity || "Add a quantity"}</dd></div><div><dt>Budget</dt><dd>{form.budget || "Optional"}</dd></div><div><dt>Target date</dt><dd>{form.deliveryDate || "Optional"}</dd></div><div><dt>Ideas selected</dt><dd>{form.products.length || "Open to ideas"}</dd></div></dl><div className="summary-stamp"><span>QUOTE REQUEST</span><strong>NOT AN ORDER</strong></div></aside>
    </div>
  );
}
