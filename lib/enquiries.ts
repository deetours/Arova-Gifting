import "server-only";
import { randomBytes, randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

export type EnquiryInput = {
  idempotencyKey: string;
  name: string;
  email: string;
  company: string;
  occasion: string;
  quantity: number;
  budget: string;
  deliveryDate: string;
  message: string;
  consent: boolean;
};

export type Enquiry = EnquiryInput & {
  reference: string;
  status: "received" | "qualifying" | "closed";
  createdAt: string;
};

declare global {
  // Reuse the connection during Next.js development reloads.
  // eslint-disable-next-line no-var
  var __arovaDb: DatabaseSync | undefined;
}

function database() {
  if (globalThis.__arovaDb) return globalThis.__arovaDb;
  const databasePath = path.join(process.cwd(), ".data", "arova.sqlite");
  mkdirSync(path.dirname(databasePath), { recursive: true });
  const db = new DatabaseSync(databasePath);
  db.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");
  db.exec(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id TEXT PRIMARY KEY,
      reference TEXT NOT NULL UNIQUE,
      idempotency_key TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT NOT NULL,
      occasion TEXT NOT NULL,
      quantity INTEGER NOT NULL CHECK(quantity > 0),
      budget TEXT NOT NULL DEFAULT '',
      delivery_date TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL DEFAULT '',
      consent INTEGER NOT NULL DEFAULT 0 CHECK(consent IN (0, 1)),
      status TEXT NOT NULL DEFAULT 'received' CHECK(status IN ('received', 'qualifying', 'closed')),
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries(created_at DESC);
    CREATE TABLE IF NOT EXISTS enquiry_events (
      id TEXT PRIMARY KEY,
      enquiry_reference TEXT NOT NULL REFERENCES enquiries(reference),
      previous_status TEXT,
      next_status TEXT NOT NULL,
      actor TEXT NOT NULL,
      occurred_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS enquiry_events_reference_idx ON enquiry_events(enquiry_reference, occurred_at DESC);
  `);
  globalThis.__arovaDb = db;
  return db;
}

function asEnquiry(row: Record<string, unknown>): Enquiry {
  return {
    idempotencyKey: String(row.idempotency_key),
    reference: String(row.reference),
    name: String(row.name),
    email: String(row.email),
    company: String(row.company),
    occasion: String(row.occasion),
    quantity: Number(row.quantity),
    budget: String(row.budget),
    deliveryDate: String(row.delivery_date),
    message: String(row.message),
    consent: Number(row.consent) === 1,
    status: row.status as Enquiry["status"],
    createdAt: String(row.created_at),
  };
}

export function createEnquiry(input: EnquiryInput): Enquiry {
  const db = database();
  const existing = db.prepare("SELECT * FROM enquiries WHERE idempotency_key = ?").get(input.idempotencyKey) as Record<string, unknown> | undefined;
  if (existing) return asEnquiry(existing);

  const id = randomUUID();
  const datePart = new Date().toISOString().slice(2, 10).replaceAll("-", "");
  const suffix = randomBytes(9).toString("base64url").toUpperCase();
  const reference = `AR-${datePart}-${suffix}`;
  const createdAt = new Date().toISOString();
  db.exec("BEGIN IMMEDIATE");
  try {
  db.prepare(`
    INSERT INTO enquiries (
      id, reference, idempotency_key, name, email, company, occasion,
      quantity, budget, delivery_date, message, consent, status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'received', ?)
  `).run(
    id, reference, input.idempotencyKey, input.name, input.email, input.company,
    input.occasion, input.quantity, input.budget, input.deliveryDate, input.message, input.consent ? 1 : 0, createdAt,
  );
  db.prepare("INSERT INTO enquiry_events (id, enquiry_reference, previous_status, next_status, actor, occurred_at) VALUES (?, ?, NULL, 'received', 'public submission', ?)").run(randomUUID(), reference, createdAt);
  db.exec("COMMIT");
  return { ...input, reference, status: "received", createdAt };
  } catch (error) {
    db.exec("ROLLBACK");
    const duplicate = db.prepare("SELECT * FROM enquiries WHERE idempotency_key = ?").get(input.idempotencyKey) as Record<string, unknown> | undefined;
    if (duplicate) return asEnquiry(duplicate);
    throw error;
  }
}

export function listEnquiries(): Enquiry[] {
  const rows = database().prepare("SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 100").all() as Record<string, unknown>[];
  return rows.map(asEnquiry);
}

export function updateEnquiryStatus(reference: string, status: Enquiry["status"]) {
  const db = database();
  db.exec("BEGIN IMMEDIATE");
  try {
    const current = db.prepare("SELECT status FROM enquiries WHERE reference = ?").get(reference) as { status: Enquiry["status"] } | undefined;
    if (!current) { db.exec("ROLLBACK"); return false; }
    if (current.status === status) { db.exec("COMMIT"); return true; }
    db.prepare("UPDATE enquiries SET status = ? WHERE reference = ?").run(status, reference);
    db.prepare("INSERT INTO enquiry_events (id, enquiry_reference, previous_status, next_status, actor, occurred_at) VALUES (?, ?, ?, ?, 'local development operator', ?)").run(randomUUID(), reference, current.status, status, new Date().toISOString());
    db.exec("COMMIT");
    return true;
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

export function getEnquiry(reference: string): Enquiry | undefined {
  const row = database().prepare("SELECT * FROM enquiries WHERE reference = ?").get(reference) as Record<string, unknown> | undefined;
  return row ? asEnquiry(row) : undefined;
}

export function getEnquiryReceipt(reference: string): Pick<Enquiry, "reference" | "occasion" | "status" | "createdAt"> | undefined {
  const row = database().prepare("SELECT reference, occasion, status, created_at FROM enquiries WHERE reference = ?").get(reference) as Record<string, unknown> | undefined;
  if (!row) return undefined;
  return {
    reference: String(row.reference),
    occasion: String(row.occasion),
    status: row.status as Enquiry["status"],
    createdAt: String(row.created_at),
  };
}

export type EnquiryEvent = {
  previousStatus: string | null;
  nextStatus: string;
  actor: string;
  occurredAt: string;
};

export function listEnquiryEvents(reference: string): EnquiryEvent[] {
  const rows = database().prepare("SELECT previous_status, next_status, actor, occurred_at FROM enquiry_events WHERE enquiry_reference = ? ORDER BY occurred_at ASC").all(reference) as Record<string, unknown>[];
  return rows.map((row) => ({
    previousStatus: row.previous_status === null ? null : String(row.previous_status),
    nextStatus: String(row.next_status),
    actor: String(row.actor),
    occurredAt: String(row.occurred_at),
  }));
}
