# MK Interiors — Admin Dashboard / CMS (Improved Plan)

## Context

MK Interiors is a Next.js 16 interior design portfolio. All content (hero text, rooms, services, testimonials, etc.) is hardcoded in TypeScript components. The site is deployed on Vercel. The goal is to add a simple, intuitive admin dashboard so a non-technical user can edit all website content and upload images — without touching code.

## Key Decisions

- **Database**: Vercel Postgres (Neon) — free tier, 256MB. Works on Vercel's read-only filesystem.
- **ORM**: Drizzle ORM — lightweight, TypeScript-first, first-class JSON column support, works natively with Vercel Postgres.
- **Image storage**: Vercel Blob — free tier, 250MB. Returns public URLs for uploaded images.
- **Auth**: Single password from env var, HMAC-signed cookie session.
- **UI**: Reuse the 59 shadcn/ui components already installed (sidebar, tabs, dialog, inputs, etc.)
- **Mutations**: Server Actions for all content/room/category writes. API routes only for auth (cookie manipulation) and image upload (multipart form).
- **Caching**: `revalidatePath()` / `revalidateTag()` after every admin write for instant frontend updates.
- **No new heavy dependencies**: Only adding `@vercel/postgres`, `@vercel/blob`, `drizzle-orm`, and `drizzle-kit`.

## Changes from Original Plan

| # | Issue | Fix |
|---|-------|-----|
| 1 | `categories` table missing `image` and `slug` columns | Added both — `projects-grid.tsx` has images per category, routes use slug |
| 2 | `projects-grid.tsx` has duplicate category data vs `rooms-data.ts` | Merged into one `categories` table; drop `categoryLabel` (redundant with `title`) |
| 3 | `FurnitureCarousel` component not in plan at all | Noted as unused dead code (not imported anywhere) — remove or integrate |
| 4 | `about` content model missing CTA section | Added `ctaTitle`, `ctaDescription` |
| 5 | `contact` content model too sparse (`{ email, locationText }` only) | Expanded with `sectionTitle`, `sectionSubtitle`, `projectTypes[]` |
| 6 | `before-after` model only had 2 image URLs | Added `title`, `subtitle`, `beforeLabel`, `afterLabel` |
| 7 | Section header text (titles/descriptions) not in content model | Added `sectionTitle`/`sectionDescription` to services, process, moodboards, projects, testimonials |
| 8 | No Server Actions — plan used 9+ API route files for mutations | Use Server Actions for mutations; keep API routes only for auth + upload |
| 9 | No ORM decision ("lightweight ORM or raw SQL") | Chose Drizzle ORM |
| 10 | `revalidatePath()` was in Phase 8 "Polish" — it's core, not polish | Moved to Phase 4, called inside every Server Action |
| 11 | Image optimization disabled, not addressed for Vercel Blob | Enable `next/image` with `remotePatterns` for Blob domain in Phase 6 |
| 12 | Contact form has no backend (simulates with `setTimeout`) | Explicitly deferred — noted as future enhancement |
| 13 | File reference `next.config.ts` → actual file is `next.config.mjs` | Fixed |
| 14 | Rooms reference categories by title string, not ID | Seed script maps `category: "Living Rooms"` → `category_id: "living-rooms"` |
| 15 | Process/Services store icons as JSX/components, not strings | Icon map converts `iconName` string → Lucide component at render time |
| 16 | `FeaturedProjects` section title text not in content model | Added `featured-projects` content key |
| 17 | Footer links to `/privacy` and `/terms` which 404 | Noted — address in Polish phase |
| 18 | 8 phases too granular — some overlap | Consolidated to 7 phases |
| 19 | No local dev setup instructions | Added env vars section |

---

## Data Model

### `content` table (key → JSON blob)

| key | data (jsonb) |
|-----|------|
| `hero` | `{ tagline, headline, subtitle, ctaText, backgroundImage }` |
| `philosophy` | `{ title, description, image, features: [{ title, subtitle }] }` |
| `projects-section` | `{ sectionTitle, sectionDescription }` |
| `moodboards` | `{ sectionTitle, sectionDescription, items: [{ id, title, style }] }` |
| `before-after` | `{ title, subtitle, beforeImage, afterImage, beforeLabel, afterLabel }` |
| `featured-projects` | `{ sectionTitle, sectionSubtitle }` |
| `services` | `{ sectionTagline, sectionTitle, items: [{ title, description, iconName }] }` |
| `process-steps` | `{ sectionTitle, items: [{ number, title, description, iconName }] }` |
| `testimonials` | `{ sectionTitle, items: [{ id, quote, author, location }] }` |
| `contact` | `{ sectionTitle, sectionSubtitle, email, locationText, projectTypes: string[] }` |
| `about` | `{ heroTagline, heroTitle, introParagraphs[], values: [{ title, description }], approachParagraphs[], ctaTitle, ctaDescription }` |
| `social-links` | `{ instagram, facebook, linkedin, tiktok }` |
| `site-settings` | `{ logoLight, logoDark, metaTitle, metaDescription }` |

