# Assets Guide — Images & Icons

Where every image/icon on the site lives, and which code file references it.
Everything is hard-coded (no CMS) — **to change an image, just replace the file
at the same path with the same filename.** No code edits needed unless you're
renaming or adding a new slot (marked below).

Legend: ✅ uploaded · ⏳ placeholder path referenced in code but no file yet

---

## Logo & Nav

| Path | Status | Used in |
|---|---|---|
| `public/images/logo/aaru-mark-color.svg` | ✅ | `Navbar.tsx` (top nav logo) |
| `public/images/logo/aaru-mark-white.svg` | ✅ | `Footer.tsx` (footer logo) |
| `public/images/icons/whatsapp-nav.svg` | ✅ | `Navbar.tsx` (nav WhatsApp icon, x2) |
| `public/images/icons/email.svg` | ✅ | `Footer.tsx` |
| `public/images/icons/whatsapp.svg` | ✅ | `Footer.tsx` |
| `public/images/icons/chevron-down.svg` | ✅ (unused) | not currently referenced anywhere |

## Page Hero Banners (`PageHero` component, top of each page)

Each hero now has a **separate mobile crop** (shown below the `md` breakpoint) instead of just cropping the desktop photo down — added 2026-08-09 so hero photos with an off-center subject (e.g. the "aaru" sign on the home hero) don't get cropped out of frame on narrow phone screens.

| Path | Status | Page |
|---|---|---|
| `public/images/hero/home.png` | ✅ | Home (`src/app/page.tsx`) — desktop |
| `public/images/hero/mobile/home.jpg` | ✅ | Home — mobile |
| `public/images/hero/residences.png` | ✅ | Residences listing (`src/app/residences/page.tsx`) — desktop |
| `public/images/hero/mobile/residences.png` | ⏳ missing | Residences listing — mobile |
| `public/images/hero/commercial-space.png` | ✅ | Commercial Space (`src/app/commercial-space/page.tsx`) — desktop |
| `public/images/hero/mobile/commercial-space.jpg` | ✅ | Commercial Space — mobile |
| `public/images/hero/gallery.png` | ✅ | Gallery (`src/app/gallery/page.tsx`) — desktop |
| `public/images/hero/mobile/gallery.jpg` | ✅ | Gallery — mobile |
| `public/images/hero/contact.jpg` | ✅ | Contact (`src/app/contact/page.tsx`) — desktop |
| `public/images/hero/mobile/contact.jpg` | ✅ | Contact — mobile |

**To add the real mobile photos:** just replace the file at the same `hero/mobile/...` path with the same filename — no code changes needed, same as every other slot in this doc.

**Note:** `hero/garden-condos.png`, `hero/condos.png`, `hero/private-villas.png` exist in the folder but aren't wired to anything — the residence detail pages use `residences/<slug>/hero.jpg` instead (see below). These three look like leftovers; safe to ignore or delete.

## CTA Banner (the "same layout, different image/heading per page" section)

Content lives in `src/content/ctaBanner.ts` — this is the ONE file to edit if you want to change the heading/paragraph text per page, not just the image.

| Path | Status | Route |
|---|---|---|
| `public/images/cta/banner.png` | ✅ | default fallback |
| `public/images/cta/home.png` | ✅ | `/` |
| `public/images/cta/residences.png` | ⏳ missing | `/residences` |
| `public/images/cta/residences-garden-condos.png` | ✅ | `/residences/garden-condos` |
| `public/images/cta/residences-condos.png` | ✅ | `/residences/condos` |
| `public/images/cta/residences-private-villas.png` | ✅ | `/residences/private-villas` |
| `public/images/cta/gallery.png` | ✅ | `/gallery` |
| `public/images/cta/commercial-space.png` | ✅ | `/commercial-space` |

## Home Page Sections (`src/app/page.tsx`)

| Path | Status | Section |
|---|---|---|
| `public/images/home/beach.jpg` | ✅ | "Arugam Bay" split section |
| `public/images/home/map.jpg` | ✅ | "Prime Location" split section |
| `public/images/home/lifestyle.jpg` | ✅ | "More Than a Home, It's a Way of Life" (full-bleed image, `HomeFeatureSection`) |

### Icon rows on this page
- Commercial amenity icons (used elsewhere/home) live in `src/content/commercialAmenityIcons.ts` → `public/images/icons/commercial/*.svg` — all ✅ uploaded: `clubhouse`, `dining`, `yoga`, `wellness`, `gym`, `coworking`, `connectivity`.

## Commercial Space Page (`src/app/commercial-space/page.tsx`)

