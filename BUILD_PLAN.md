# Corporate Gifting Solutions — Build, Safety & Delivery Plan

**Status:** Planning baseline · **Version:** 0.1  
**Companion:** [`Design.md`](./Design.md)  
**Authority:** User-provided Master Build Directive. This file defines a safe sequence for turning it into a production product; it does not assert that any proposed stack, integration, business rule, or capability is already present.

**Phase 0–2 work log:** See [`PHASE_0-2_DELIVERABLES.md`](./PHASE_0-2_DELIVERABLES.md) for the actual source inventory, project baseline, traceability register, workflows, route map, role matrix, domain model, risks, open decisions, and provisional design-system specification. Phase 0–2 planning is documented; source/business/brand decisions listed there remain open and must be resolved before implementation and visual sign-off.

**Current implementation status:** responsive storefront and all 23 core route templates exist, with a four-step quote brief, server-validated local development enquiry persistence, a minimal receipt DTO, activity-tracked local enquiry statuses, and development-only operations views. Customer account/order/artwork screens and unsupported operations are intentionally gated or show truthful empty states. TypeScript and production compilation have passed after the first slice; rerun them after later changes. This is not launch-ready: local data uses Node SQLite, production enquiry writes fail closed, internal routes are unavailable in production, and authentication, PostgreSQL, secure uploads, notifications, formal quote/order persistence and approved business data still need implementation.

## 1. Delivery contract

Build a coherent end-to-end product in small reviewable batches. Before a batch starts, write its scope, dependencies, data changes, user states, risks, and acceptance criteria. At batch end, report what changed, how it was checked, open issues, and the next dependency. Do not mark a capability done because a static screenshot looks complete.

### Source and decision hygiene

The pasted directive is the only source material available in this task. No additional proposal, pitch deck, design references, assets or existing code were inspected here. Phase 0 must inspect them if available. Preserve requirement wording and distinguish:

- **Explicit:** present in the directive.
- **Recommendation:** implementation advice derived from it.
- **Enhancement:** useful proposed scope beyond it.
- **Open decision:** business/technical choice needing an owner.
- **Deferred:** intentionally postponed.

Maintain a traceability register with ID, exact requirement, source section, problem, implementation, route/entity/workflow, priority, dependency, acceptance criteria, state, decision owner and notes. Record conflicts rather than silently resolving them.

## 2. Phases, gates and deliverables

Phase numbers follow the directive. A gate is a decision to proceed; it is not an automatic deployment approval.

### Phase 0 — Source audit and project reconnaissance

**Work:** inventory all source documents, repository structure, current routes/components/assets, package/dependency setup, runtime/deployment assumptions, existing data/backend, and current working-tree changes. Read supplied sources in full. Build traceability and open-decision registers. Identify conflict between proposed palette values and incomplete business facts.

**Deliver:** source inventory; current-state map; requirement register; risk/assumption list; unknowns with owner; plan adjusted to the actual repo.

**Gate:** business source and technical state are understood well enough to select a slice. Do not replace existing foundations before inspecting them.

### Phase 1 — Product architecture and workflow definition

**Work:** confirm initial launch audience/region, quote-only vs. direct purchase boundaries, buyer/staff roles, status definitions, quote-to-order lifecycle, data ownership, authorization boundaries, primary user journeys, and service-level language. Map all 23 templates and shared states.

**Deliver:** product brief; IA/route map; journey diagrams; workflow/state transition table; assumptions and decision log; domain glossary; draft acceptance criteria.

**Gate:** an enquiry, estimate, formal quote, acceptance, confirmed order, and delivery promise have distinct meanings and allowed transitions.

### Phase 2 — Art direction and design system

**Work:** collect genuine product imagery/content; test proposed palette and type with photography; define semantic tokens, type scale, grid, responsive rules, status language, components, form patterns, table patterns, accessibility, reduced motion and focus states.

**Deliver:** design principles; palette/type decisions; component inventory; responsive foundations; content/fact register; accessibility checklist; representative screens.

**Gate:** storefront, portal and operations share brand grammar but have their own information density and interaction patterns. Accent inconsistency resolved or explicitly remains unapproved.

### Phase 3 — Prototype and UX validation

**Work:** prototype Explorer, Decision-maker and Returning-buyer flows, including failure and success states. Test with representative HR/procurement users where possible. Include the staff route from enquiry through quote and handoff.