### `rooms` table
| Column | Type |
|--------|------|
| id | text PK |
| slug | text unique |
| title | text |
| category_id | text FK → categories.id |
| description | text |
| images | jsonb `[{ src, alt }]` |
| colors | jsonb `[{ name, color }]` |
| sort_order | integer |

### `categories` table
| Column | Type | Notes |
|--------|------|-------|
| id | text PK | e.g., `"living-rooms"` |
| title | text | e.g., `"Living Rooms"` |
| slug | text unique | URL slug (matches `id` initially but decoupled) |
| image | text | Category card thumbnail URL |
| sort_order | integer | Display order on projects grid |

---

## New File Structure

```
middleware.ts                              # Protect /admin/* routes

lib/
  auth.ts                                  # Session create/verify helpers
  db.ts                                    # Drizzle ORM client + connection
  db/
    schema.ts                              # Drizzle table definitions
    migrate.ts                             # Migration runner
    seed.ts                                # Seed script (hardcoded data → DB)
  types/content.ts                         # TypeScript interfaces for all content
  data/
    repository.ts                          # getContent/setContent + room/category queries
    schemas.ts                             # Zod validation schemas
    icons.ts                               # Icon name string → Lucide component map
  actions/
    content.ts                             # Server Actions: updateContent(section, data)
    rooms.ts                               # Server Actions: createRoom, updateRoom, deleteRoom
    categories.ts                          # Server Actions: createCategory, updateCategory, deleteCategory

app/
  api/
    auth/login/route.ts                    # POST: verify password, set cookie
    auth/logout/route.ts                   # POST: clear cookie
    admin/upload/route.ts                  # POST: upload image to Vercel Blob

  admin/
    layout.tsx                             # Admin shell (sidebar + header)
    page.tsx                               # Dashboard home
    login/page.tsx                         # Login page
    pages/page.tsx                         # Edit Hero, Philosophy, About (tabs)
    projects/page.tsx                      # Rooms list + categories
    projects/[id]/page.tsx                 # Edit room
    projects/new/page.tsx                  # Create room
    components/page.tsx                    # Edit Services, Process, Testimonials, Moodboards, Before/After (tabs)
    settings/page.tsx                      # Contact, Social Links, Site metadata

components/admin/
  admin-sidebar.tsx                        # Sidebar navigation
  admin-header.tsx                         # Top bar with logout
  image-upload.tsx                         # Drag & drop image upload with preview
  icon-picker.tsx                          # Lucide icon selector dropdown
  room-form.tsx                            # Room create/edit form
  color-swatch-editor.tsx                  # Add/remove color swatches
  array-field-editor.tsx                   # Reusable array-of-objects editor
```

**Eliminated vs original plan** (thanks to Server Actions):
- ~~`app/api/admin/content/[section]/route.ts`~~ → `lib/actions/content.ts`
- ~~`app/api/admin/rooms/route.ts`~~ → `lib/actions/rooms.ts`
- ~~`app/api/admin/rooms/[id]/route.ts`~~ → `lib/actions/rooms.ts`
- ~~`app/api/admin/categories/route.ts`~~ → `lib/actions/categories.ts`
- ~~`app/api/admin/categories/[id]/route.ts`~~ → `lib/actions/categories.ts`

6 API route files → 3 Server Action files. Simpler data flow, type-safe, no fetch boilerplate.

---

## Authentication Flow

1. User visits `/admin` → middleware checks for `admin_session` cookie
2. No valid cookie → redirect to `/admin/login`
3. User enters password → POST `/api/auth/login`
4. Server compares with `ADMIN_PASSWORD` env var (timing-safe)
5. On match: create HMAC-SHA256 signed token with `SESSION_SECRET`, set HttpOnly cookie (7 days)
6. Middleware verifies signature on subsequent requests

**Env vars needed:** `ADMIN_PASSWORD`, `SESSION_SECRET`

---

## Admin UI Design

The admin uses the existing shadcn sidebar component for navigation:

- **Dashboard** — Welcome + quick-link cards to each section
- **Pages** — 3 tabs: Hero / Philosophy / About — simple text fields + image uploads
- **Projects** — Room cards grid with thumbnails, category filter, CRUD. Room form: title, auto-slug, category dropdown, description, image gallery (upload/reorder/remove), color swatches. Separate category management section.
- **Components** — 5 tabs: Services / Process / Testimonials / Moodboards / Before-After — array editors with add/remove/reorder
- **Settings** — 3 cards: Contact Info / Social Links / Site Metadata

Each form has: Save button, loading state, success/error toast (using Sonner already installed).

---

## Frontend Migration

Currently all components are `"use client"` with hardcoded data. Migration pattern:

1. **`app/page.tsx`** (server component) becomes the data hub — fetches all content from DB, passes as props
2. Each component gets a `Props` interface and receives data instead of hardcoding it
3. `lib/rooms-data.ts` functions become async, read from DB
4. Room/category pages updated to use async data layer
5. `generateStaticParams` reads from DB
6. Server Actions call `revalidatePath()` after writes for instant updates
7. Enable `next/image` with Vercel Blob `remotePatterns`

