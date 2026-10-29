import { NextResponse } from "next/server";
import { createEnquiry } from "@/lib/enquiries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedOccasions = new Set(["new-joiners", "client-appreciation", "recognition", "festive-gifting", "milestones"]);
const allowedBudgets = new Set(["", "Under ₹1,000", "₹1,000–₹2,000", "₹2,000–₹4,000", "₹4,000+"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  // Local SQLite storage is a development adapter only. Production stays
  // fail-closed until the approved Postgres service and retention controls exist.
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Quote requests are not available yet. Please contact the business directly." }, { status: 503 });
  }
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  if (request.headers.get("sec-fetch-site") === "cross-site") return NextResponse.json({ error: "Cross-site submissions are not accepted." }, { status: 403 });
  let body: Record<string, unknown>;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 16_000) return NextResponse.json({ error: "This request is too large." }, { status: 413 });
    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return NextResponse.json({ error: "The request must be an object." }, { status: 400 });
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "The request could not be read. Please try again." }, { status: 400 });
  }

  // Low-friction honeypot: bots that fill this field receive no persisted record.
  if (clean(body.website, 200)) return NextResponse.json({ reference: "", status: "received" }, { status: 201 });

  const idempotencyKey = clean(body.idempotencyKey, 80);
  const name = clean(body.name, 120);
  const email = clean(body.email, 254).toLowerCase();
  const company = clean(body.company, 160);
  const occasion = clean(body.occasion, 50);
  const quantity = Number(body.quantity);
  const budget = clean(body.budget, 40);
  const deliveryDate = clean(body.deliveryDate, 10);
  const message = clean(body.message, 3000);
  const consent = body.consent === true;

  if (!/^[\da-f-]{36}$/i.test(idempotencyKey)) return NextResponse.json({ error: "Please refresh the form and try again." }, { status: 400 });
  if (name.length < 2 || !emailPattern.test(email) || company.length < 2) return NextResponse.json({ error: "Check your name, company and email, then try again." }, { status: 400 });
  if (!allowedOccasions.has(occasion)) return NextResponse.json({ error: "Choose an occasion before sending your brief." }, { status: 400 });
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 50000) return NextResponse.json({ error: "Enter a quantity between 1 and 50,000." }, { status: 400 });
  if (!allowedBudgets.has(budget)) return NextResponse.json({ error: "Choose a listed budget range or leave it undecided." }, { status: 400 });
  if (deliveryDate && (!datePattern.test(deliveryDate) || Number.isNaN(Date.parse(`${deliveryDate}T00:00:00Z`)) || new Date(`${deliveryDate}T00:00:00Z`).toISOString().slice(0, 10) !== deliveryDate)) return NextResponse.json({ error: "Enter a valid delivery date." }, { status: 400 });
  if (!consent) return NextResponse.json({ error: "Please confirm that we may contact you about this request." }, { status: 400 });

  try {
    const enquiry = createEnquiry({ idempotencyKey, name, email, company, occasion, quantity, budget, deliveryDate, message, consent });
    return NextResponse.json({ reference: enquiry.reference, status: enquiry.status }, { status: 201 });
  } catch (error) {
    console.error("Enquiry submission failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "We couldn't save the brief just now. Your entries are still here; please try again." }, { status: 503 });
  }
}