**Deliver:** annotated prototype; usability observations; severity-ranked issues; revised acceptance criteria; scope adjustments.

**Gate:** buyers can understand constraints, complete a quote brief and explain what happens next; staff can identify their next action without guessing.

### Phase 4 — Technical foundation

**Work:** adapt to the inspected repository. Recommended default: PostgreSQL and a server-backed application architecture with clear domain/service boundaries; choose framework and hosting only after repo inspection. Establish environment configuration, migrations, auth/authorization approach, logging, error handling, file storage, backup/restore approach, and CI/deploy workflow. Seed only visibly illustrative data.

**Deliver:** architecture decision record; domain schema; migration conventions; environment matrix; security baseline; observability; feature flags for unfinished areas.

**Gate:** local/staging environments are separated; secrets are not committed; data and access boundaries are demonstrable.

### Phase 5 — Public storefront

**Build:** home, collections/index/detail, product, occasion/solution, how we work, about, catalogue and contact templates. Dynamic data, real asset states, responsive layouts, search/filter where scoped, route metadata, error/empty states and consent-aware analytics.

**Gate:** no invented products or claims; links and CTAs work; content has an owner; all public facts are validated; mobile and keyboard paths are usable.

### Phase 6 — Kit builder and quotation engine

**Build:** guided brief steps, persistent summary, draft/context preservation, review, file upload, quote submission and receipt. Server validates all fields and derives pricing status. Create a durable enquiry record only after successful persistence; use idempotency/duplicate protection and retain draft on transient failure.

**Quote logic:** validate product/variant, quantity, MOQ, customization compatibility, supplier-cost completeness, packaging, freight/destination, tax, discount, margin authorization and requested date on the server. Use decimal-safe money values, configured currency/rounding, snapshot calculation inputs, pricing version and timestamp. Missing costs never equal zero. A frontend estimate is never authoritative.

**Gate:** exact brief is recoverable, quote is not an order, and no quote is represented as confirmed until authorized review and send action.

### Phase 7 — Internal operations application

**Build:** overview, enquiry pipeline, quote workspace, product/supplier management, order fulfilment, customer management and reports. Roles separate staff actions; internal costs/margins are never returned to public/customer views. Quote versions are immutable after sent; revised quote creates a new version. State transitions, notes, assignments, supplier deadlines, artwork versions and exceptions are audited.

**Gate:** staff can trace a customer submission to a quote and order; all meaningful transitions have an actor/time; reports show definitions and links to underlying records.

### Phase 8 — Customer portal

**Build:** authentication/recovery, account overview, quote history/detail, order detail, artwork approval and repeat-order request, subject to agreed access policy. Secure every record query server-side, including guesses/ID changes. Artwork action stores exact proof/version, user, timestamp and action; production cannot proceed from ambiguous or unrecorded approval.

**Gate:** cross-company access attempts fail safely; customer sees only released commercial terms; expired sessions and unauthorized routes have clear handling.

### Phase 9 — Payments and advanced commerce

**Prerequisites:** confirmed provider, tax/commercial terms, refund/reconciliation policy, product eligibility, order cancellation policy, payment status semantics and finance owner. Implement provider integration behind server verification and idempotent webhooks. Direct checkout only for validated products/rules; no trust in client totals or webhook payloads without signature verification.

**Gate:** quote/order/payment are distinct records; retries do not double-charge or double-create orders; finance can reconcile state. If prerequisites are absent, defer without degrading quote-led release.

### Phase 10 — Integrations and operational automation

**Work:** add only confirmed integrations. Use least privilege, scoped secrets, retries with backoff, idempotency, dead-letter/manual recovery, audit events and failure alerts. Notifications are generated from authoritative state changes, not optimistic UI. Keep manual fallback for supplier, email, catalogue, and fulfilment steps.

**Gate:** each integration has an owner, data map, failure runbook, privacy basis, and sandbox/test mode.

### Phase 11 — Quality assurance and hardening

**Coverage:** acceptance criteria for primary journeys; state-transition tests; server validation and authorization; quote snapshot/version integrity; upload failures and malicious file controls; keyboard/screen-reader and responsive checks; content truth; performance and error monitoring; backup/restore rehearsal; dependency/security review. Include negative tests for guessed IDs, cross-tenant data, stale quote versions, duplicate submission and invalid state transitions.

