# Arova Gifting — Image Asset Checklist

Use this as the handoff list for preparing imagery. The current site uses CSS concept illustrations; no actual image files are wired into the app yet. The dimensions below are recommended source sizes, not mandatory rendered pixel sizes. Supply sharp originals and keep the subject inside the stated safe area so responsive crops work.

## Prepare first: current storefront

| Qty | Exact filename | Where it will be used | Recommended source size | Crop / content guidance |
|---:|---|---|---|---|
| 1 | `hero-gifting-editorial.webp` | Homepage hero | 1800 × 2000 px, portrait 9:10 (minimum 1200 × 1350) | One strong scene of a thoughtfully arranged corporate gift/kit, natural light, room around the subject. Keep the main object centered; avoid text baked into the photo. |
| 1 | `collection-welcome-edition.webp` | Welcome Edition collection tile and detail page | 1400 × 1200 px, landscape 7:6 | Welcome kit / onboarding gift. Leave some breathing room around the set. |
| 1 | `collection-branded-essentials.webp` | Branded Essentials collection tile and detail page | 1400 × 1200 px, landscape 7:6 | Useful desk or everyday objects. Show logo application only if that branding is approved and representative. |
| 1 | `collection-executive-objects.webp` | Executive Objects collection tile and detail page | 1400 × 1200 px, landscape 7:6 | Premium-feeling gift objects or packaging, styled simply and accurately. |
| 1 | `collection-seasonal-hampers.webp` | Seasonal Hampers collection tile and detail page | 1400 × 1200 px, landscape 7:6 | A hamper or seasonal assortment. Avoid holiday-specific décor unless the image is intended only for that season. |
| 1 | `concept-welcome-kit.webp` | Build-a-kit product choice | 1000 × 1000 px, square | Representative welcome kit image; keep important items near the center for the card crop. |
| 1 | `concept-branded-desk-set.webp` | Build-a-kit product choice | 1000 × 1000 px, square | Desk set image. Use a real approved sample or a clearly illustrative concept. |
| 1 | `concept-executive-gift-set.webp` | Build-a-kit product choice | 1000 × 1000 px, square | Executive gift set image. |
| 1 | `concept-seasonal-hamper.webp` | Build-a-kit product choice | 1000 × 1000 px, square | Seasonal hamper image. |

The four collection images appear in both the collection index and collection detail, so you do not need duplicate files for those pages. The homepage hero can be a separate crop from one of the collection photos if you do not have a ninth distinct scene.

## Brand and sharing assets

| Qty | Exact filename | Where it will be used | Recommended source size / format | Notes |
|---:|---|---|---|---|
| 1 | `arova-wordmark.svg` | Header and footer | SVG vector; transparent background | Horizontal lockup, dark version. Include a separate light version only if the supplied logo needs it on dark backgrounds. Current header is a text mark, so this can be prepared alongside the photography. |
| 1 | `arova-icon.svg` | Browser tab / app icon | SVG, square viewBox | A simple standalone brand mark, legible at small sizes. If SVG is unavailable, supply `favicon-32.png` at 32 × 32 px and `apple-touch-icon.png` at 180 × 180 px. |
| 1 | `share-arova-gifting.jpg` | Link previews (Open Graph) | 1200 × 630 px, landscape 1.91:1 | Brand-approved image with a short title area. Keep all text/logo away from outer edges; share graphics are the exception where text may be part of the image. |

## Product catalogue images to collect as products are confirmed

There are not yet verified product records in the app, so there is no fixed product image count. For each real product that you approve for publication, provide:

| Filename pattern | Qty per product | Recommended source size | Use |
|---|---:|---:|---|
| `product-{product-slug}-01.webp` | 1 | 1600 × 2000 px, portrait 4:5 | Primary image on the product detail page and product cards. |
| `product-{product-slug}-02.webp` through `product-{product-slug}-05.webp` | 2–4 additional | 1600 × 2000 px, portrait 4:5 | Detail gallery: alternate angle, scale/in-hand view, material/finish close-up, and packaging or contents. Supply only views that accurately describe the item. |
| `product-{product-slug}-logo-detail.webp` | Optional | 1600 × 2000 px, portrait 4:5 | A branded sample, only where the branding shown is approved for public use. |

Example: `product-insulated-bottle-01.webp`, `product-insulated-bottle-02.webp`. Use lowercase words separated by hyphens; keep the same product slug across the set.

## Delivery rules

- Put files under `public/images/` and keep the names above exactly. Suggested folders: `public/images/brand/`, `public/images/home/`, `public/images/collections/`, `public/images/concepts/`, and `public/images/products/`. The file paths can be mapped when the assets are integrated.
- Preferred photo format: WebP, sRGB, high quality. Keep a full-resolution original outside the site folder for future crops. SVG is preferred for logos and icons.
- Do not add text, borders, watermarks, or decorative frames to product photography. Send logo artwork separately as SVG, PDF, or transparent PNG.
- Send only imagery Arova has permission to publish. Identify any supplier restrictions, people/photo releases, and whether an image is a real item, a branded sample, or a visual concept.
- For a consistent editorial look, use a warm neutral background, soft natural light, restrained props, and a similar camera angle across each collection set. Avoid mixing supplier catalogue cutouts with lifestyle photography in the same row.
- If a filename has no confirmed real product behind it, label the image internally as a concept and do not imply confirmed inventory, supplier availability, branding capability, price, or delivery timing.

## Quick count

- **9 storefront images:** one hero, four collection images, four build-a-kit concept cards.
- **3 brand/share files:** wordmark, icon, social preview (the icon can instead be supplied as PNG variants).
- **Product catalogue:** variable; one primary and two to four supporting views per confirmed product.