| Path | Status | Section |
|---|---|---|
| `public/images/commercial/leisure.jpg` | ✅ | "A World of Leisure" |
| `public/images/commercial/clubhouse-pool.jpg` | ✅ | "Clubhouse & Pool" |
| `public/images/commercial/bar.jpg` | ✅ | "Bar & Rooftop Sunset Deck" |
| `public/images/commercial/restaurant.jpg` | ✅ | "Signature Restaurant" |
| `public/images/commercial/spa.jpg` | ⏳ missing | 4-up grid: "Spa & Wellness" (`CommercialFeatureGrid`) |
| `public/images/commercial/fitness.jpg` | ⏳ missing | 4-up grid: "Fitness Center" |
| `public/images/commercial/yoga.jpg` | ⏳ missing | 4-up grid: "Yoga Shala" |
| `public/images/commercial/coworking.jpg` | ⏳ missing | 4-up grid: "Co-working Spaces" |

### Icon rows on this page
- **"Sanctuary Of Wellness" (dark section)** — icons in `src/content/wellnessAmenities.ts`, all pointing at `public/images/icons/wellness/*.svg` — **none uploaded yet**: `clubhouse-pool.svg`, `dining.svg`, `yoga.svg`, `wellness-spa.svg`, `gym.svg`, `coworking.svg`, `connectivity.svg` (matches "Clubhouse & Pool", "Signature Dining", "Yoga Shala", "Wellness & Spa", "Gym", "Co-working Spaces", "24/7 Connectivity" — same 7 concepts as the home page's commercial amenities row above, just a separate icon folder so you can style them differently).


## Residences — Listing Cards (`src/content/residences.ts`)

Each residence has its own **`cardImage`** — used on the home page cards row, the `/residences` listing page, the "Other Residences" section on each detail page, and the style guide sample. This is separate from the detail-page hero banner (below), so you can use a different photo for the card vs the big top banner:
- `residences/garden-condos/card.jpg` ⏳ not uploaded yet
- `residences/condos/card.jpg` ⏳ not uploaded yet
- `residences/private-villas/card.jpg` ⏳ not uploaded yet

## Residences — Detail Pages (`src/app/residences/[slug]/page.tsx`)

All content/paths for these are defined in **`src/content/residences.ts`** — one object per residence (`garden-condos`, `condos`, `private-villas`). Each has:

**1. Hero image (`heroImage`)** — the big banner image at the top of the residence detail page (and the SEO/JSON-LD `image` field). Separate from `cardImage` above:
- `residences/garden-condos/hero.jpg` ✅ (desktop)
- `residences/condos/hero.jpg` ✅ (desktop)
- `residences/private-villas/hero.jpg` ✅ (desktop)

**1b. Mobile hero image (`heroImageMobile`)** — separate art-directed crop shown below the `md` breakpoint, added 2026-08-09 (see Page Hero Banners note above for why):
- `residences/garden-condos/hero-mobile.jpg` ✅
- `residences/condos/hero-mobile.jpg` ✅
- `residences/private-villas/hero-mobile.jpg` ✅

**2. Unit Layout Gallery** (small side gallery, `layoutGallery` array) — all ✅ uploaded:
- `residences/garden-condos/layout-1.jpg` … `layout-4.jpg`
- `residences/condos/layout-1.jpg` … `layout-4.jpg`
- `residences/private-villas/layout-1.jpg` … `layout-4.jpg`

**3. Residence Gallery** (bottom gallery per residence, `gallerySections` — split into "suit-view" / "suit-room" style groups) — all ✅ uploaded:
- `residences/garden-condos/gallery-suit-view-1.jpg`, `-2.jpg`, `-3.jpg`, `gallery-suit-room-1.jpg`
- `residences/condos/gallery-suit-view-1.jpg`, `-2.jpg`, `-3.jpg`
- `residences/private-villas/gallery-suit-view-1.jpg`, `-2.jpg`, `-3.jpg`, `gallery-suit-room-1.jpg`, `-2.jpg`, `-3.jpg`

**4. Unit Amenities icons** — resolved by matching amenity label text via regex in `src/content/amenityIcons.ts` → `public/images/icons/amenities/*.svg`:
| Icon | Status | Matches label containing |
|---|---|---|
| `bed.svg` | ✅ | "bedroom" |
| `size.svg` | ✅ | "sqft" |
| `pool.svg` | ✅ | "private pool" |
| `clubhouse.svg` | ✅ | "clubhouse" |
| `garden-deck.svg` | ⏳ | "garden deck" |
| `balcony.svg` | ⏳ | "balcony" |
| `sunset.svg` | ⏳ | "sunset" / "lagoon view" |
| `bathroom.svg` | ⏳ | "en-suite" / "bathroom" |
| `sofa.svg` | ⏳ | "spacious living" |
| `indoor-outdoor.svg` | ⏳ | "indoor...outdoor" |
| `premium.svg` | ⏳ | "premium finishes" |

To add a new amenity icon: add a `{ pattern: /.../i, icon: "/images/icons/amenities/name.svg" }` line to `amenityIcons.ts`, then drop the SVG in that folder.

*(Separate from the above: `ResidenceCard.tsx` also hard-codes `bed.svg` and `size.svg` directly next to the bedroom/size text on every card — same files, no extra upload needed.)*

### Choosing which icons show on each card

Each residence has a **`cardAmenities: string[]`** field in `residences.ts` that controls every icon+label shown on the card, in the exact order listed — nothing is forced on:
- `"bed"` and `"size"` are special keys — they use `bedroomLabel`/`sizeLabel` with their fixed bed/size icons. Leave either one out of the array and it just won't show on that card.
- Any other string must match one of that residence's own `amenities` entries exactly (e.g. `"Private Pool"`, `"Garden Deck"`) — it's auto-resolved to an icon via the same `amenityIcons.ts` lookup used on the detail page. If it doesn't match a rule there, it's silently skipped rather than showing a broken icon.

Currently:
- Garden Condos: `["bed", "size", "Private Pool"]` → bed, size, pool (3 icons)
- Condos: `["bed", "size", "Lagoon Views"]` → bed, size, sunset (3 icons)
- Private Villas: `["bed", "size", "Private Pool", "Garden Deck"]` → bed, size, pool, garden-deck (4 icons)

To change what shows on a card — including dropping bed/size entirely, or reordering them — just edit that one array.

## Gallery Page (`/gallery`) — different system, folder-driven

This page does **not** use a content file with fixed filenames — `src/content/gallery.ts` reads whatever files are physically inside each folder under `public/images/gallery/<category>/` at build time and displays them automatically. **This means you can just drop new photos straight into a category folder and they'll show up — no subfolders, no code changes ever needed here.**

- 4 categories, each a single flat gallery (no sub-topics/sections): `residential`, `interior`, `lifestyle`, `maps` → folders `public/images/gallery/residential/`, `.../interior/`, `.../lifestyle/`, `.../maps/`
- Just drop images directly into the category folder. Each photo is measured on disk and laid out at its own real aspect ratio (landscape stays wide, portrait/square stays narrow) — nothing gets stretched or cropped into the wrong shape.
- Prefix a filename with a number (`1-hero.jpg`, `2-poolside.jpg`) to control display order — otherwise files sort alphabetically. The number is stripped from the displayed alt text automatically.
- Old subfolders (`suit-view/`, `suit-room/`, etc.) still get picked up if left in place — they're just flattened into the same list with everything else — but new photos don't need one.

Currently populated: `residential/` (8 images, still split across leftover `suit-view/`, `interior/`, `suit-room/` subfolders — fine as-is, or flatten them by moving the files up a level). `interior`, `lifestyle`, and `maps` categories are still empty.

Category tab icons (fixed, not folder-driven): `public/images/icons/gallery/residential.svg`, `interior.svg`, `lifestyle.svg`, `maps.svg` — all ✅.

## Contact Page (`src/app/contact/page.tsx`)

| Path | Status | Used for |
|---|---|---|
| `public/images/contact/map.jpg` | ⏳ missing | Location map image in the "Contact Information" section |
| `public/images/icons/email.svg` | ✅ | Email row icon (reused from Footer) |
| `public/images/icons/whatsapp.svg` | ✅ | Phone/WhatsApp row icon (reused from Footer) |

## SEO / Social Share

| Path | Status | Used in |
|---|---|---|
| `public/images/og/default.jpg` | ⏳ missing | `src/lib/metadata.ts` — Open Graph fallback image for any page without its own `imagePath` |

---

## Quick "what's still missing" checklist

- [ ] `hero/mobile/residences.png` — mobile hero crop for the Residences listing page (the only mobile hero crop still missing; all others uploaded 2026-08-09)
- [ ] `commercial/spa.jpg`, `fitness.jpg`, `yoga.jpg`, `coworking.jpg` — 4-up grid on Commercial Space page
- [ ] `cta/residences.png`
- [ ] `icons/wellness/` — all 7 icons (clubhouse-pool, dining, yoga, wellness-spa, gym, coworking, connectivity)
- [ ] `icons/amenities/` — 7 icons (garden-deck, balcony, sunset, bathroom, sofa, indoor-outdoor, premium)
- [ ] Residence card images — all 3 residences (`card.jpg`)
- [ ] `og/default.jpg`
- [ ] `contact/map.jpg` — location map on the Contact page
- [ ] Gallery folders: `interior`, `lifestyle`, `maps` categories are empty