**Components to migrate** (each gets props instead of hardcoded arrays):
- `hero.tsx`, `philosophy.tsx`, `projects-grid.tsx`, `moodboard.tsx`
- `before-after.tsx`, `featured-projects.tsx`, `services.tsx`, `process.tsx`
- `testimonial.tsx`, `contact.tsx`, `footer.tsx`, `header.tsx`
- `app/about/about-client.tsx`

**Component to decide on:**
- `furniture-carousel.tsx` — currently **dead code** (not imported anywhere). Remove or integrate.

---

## Implementation Phases

### Phase 1: Foundation
1. `lib/types/content.ts` — all TypeScript interfaces for every content key
2. `lib/data/schemas.ts` — Zod validation schemas for every content key
3. `lib/db.ts` — Drizzle ORM client with Vercel Postgres
4. `lib/db/schema.ts` — Drizzle schema definitions (content, rooms, categories)
5. `lib/data/repository.ts` — `getContent()`, `setContent()`, room/category CRUD queries
6. `lib/db/seed.ts` — seed script extracting data from ALL hardcoded sources (rooms-data.ts, hero.tsx, philosophy.tsx, services.tsx, process.tsx, testimonial.tsx, moodboard.tsx, before-after.tsx, contact.tsx, footer.tsx, projects-grid.tsx, about-client.tsx)
7. `lib/data/icons.ts` — `{ "Home": Home, "MessageSquare": MessageSquare, ... }` icon map

### Phase 2: Auth + Middleware
8. `lib/auth.ts` — HMAC session create/verify
9. `middleware.ts` — protect `/admin/*`, redirect to login
10. `app/api/auth/login/route.ts` + `app/api/auth/logout/route.ts`
11. `app/admin/login/page.tsx`

### Phase 3: Admin Shell + Reusable Components
12. `app/admin/layout.tsx` — sidebar + header
13. `components/admin/admin-sidebar.tsx`
14. `components/admin/admin-header.tsx`
15. `app/admin/page.tsx` — dashboard home
16. `components/admin/image-upload.tsx` — drag & drop + Vercel Blob
17. `components/admin/array-field-editor.tsx` — generic add/remove/reorder
18. `components/admin/icon-picker.tsx` — Lucide icon selector
19. `components/admin/color-swatch-editor.tsx`
20. `components/admin/room-form.tsx`

### Phase 4: Server Actions + Upload API
21. `lib/actions/content.ts` — `updateContent(section, data)` + `revalidatePath()`
22. `lib/actions/rooms.ts` — create/update/delete room + revalidation
23. `lib/actions/categories.ts` — create/update/delete category + revalidation
24. `app/api/admin/upload/route.ts` — image upload to Vercel Blob

### Phase 5: Admin Pages
25. Settings page — Contact, Social Links, Site Metadata (simplest — text fields)
26. Components page — Services, Process, Testimonials, Moodboards, Before-After (tabs with array editors)
27. Pages page — Hero, Philosophy, About (tabs with text fields + image uploads)
28. Projects page — Room list + category management, room create/edit form

### Phase 6: Frontend Migration
29. Update `app/page.tsx` to fetch all content from DB, pass as props
30. Migrate each component to accept props (one at a time, 13 components)
31. Update `lib/rooms-data.ts` to async DB queries
32. Update room/category/about pages to use async data layer
33. Update `next.config.mjs`: enable image optimization with Vercel Blob `remotePatterns`

### Phase 7: Polish
34. Loading skeletons on admin pages
35. Success/error toasts on all forms (Sonner)
36. Remove `furniture-carousel.tsx` (or integrate if desired)
37. Address Privacy/Terms footer links (stub pages or remove links)
38. End-to-end verification

---

## Verification Plan

1. Run `npm run dev` — frontend should look identical (data now from DB, not hardcode)
2. Visit `/admin` → redirected to login → enter password → see dashboard
3. Edit hero text → save → visit homepage → see updated text instantly
4. Create new room with images → appears on projects page
5. Delete a testimonial → gone from frontend
6. Upload an image → appears in Vercel Blob → usable in content
7. Change category image → projects grid updates
8. Edit about page values → about page reflects changes
9. Log out → can't access `/admin` → redirect to login
10. `npm run build` succeeds with no TypeScript errors

---

## Dependencies to Install

```bash
# Runtime
npm i @vercel/postgres @vercel/blob drizzle-orm

# Dev
npm i -D drizzle-kit
```

No other new dependencies needed — Zod, shadcn, Lucide, Sonner, react-hook-form all already installed.

## Environment Variables

```env
# Database (from Vercel Postgres dashboard)
POSTGRES_URL=               # Connection string

# Blob storage (from Vercel Blob dashboard)
BLOB_READ_WRITE_TOKEN=      # Read/write access token

# Auth
ADMIN_PASSWORD=             # Admin login password
SESSION_SECRET=             # HMAC signing key (generate with: openssl rand -hex 32)
```

## Future Enhancements (out of scope)

- Contact form backend (store submissions in DB or send via email API like Resend)
- Rich text editing (e.g., Tiptap) for longer content blocks
- Image cropping/resizing in the upload flow
- Role-based access if more than one admin is needed
- Audit log of content changes
