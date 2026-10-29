# Corporate Gifting Solutions — Product & Design Plan

**Status:** Planning baseline · **Version:** 0.1 · **Source:** User-provided Master Build Directive  
**Purpose:** Make the intended product, customer experience, visual language, and phase outcomes reviewable before implementation.

**Phase 0–2 findings and detailed decisions:** [`PHASE_0-2_DELIVERABLES.md`](./PHASE_0-2_DELIVERABLES.md). This design direction remains provisional because actual product photography, brand assets and referenced business source documents were not available in the inspected project.

**Current implementation:** the first responsive storefront and quote-brief experience are in place. Product art is CSS concept illustration and local system font stacks are used until real product imagery, approved fonts/licenses and brand decisions are supplied. Implementation limits are listed in [`README.md`](./README.md).

> This is a plan, not evidence that the listed capabilities, products, suppliers, prices, service levels, or integrations currently exist. Validate business facts before publishing them. Treat the accent, typeface, information architecture, and technical decisions marked *proposed* as hypotheses until reviewed.

## 1. Product in one sentence

Corporate Gifting Solutions connects a corporate buyer's gifting brief to a reliable operating process for discovering products, configuring customization, receiving a reviewed quotation, approving the order and artwork, and following fulfilment. It comprises a public storefront, a customer relationship portal, and an internal operations application backed by one shared domain model.

### Outcomes

- Buyers can find an appropriate gifting route without needing to know the supplier or production process.
- A buyer can express quantity, budget, occasion, deadline, branding and delivery constraints once and retain that context through the quote process.
- Staff can qualify the request, obtain real costs, prepare versioned quotes, and manage approvals and fulfilment without losing the original brief.
- Every external promise reflects confirmed business data. An enquiry is not a quote; an estimate is not a confirmed price; a quote is not an order; a target date is not a delivery guarantee.

### Audiences and needs

| Audience | Job to be done | Primary concern |
|---|---|---|
| HR / people operations | Welcome employees and recognize teams | Quantity, budget, deadline, recipient experience |
| Startup founder / office manager | Find a practical, low-friction gifting solution | Clear choices, minimums, response expectations |
| Procurement | Compare and approve a defensible purchase | Specifications, commercial terms, documentation |
| Marketing | Create branded gifts or client appreciation | Brand application, proof, consistency |
| Agency / coordinator | Coordinate a client's gifting order | Shareable brief, status, multiple stakeholders |

Initial focus: Bengaluru and its corporate ecosystem. Represent location and serviceability as configurable business data so expansion does not require page or code rewrites.

## 2. Product boundaries and release intent

### Release 1 — Complete buying experience and staff workflow

Public discovery, dynamic collection/product pages, occasion pages, kit builder, catalogue/contact, quote submission, quote status/detail as operationally supported, internal enquiry/quote/order workflows, and responsive/error/accessibility states. Manual operations are acceptable behind a coherent interface when disclosed honestly.

### Release 2 — Customer relationship layer

Customer identity and account access, quote history/versioning, artwork proof review, order progress, payment records, repeat-order requests. Build only after ownership, permissions, and real status semantics are agreed.

### Release 3 — Advanced commerce and automation

Instant pricing and checkout for products with verified data, account pricing, payment integration, supplier/fulfilment automation, and advanced reporting. Activate only when product availability, costs, taxes, fulfilment constraints, and support processes are trustworthy.

### Explicitly out of early release

Unverified instant prices, unconditional delivery promises, automated supplier commitments, unreviewed artwork-to-production handoff, and payment collection before the business confirms terms/provider. Do not represent proposed enhancements as current capabilities.

## 3. End-to-end experience principles

1. **Preserve context:** occasion, products, quantities, budget, target date, branding, packaging, destination and uploaded assets follow the brief into the quote request and staff workspace.
2. **Progressive disclosure:** ask only what is needed at the current step; let buyers move back without losing their work.
3. **Show commercial truth:** state whether pricing is indicative, pending supplier costs, under review, formally quoted, accepted, or expired.
4. **Make the next action obvious:** every status has an owner, an explanation, and a useful next step.
5. **No false success:** show confirmation only after the server confirms persistence; preserve entered content on failure.
6. **Real content first:** use actual product images/specifications and approved business facts. Label illustrative data unmistakably in internal previews.
7. **One identity, three interaction modes:** storefront is editorial and exploratory; portal is calm and precise; operations is compact and task-focused.

## 4. Primary journeys

### A. Explorer — discover and request

Homepage → collection or occasion → filter/browse → product details and constraints → configure product or start kit → review brief → submit quote request → receive a reference and next-step explanation → track quote where that capability exists.

**Success:** the buyer understands the product and its customization/availability caveats, submits a complete-enough brief, and can tell what happens next.

### B. Decision-maker — turn constraints into a brief

