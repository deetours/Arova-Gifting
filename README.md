# Arova Gifting

First implementation slice for the Corporate Gifting Solutions plan. It includes the editorial storefront, collection/occasion/product concept routes, a guided quote brief, server-validated enquiry persistence, a receipt page, and route templates for the customer portal and internal operations application.

## Local development

Requires Node.js 22.5 or newer. The local development adapter uses Node's built-in SQLite module and stores data in `.data/arova.sqlite` (ignored by Git).

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`. Submit a brief to persist an enquiry, then visit `/admin` to view it and move it through the limited local statuses. The dashboard exposes submitted contact details and is deliberately unavailable when `NODE_ENV=production`.

## Important scope and launch limits

- Collection/product visuals are CSS concept illustrations. They are not photographs or representations of verified inventory.
- No actual catalogue, product availability, supplier costs, minimum quantities, delivery commitments, customer testimonials or business contact channels were provided.
- Quote submission is enabled only in development while the local SQLite adapter is used. The production API returns an unavailable response until a PostgreSQL adapter and its access, backup, retention and deployment configuration are implemented.
- The operations pages are development-only and have no authentication. Never expose the development server or local data to a public network.
- Customer account, order and artwork routes are permission-safe holding states until an identity provider, company membership and actual order/proof records exist.
- Catalogue/customer/report and quote/order workspaces do not invent records. They show concept, empty or gated states where verified data or a valid business transition is missing.
- Artwork uploads, outgoing email, customer login, formal quotation generation, payments and direct checkout are not enabled.
- The current enquiry status is not a quote/order lifecycle and has no production audit/role policy yet.
- Current font stacks use local system fallbacks; the approved brand fonts and licenses were not supplied.

See [Design.md](./Design.md), [BUILD_PLAN.md](./BUILD_PLAN.md) and [Phase 0–2 deliverables](./PHASE_0-2_DELIVERABLES.md) for the source assumptions, open decisions and planned next work.