**Gate:** no unresolved critical/high-severity issue in payment, privacy, access, quotation integrity or production approval; all known limitations documented. This plan does not itself run tests.

### Phase 12 — Launch readiness

**Work:** verify production facts/content; role assignments; secrets, domains, TLS, backups, monitoring, alerts, incident contacts, data retention, operational playbooks, staff training, catalogue freshness, support/contact route, rollback plan, and release owner. Run a controlled launch with a clear manual fallback and review actual funnel/operations data.

**Gate:** accountable business and technical owners accept their responsibilities; launch checklist is signed; rollback and customer communication paths are ready.

## 3. Recommended delivery slices

1. **Slice A: real brief capture** — Phase 4 foundation, contact/quote request, server persistence, staff-readable enquiry, failure preservation.
2. **Slice B: discovery to brief** — storefront routes, real product/collection data, builder and context continuity.
3. **Slice C: staff quote lifecycle** — cost inputs, draft/review/send/versioning, accurate customer status.
4. **Slice D: order operations** — accepted quote conversion, controlled milestones, artwork evidence, fulfilment exceptions.
5. **Slice E: customer self-service** — secure account, quote/order views, explicit approvals.
6. **Slice F: commerce automation** — only after commercial and integration prerequisites are satisfied.

Deliver thin vertical slices rather than building all 23 screens as disconnected mocks. A slice should include UI, server/domain behavior, authorization, persistence, error states, and acceptance criteria.

## 4. Core domain and lifecycle

### Candidate entities

User; Role/Permission; Company; CompanyContact; Product; ProductVariant; Collection; Occasion/Solution; ProductCollection; Supplier; SupplierProduct; SupplierCostHistory; CustomizationMethod; PackagingOption; PricingRule; Enquiry; EnquiryActivity; SavedBrief; BriefItem; Quote; QuoteVersion/QuoteLine; QuoteApproval; Order; OrderLine; ArtworkProof/ArtworkDecision; SupplierPurchaseOrder; PaymentRecord; Shipment/DeliveryEvent; FileAsset; Notification; AuditEvent. Finalize normalization, retention and identifiers during Phase 1/4.

### State boundaries

Enquiry: received → qualifying → qualified / declined / closed.  
Quote: draft → review → approved-to-send → sent → accepted / rejected / expired / superseded.  
Order: confirmed → procurement → artwork approval (where needed) → production → quality check → packing → dispatched → delivered → complete; exceptions/cancellation have explicit policy.  
Artwork: draft → sent for review → approved / changes requested → superseded.  
Payment: pending → due → paid / failed / refunded / partially paid according to confirmed finance policy.

These are candidate labels, not universal forced sequences. Define role permissions, legal transitions, required fields, side effects, notification, audit event and recovery for each transition. Quote acceptance must not silently bypass order confirmation. Preserve immutable snapshots of sent/accepted quote terms and confirmed-order terms.

## 5. Safety, privacy and reliability controls

### Commercial integrity

- Clearly label estimates; don't expose unapproved totals or supplier cost/margin.
- Store quote calculation snapshot, cost source/version, currency, tax treatment and authorizing user.
- Historical quote/order values do not mutate when catalogue/supplier data changes.
- Show delivery as requested, estimated, confirmed or completed; never collapse these states.
- Do not send customer-facing quote or production instruction from an unapproved draft.

### Identity and authorization

- Use a maintained authentication provider or framework-supported secure implementation; no homegrown password scheme.
- Enforce least privilege and company/tenant scoping at the server/data layer for every query and mutation.
- Deny by default; verify object ownership and staff role on each action.
- Use secure, HTTP-only, same-site cookies or provider-recommended session design; protect state-changing requests from CSRF as applicable; rate-limit auth and public submissions.
- Keep secrets in environment/secret manager, rotate by owner, redact tokens/PII from logs, and separate development/staging/production credentials.
- Record meaningful changes in append-only audit history; restrict audit access and avoid storing unnecessary sensitive data.

### Upload and data handling

- Define allowed formats, maximum size, scan/quarantine process, random storage names, authorization, private storage and signed/short-lived access.
- Validate content server-side; do not trust filename, extension, MIME declaration or client-side checks alone.
- Restrict access to logos/artwork and customer contact details. Set retention/deletion policy and communicate it.
- Avoid embedding sensitive data in URLs, analytics events, error reports or public assets.

### Reliability and operations