Kit builder → quantity → budget → target delivery date → products or curation request → branding → packaging → destination → summary and feasibility notes → company/contact details → consent and relevant files → submit.

Keep a desktop summary visible and a mobile summary accessible and collapsible. Flag minimum quantities, lead-time or compatibility concerns as guidance, not a silent rejection. Never fabricate availability or calculate a confirmed price in the browser.

### C. Returning buyer — approve and repeat

Secure sign-in or secure quote access → quote/order overview → inspect version and terms → accept/reject/request clarification as authorized → confirm artwork version and action → follow milestones → request repeat order. Enforce company and record permissions on the server.

### D. Staff — qualify, quote and fulfil

Enquiry queue → inspect preserved source brief → qualify and assign → obtain supplier costs → prepare versioned quote snapshot → authorized review → send → record customer decision → create confirmed order → procurement/artwork/production/quality/packing/dispatch/delivery milestones → resolve exception and record history.

## 5. Information architecture — 23 core templates

### Public storefront

1. `/` Home — brand promise, use-case routes, curated real products, process and quote CTA.
2. `/collections` Collection index — useful categories and filters.
3. `/collections/[slug]` Collection detail — editorial intro, product grid, filters/sort and related occasions.
4. `/products/[slug]` Product detail — images, specifications, options, branding/packaging, minimum/lead-time caveats, quote CTA.
5. `/solutions/[slug]` Occasion solution — need, curation, constraints and relevant collections.
6. `/build-a-kit` Guided builder — brief configuration and persistent summary.
7. `/how-we-work` Explain brief → quote → approval → sourcing/production → delivery; only verified service commitments.
8. `/about` Real business, capabilities and team only where verified.
9. `/catalogue` Dated/shareable catalogue with clear download and tailored-catalogue rationale.
10. `/contact` Short form and confirmed contact channels; attach builder context with consent.

### Customer portal

11. `/quote/request` Review/edit brief, company/contact, delivery, consent and file uploads.
12. `/quote/[id]` Quote/enquiry record, version, status, terms, assumptions, expiry and next action.
13. `/account/login` Sign-in and account recovery.
14. `/account` Action-first overview: quote replies, approvals, upcoming orders, required actions.
15. `/account/orders/[id]` Confirmed items, agreed specifications/price, payment record and fulfilment timeline.
16. `/account/orders/[id]/artwork` Exact proof version, accessible preview, approve/request changes, audit trail.

### Internal operations

17. `/admin` Actionable operational overview; metrics link to records.
18. `/admin/enquiries` Search/filter, owner, source, deadline, budget, quantity, next action and history.
19. `/admin/quotes/[id]` Cost-backed quote workspace, internal/customer notes, review/send and immutable version history.
20. `/admin/catalogue` Product, variant, collection, supplier, costs, lead times, customization and publication management.
21. `/admin/orders/[id]` Controlled fulfilment with milestones, supplier orders, proof versions and exceptions.
22. `/admin/customers` Company, contacts, orders, preferences, communication and access controls.
23. `/admin/reports` Defined queries and reporting periods using trustworthy data only.

Shared states across templates: loading, empty, validation failure, failed request, success, not found, unauthorized, expired session, unsaved changes, upload failure, permission restriction, quote expiry, cancellation/closure, duplicate-submit prevention, and confirmation for irreversible workflow actions.

## 6. Page experience and content requirements

### Home and discovery

Open with a specific, approved brand proposition and one clear primary action (start a brief / explore collections). Show the breadth of gifting occasions and product families without flattening them into identical cards. Each product tile answers: what is it, who/what is it for, what is known about customization, and what action follows. Search/filter empty states help the buyer reformulate.

### Product detail

Use real gallery imagery with useful crop/zoom behavior, meaningful alt text, variant selection, dimensions/materials/contents, customization and packaging methods, verified minimum quantities/lead times, availability caveat, and related use cases. When a fact is unknown, say it requires confirmation instead of omitting a constraint or inventing it.

### Kit builder

Use clear steps, save/preserve draft as supported, back navigation, input guidance and feasibility feedback. Ask occasion and date early because these may change what is possible. Allow “recommend options” instead of forcing product decisions. Keep selected quantities, options and budget visible. Review confirms the exact brief that will be sent.

### Quote result and customer actions

Use plain labels: “Request received,” “Quote being prepared,” “Indicative estimate,” “Formal quotation,” “Accepted,” “Expired.” Show quote reference, version, assumptions, missing information, expiry if applicable, and next action. The request receipt must not imply acceptance or an order.

### Operations UX

Optimize for scanning, keyboard use and high-frequency actions. Show priority and next action in tables. Keep supplier costs/margins private. Require deliberate transition actions for sending quotes, accepting customer decisions, starting production after artwork approval, and recording fulfilment exceptions. Preserve audit history.

## 7. Creative direction — “The Objects of Appreciation”