- Handle duplicate submissions and webhook retries idempotently.
- Preserve user-entered data on errors; distinguish server-confirmed success from optimistic UI.
- Define retry and manual-recovery paths for supplier/email/payment integrations.
- Back up production data and rehearse restore; monitor failures, latency, queued work and delivery exceptions.
- Use safe database migrations with reviewed forward/rollback strategy. Do not run destructive production migrations without an explicit migration plan and owner.
- Separate environments and never seed illustrative data into production.

### Accessibility and performance

Use WCAG 2.2 AA as planned target; do not rely on color alone. Verify keyboard flow, focus, semantic structure, form errors, contrast, reduced motion, zoom and responsive behavior. Optimize genuine product images, use responsive sizes/lazy loading where appropriate, reserve layout space, and measure representative mobile performance before setting targets.

## 6. Testing and acceptance approach

Testing is part of future implementation phases; this planning request does not itself execute application tests. For each feature, write acceptance checks before coding. Prefer a layered approach: domain/unit coverage for calculations and transition rules; integration coverage for persistence/auth/upload/webhooks; end-to-end coverage for three buyer journeys and staff quote/order workflow; manual accessibility/usability checks. Use synthetic fixtures and non-production provider sandboxes. Never send real customer messages or trigger financial transactions from test runs.

### Release acceptance checklist

- Source requirements linked to implementation or explicitly deferred.
- Primary paths and shared states have acceptance criteria.
- Server-side validation, access control, data integrity and audit requirements verified.
- Quote state and order state clearly differ in interface and storage.
- No unsupported product claims, prices, testimonials, service promises, logos or metrics.
- Responsive, keyboard and assistive-technology checks completed.
- Failure paths retain context and expose actionable recovery.
- Logging/analytics privacy, retention, monitoring and incident ownership documented.
- Operational team can complete manual fallback for dependencies that fail.
- Release owner, rollback and customer support routes identified.

## 7. Open decisions register

Resolve with named owners; defaults below are planning safeguards, not facts.

| ID | Decision | Safe planning default | Needed by |
|---|---|---|---|
| D-01 | Which source documents/assets beyond pasted directive are authoritative? | Phase 0 inventory; no claims from unseen sources | Phase 0 |
| D-02 | Existing repository/runtime/hosting/backend? | Inspect first; do not replace blindly | Phase 0/4 |
| D-03 | Actual Bengaluru service area and expansion policy? | Configurable service-area data; no blanket promise | Phase 1/5 |
| D-04 | Product, photo, supplier, MOQ and lead-time data owners? | Publish only verified records | Phase 2/5 |
| D-05 | Brand accent (`#E45B36` vs `#241D19`) and font licenses/availability? | Keep proposed palette unlocked; contrast and photo review | Phase 2 |
| D-06 | Quote response target, validity, approval authority and terms? | No SLA or expiry until owner confirms | Phase 1/6 |
| D-07 | Pricing formula, INR/tax/rounding, freight, discount, margin policy? | Server-side, configurable, manual review where incomplete | Phase 1/6 |
| D-08 | Authentication and customer access model? | Secure provider; object-level access checks | Phase 4/8 |
| D-09 | File formats/limits, storage, retention, consent and malware scanning? | Private quarantine; define before enabling upload | Phase 4/6 |
| D-10 | Payment provider, milestone/refund policy, checkout eligibility? | Defer collection/checkout | Phase 9 |
| D-11 | Email/catalogue/CRM/supplier/shipping integrations? | Manual fallback; integrate only confirmed services | Phase 10 |
| D-12 | Privacy notice, analytics consent and retention obligations? | Minimize collection; obtain responsible review | Phase 4/12 |

## 8. Build batch template

```text
Batch / phase:
User problem and source requirement IDs:
In scope / out of scope:
Routes, roles and states:
Domain/API/schema changes:
Security/privacy/commercial risks:
Dependencies and decisions:
Acceptance criteria:
Verification performed and result:
Known limitations / manual fallback:
Rollback or recovery:
Owner and next dependency:
```

## 9. Definition of done

A batch is complete only when user-visible behavior, server/domain behavior, persistence, access control, error handling, instrumentation (when approved), responsive/accessibility behavior, and acceptance evidence agree. Documentation and traceability reflect the delivered behavior. Unknown business policy is surfaced as a decision or a safe manual review; it is never hidden in code or copy.