Treat the site as a contemporary design journal joined to a curated catalogue and a dependable corporate commerce tool. Photography explains the object (material, finish, packaging, proportions, branding); content explains the gesture (welcome, appreciation, milestone); interface explains the operation (quantity, cost status, deadline, approval, delivery).

### Visual language

- Proposed palette: Oxblood `#641F32`, Chalk `#F3EFE7`, Mineral `#9DB8C7`, Graphite `#242422`, Paper White `#FFFFFF`, restrained Persimmon `#E45B36`.
- Source inconsistency: an alternate dark accent `#241D19` appears in the pasted material, and Persimmon is described inconsistently. Do not lock either until source owner approves and contrast/use tests pass.
- Proposed ratio for exploration, not a mandate: Chalk 55%, White 20%, Graphite 15%, Oxblood 8%, Mineral/action accent combined 2%.
- Proposed type: Cormorant Garamond Medium for a limited editorial headline role; Manrope for body and interface. Test Instrument Serif + Manrope if product photography conflicts with the serif.
- 12-column desktop / 4-column mobile foundation; max content width about 1,360 px; responsive margins; 4–96 px spacing scale; warm separators, restrained radii, minimal functional shadows.
- Design vocabulary: editorial split hero, asymmetric collection index, material/product study, varied product grid, horizontal editorial sequence, compact specification table, storytelling-to-function transition, focused builder, dense operational table, contextual summary.
- Oxblood belongs in deliberate brand moments. Mineral is selective. Accent color means a functional action. Photography carries the richness.

### Avoid

Generic luxury templates, navy/gold clichés, festive gradients, floating gift illustrations, SaaS dashboard dressed with product images, all-rounded-card layouts, repeated three-card sections, invented metrics, excessive glass/shadow/blur, arbitrary asymmetry, motion for its own sake, and stock imagery represented as real inventory.

### Design tokens and roles

Define semantic tokens (canvas, surface, text, muted text, border, brand, action, warning, error, success) separately from raw palette values. Pair each status color with text/icon, not color alone. Validate body and control contrast, focus visibility, reduced-motion behavior, and zoom/reflow before token lock.

## 8. Motion, responsive behavior, accessibility

Motion should explain a change in state or focus. Use brief fades/reveals only where they improve orientation; honor `prefers-reduced-motion`, never delay content, and avoid scroll choreography. At mobile widths, stack content in task order; filters and summaries are accessible sheets/disclosures; tables become cards or controlled horizontal regions; sticky actions cannot cover fields, errors, or the keyboard. Support keyboard-only use, visible focus, semantic headings/landmarks, labels/instructions, screen-reader announcements for validation/submission, useful alt text, and target sizes appropriate to touch. Aim for WCAG 2.2 AA as the acceptance baseline.

## 9. Content and trust rules

- Maintain a fact register for products, imagery rights, supplier capabilities, MOQ, pricing, taxes, delivery areas, lead times, catalogue publication date, contact channels and claims.
- Do not create testimonials, client logos, certifications, business history, performance statistics, margins, inventory or guarantees.
- Label illustrative seed content visibly and prevent it from reaching public environments.
- Explain why optional personal information or an upload is requested; collect only what is required and define retention/access rules.
- Dates and amounts use Indian conventions where appropriate; currency and tax treatment remain explicit and configurable.

## 10. Measures of experience quality

Instrument a baseline before setting targets. Track: collection engagement and product detail visits; search use; builder start/completion and abandonment step; qualified quote requests; validation and upload failures; time to complete; enquiry-to-quote and quote acceptance; quote turnaround; repeat orders; fulfilment exceptions; mobile usability and performance; task completion and observed hesitation in HR/procurement usability sessions. Define each event, data owner, consent basis and retention before collection.

### Usability tasks

1. Find a suitable welcome kit for 100 people within a stated budget and target date.
2. Request a quote for branded merchandise with logo and destination.
3. Review a formal quote and identify assumptions/expiry.
4. Approve a specific artwork proof or request a change.

Record completion, errors, time, questions and confidence. Fix confusion before adding decorative complexity.

## 11. Review checkpoints before build

- Confirm actual business capabilities, initial service area, contact channels, response expectations, catalogue source and product data owner.
- Approve or revise the palette/typeface hypothesis after viewing representative product photography.
- Decide quote-only launch scope, customer authentication approach, staff roles, quote validity/approval policy, and order transition authority.
- Confirm currency, tax rules, payment milestones, privacy/retention, supplier cost access and upload handling.
- Complete traceability register and mark every open decision with owner and due phase in `BUILD_PLAN.md`.

## 12. Definition of a design-ready feature

For each user story, deliver: journey/context; page state map (default/loading/empty/error/success/permission); responsive layout; real or explicitly illustrative content; keyboard/focus and accessible name behavior; interaction/validation rules; event definition if measured; acceptance criteria; linked requirements; and a decision owner for unknown business rules. Only then hand the batch to implementation.
