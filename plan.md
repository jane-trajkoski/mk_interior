# MK Interiors — Admin Dashboard / CMS

## Context

MK Interiors is a Next.js 16 interior design portfolio. All content is hardcoded in TypeScript components. Deployed on Vercel. The goal: add an admin dashboard so a non-technical user can edit all website content, upload images, and receive contact form submissions — without touching code.

## Tech Stack

| Concern | Choice | Why |
|---------|--------|-----|
| Database | Vercel Postgres (Neon) | Free 256MB, same-network on Vercel |
| ORM | Drizzle | TS-first, JSONB with `.$type<T>()`, no codegen |
| Image storage | Vercel Blob (client uploads) | Free 250MB, browser uploads directly via signed token — avoids Vercel's 4.5MB server body limit |
| Auth | `jose` JWT | Single-admin doesn't need NextAuth. `jose` handles JWT sign/verify in ~10 lines |
| Email | Resend | Free 100/day, official Next.js SDK |
| Admin forms | react-hook-form + zod + shadcn Form | Single Zod schema validates both client and server |
| Mutations | Server Actions | No fetch boilerplate, type-safe, automatic revalidation |
| Rich text | Tiptap (Phase 5 only) | Headless, only for About page long-form paragraphs |

## Dependencies to Install

```bash
# Phase 1 (runtime)
npm i @vercel/postgres @vercel/blob drizzle-orm jose zod resend

# Phase 1 (dev)
npm i -D drizzle-kit

# Phase 5 only (defer until needed)
npm i @tiptap/react @tiptap/starter-kit @tiptap/pm
```

**Already installed:** react-hook-form, @hookform/resolvers, all shadcn/ui, sonner, lucide-react.
**Note:** `zod` is NOT in package.json despite `@hookform/resolvers` being installed — must add explicitly.

## Environment Variables

```env
POSTGRES_URL=               # Vercel Postgres connection string
BLOB_READ_WRITE_TOKEN=      # Vercel Blob access token
ADMIN_PASSWORD=             # Single admin password (bcrypt-hashed recommended)
SESSION_SECRET=             # JWT signing key (openssl rand -hex 32)
RESEND_API_KEY=             # From resend.com
NOTIFY_EMAIL=               # e.g. creativeinteriors.mk@gmail.com
```

---

## Data Model

### `content` table (key → JSON blob)

Each row stores one section's data. The `data` column is `jsonb`.

| key | data shape | Source file for seed |
|-----|------------|---------------------|
| `hero` | `{ tagline: "Luxury Interior Design", headline: "Crafting Spaces That Inspire", subtitle: "We transform interiors into...", ctaText: "Get in Touch", backgroundImage: "/images/hero.jpg" }` | `components/hero.tsx:31-55` |
| `philosophy` | `{ title: "Why us?", description: "We provide personalized...", image: "/images/modern-interior.jpg", features: [{ title: "Personalized Approach", subtitle: "Tailored to your unique style" }, ...] }` | `components/philosophy.tsx:33-63` |
| `projects-section` | `{ sectionTitle: "Our Projects", sectionDescription: "Explore our portfolio..." }` | `components/projects-grid.tsx` section header |
| `moodboards` | `{ sectionTitle: "Moodboard's inspiration", sectionDescription: "Discover the aesthetic...", items: [{ id: "minimalist", title: "Minimalist interior design", style: "Clean lines, neutral tones..." }, ...] }` | `components/moodboard.tsx:6-21` |
| `before-after` | `{ title: "Before-After", subtitle: "Upload a photo of your room and choose your style!", beforeImage: "/images/bedroom-2.jpg", afterImage: "/images/bedroom-1.jpg", beforeLabel: "Before", afterLabel: "After" }` | `components/before-after.tsx:36-39,62-76` |
| `featured-projects` | `{ sectionTagline: "Explore", sectionTitle: "Featured Projects" }` | `components/featured-projects.tsx:34-37` |
| `services` | `{ sectionTagline: "What We Offer", sectionTitle: "Services", items: [{ title: "Residential Design", description: "Complete home transformations...", iconName: "Home" }, { title: "3D Visualization", ..., iconName: "Layers" }, { title: "Material Curation", ..., iconName: "Palette" }, { title: "Light Design", ..., iconName: "Lightbulb" }] }` | `components/services.tsx:6-27` |
| `process-steps` | `{ sectionSubtitle: "Our process transforms your vision...", items: [{ number: "01", title: "Concept", description: "We begin with...", iconName: "MessageSquare" }, { ..., iconName: "Lightbulb" }, { ..., iconName: "Box" }, { ..., iconName: "Image" }, { ..., iconName: "Presentation" }] }` | `components/process.tsx:6-42` |
| `testimonials` | `{ items: [{ id: 1, quote: "MK Interiors transformed our apartment...", author: "Elena & Marcus", location: "Modern Living Room Project" }, ...] }` | `components/testimonial.tsx:7-29` |
| `contact` | `{ sectionTagline: "Get in Touch", sectionTitle: "Ready to transform your space?", sectionSubtitle: "Every meaningful space begins with a conversation...", email: "creativeinteriors.mk@gmail.com", locationText: "Available Worldwide", projectTypes: ["Residential", "Commercial", "Renovation", "Consultation"] }` | `components/contact.tsx:42-77,152-163` |
| `about` | `{ heroTagline: "Our Story", heroTitle: "About us", introParagraphs: ["We are MK Interiors...", "Founded just a year ago...", "Our specialty lies in...", "We believe every space...", "Whether you're updating..."], values: [{ title: "Personalization", description: "Every project is tailored..." }, { title: "Quality", ... }, { title: "Transparency", ... }, { title: "Creativity", ... }], approachParagraphs: ["We combine modern 3D...", "Our collaborative process ensures..."], ctaTitle: "Ready to start your project?", ctaDescription: "Let's discuss how we can help transform your space." }` | `app/about/about-client.tsx:26-141` |
| `social-links` | `{ instagram: "", facebook: "", linkedin: "", tiktok: "" }` | `components/footer.tsx:51-82` (all currently `"#"`) |
| `site-settings` | `{ logoLight: "/logo-black.png", logoDark: "/logo-color.png", metaTitle: "MK Interiors | Interior Design & 3D Visualization", metaDescription: "Creative studio specializing in interior design..." }` | `app/layout.tsx:22-33`, `components/header.tsx:44-53` |

### `categories` table

| Column | Type | Notes |
|--------|------|-------|
| id | text PK | e.g. `"living-rooms"` |
| title | text | e.g. `"Living Rooms"` |
| slug | text unique | URL slug for `/category/[slug]` |
| image | text | Category card thumbnail URL |
| sort_order | integer | Display order on projects grid |

**Seed data source:** `components/projects-grid.tsx:7-43` (has id, title, slug, image).
**NOT** `lib/rooms-data.ts` categories — that array lacks `slug` and `image`.

### `rooms` table

| Column | Type | Notes |
|--------|------|-------|
| id | text PK | |
| slug | text unique | |
| title | text | |
| category_id | text FK → categories.id | |
| description | text | |
| images | jsonb `[{ src, alt }]` | |
| colors | jsonb `[{ name, color }]` | |
| sort_order | integer | |

**Seed mapping:** Current rooms use string labels (`room.category === "Living Rooms"`). The seed must map these to category IDs:
- `"Living Rooms"` → `"living-rooms"`
- `"Bedrooms"` → `"bedrooms"`
- `"Dining Rooms"` → `"dining-rooms"`
- `"Kidsrooms"` → `"kidsrooms"` (note: no space in source data)
- `"Office"` → `"office"`
- `"Bathrooms"` → `"bathrooms"`

Source: `lib/rooms-data.ts` (7 rooms, 6 categories).

### `contact_submissions` table

| Column | Type | Notes |
|--------|------|-------|
| id | serial PK | |
| name | text | Required |
| email | text | Required |
| phone | text | Nullable |
| project_type | text | Nullable |
| message | text | Required |
| status | text | `'unread'` / `'read'` / `'archived'`, default `'unread'` |
| created_at | timestamp | Default `now()` |

---

## New File Structure

```
middleware.ts                              # Protect /admin/* (except /admin/login)

lib/
  auth.ts                                  # jose JWT: createSession(), verifySession()
  db.ts                                    # Drizzle client + @vercel/postgres pool
  db/
    schema.ts                              # Drizzle table definitions (content, rooms, categories, contact_submissions)
    migrate.ts                             # drizzle-kit push runner
    seed.ts                                # Hardcoded data → DB (idempotent: upserts, not inserts)
  types/content.ts                         # TS interfaces for all 14 content keys
  data/
    repository.ts                          # getContent<T>(key), setContent(key, data), room/category CRUD
    schemas.ts                             # Zod schemas (shared client + server validation)
    icons.ts                               # { "Home": Home, "Layers": Layers, ... } Lucide map

  actions/
    content.ts                             # updateContent(section, data) → revalidateTag(section)
    rooms.ts                               # createRoom, updateRoom, deleteRoom
    categories.ts                          # CRUD + revalidation
    contact.ts                             # submitContactForm → insert + Resend email
    messages.ts                            # getSubmissions, updateStatus, deleteSubmission, getUnreadCount

app/
  api/
    auth/login/route.ts                    # POST: timing-safe compare, jose JWT cookie (7 days)
    auth/logout/route.ts                   # POST: clear cookie
    admin/upload/route.ts                  # POST: return Vercel Blob client-upload token

  admin/
    layout.tsx                             # Admin shell: sidebar + header + Toaster
    page.tsx                               # Dashboard: stat cards (rooms, categories, unread messages) + quick links
    login/page.tsx                         # Password form
    pages/page.tsx                         # Tabs: Hero / Philosophy / About
    projects/page.tsx                      # Room cards + category management
    projects/[id]/page.tsx                 # Edit room
    projects/new/page.tsx                  # Create room
    components/page.tsx                    # Tabs: Services / Process / Testimonials / Moodboards / Before-After
    settings/page.tsx                      # Cards: Contact Info / Social Links / Site Metadata
    messages/page.tsx                      # Submissions table with read/unread/archive

components/admin/
  admin-sidebar.tsx                        # Nav links + unread messages badge
  admin-header.tsx                         # Top bar with logout button
  image-upload.tsx                         # Drag & drop → @vercel/blob/client upload()
  icon-picker.tsx                          # Dropdown of available Lucide icons
  room-form.tsx                            # react-hook-form + zodResolver for room create/edit
  color-swatch-editor.tsx                  # Add/remove color swatches
  array-field-editor.tsx                   # Generic add/remove/reorder for arrays of objects
```

---

## Authentication Flow

1. User visits `/admin` → middleware checks `admin_session` cookie
2. No valid cookie → redirect `/admin/login`
3. User enters password → POST `/api/auth/login`
4. Server: `timingSafeEqual(password, process.env.ADMIN_PASSWORD)` — **plus rate limiting** (Map-based, 5 attempts per IP per minute, returns 429)
5. On match: `new SignJWT({ role: 'admin' }).setExpirationTime('7d').sign(secret)` → set `HttpOnly`, `Secure`, `SameSite=Lax` cookie
6. Middleware: `jwtVerify(token, secret)` on every `/admin/*` request (except `/admin/login`)

```ts
// lib/auth.ts — complete implementation sketch
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secret = new TextEncoder().encode(process.env.SESSION_SECRET)

export async function createSession() {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret)
  const cookieStore = await cookies()
  cookieStore.set('admin_session', token, {
    httpOnly: true, secure: true, sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, path: '/',
  })
}

export async function verifySession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch { return null }
}
```

```ts
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.SESSION_SECRET)

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('admin_session')?.value
  if (!token) return NextResponse.redirect(new URL('/admin/login', req.url))
  try {
    await jwtVerify(token, secret)
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }
}

export const config = {
  matcher: ['/admin/((?!login).*)'],  // Protect /admin/* except /admin/login
}
```

---

## Implementation Phases

### Phase 1: Database + Auth + Admin Shell
**Goal:** Log into `/admin`, see a working dashboard skeleton, data in DB.

| # | Task | File(s) |
|---|------|---------|
| 1 | Drizzle schema: content, rooms, categories, contact_submissions | `lib/db/schema.ts` |
| 2 | DB client with Drizzle + `@vercel/postgres` | `lib/db.ts` |
| 3 | Content type interfaces for all 14 keys | `lib/types/content.ts` |
| 4 | Seed script — extract hardcoded data from source components, upsert into DB. Must be idempotent (re-runnable). Map room category strings to category IDs. | `lib/db/seed.ts` |
| 5 | Auth helpers: `createSession()`, `verifySession()` using jose | `lib/auth.ts` |
| 6 | Middleware: protect `/admin/*` except `/admin/login` | `middleware.ts` |
| 7 | Login route with rate limiting (5/min per IP) | `app/api/auth/login/route.ts` |
| 8 | Logout route: clear cookie | `app/api/auth/logout/route.ts` |
| 9 | Login page: password field + submit + error state | `app/admin/login/page.tsx` |
| 10 | Admin layout: sidebar + header + sonner Toaster | `app/admin/layout.tsx` |
| 11 | Admin sidebar with nav links | `components/admin/admin-sidebar.tsx` |
| 12 | Dashboard page: stat cards (rooms count, categories count, unread messages count) + quick-link grid | `app/admin/page.tsx` |

**Seed data sources (exact locations):**
| Content key | Source file + lines |
|-------------|-------------------|
| hero | `components/hero.tsx` — tagline (L31), headline (L45), subtitle (L54-55), cta (L68), bg image (L20) |
| philosophy | `components/philosophy.tsx` — title (L33), description (L37-40), image (L19), features (L48-63) |
| moodboards | `components/moodboard.tsx` — section title (L36), description (L39-40), items array (L6-21) |
| before-after | `components/before-after.tsx` — title (L36), subtitle (L38), images (L63, L75), labels (L99, L102) |
| featured-projects | `components/featured-projects.tsx` — tagline (L34), title (L36) |
| services | `components/services.tsx` — items array (L6-27), section heading from JSX |
| process-steps | `components/process.tsx` — subtitle (L164-166), items array (L6-42) |
| testimonials | `components/testimonial.tsx` — items array (L7-29) |
| contact | `components/contact.tsx` — tagline (L42), title (L44), subtitle (L48-49), email (L61), location (L75), project types (L154-159) |
| about | `app/about/about-client.tsx` — tagline (L27), title (L32), intro paragraphs (L49-72), values (L84-112), approach (L118-124), cta (L134-137) |
| social-links | `components/footer.tsx` — all `href="#"` (L52-82) |
| site-settings | `app/layout.tsx` — meta (L22-33), `components/header.tsx` — logos (L44-53) |
| rooms | `lib/rooms-data.ts` — 7 rooms (L21-152) |
| categories | `components/projects-grid.tsx` — 6 categories with images (L7-43) |

### Phase 2: Server Actions + Upload + Admin Pages
**Goal:** Edit all content in admin, save to DB, upload images.

| # | Task | File(s) |
|---|------|---------|
| 13 | Zod schemas for all 14 content keys (shared client + server) | `lib/data/schemas.ts` |
| 14 | Repository: `getContent<T>(key)`, `setContent(key, data)`, room/category CRUD | `lib/data/repository.ts` |
| 15 | Icon name → Lucide component map: `{ Home, Layers, Palette, Lightbulb, MessageSquare, Box, Image, Presentation }` | `lib/data/icons.ts` |
| 16 | Content server actions: `updateContent(section, data)` + `revalidateTag(section)` | `lib/actions/content.ts` |
| 17 | Room server actions: create/update/delete + `revalidateTag('rooms')` | `lib/actions/rooms.ts` |
| 18 | Category server actions: CRUD + `revalidateTag('categories')` | `lib/actions/categories.ts` |
| 19 | Upload route: return Vercel Blob client-upload token (browser uploads directly, not through server) | `app/api/admin/upload/route.ts` |
| 20 | Image upload component: drag & drop, preview, progress bar, uses `@vercel/blob/client` `upload()` | `components/admin/image-upload.tsx` |
| 21 | Array field editor: generic add/remove/reorder rows | `components/admin/array-field-editor.tsx` |
| 22 | Icon picker: dropdown showing available Lucide icons with preview | `components/admin/icon-picker.tsx` |
| 23 | Color swatch editor: add/remove swatches with color picker | `components/admin/color-swatch-editor.tsx` |
| 24 | Room form: react-hook-form + zodResolver, image gallery, color swatches | `components/admin/room-form.tsx` |
| 25 | Settings page: 3 cards — Contact Info, Social Links, Site Metadata. Each card is a react-hook-form with zodResolver + shadcn Form | `app/admin/settings/page.tsx` |
| 26 | Components page: 5 tabs — Services, Process, Testimonials, Moodboards, Before-After. Each tab uses array-field-editor for items. | `app/admin/components/page.tsx` |
| 27 | Pages page: 3 tabs — Hero (text + image upload), Philosophy (text + features + image), About (paragraphs + values + CTA) | `app/admin/pages/page.tsx` |
| 28 | Projects list: room cards grid + category management panel. Room cards show thumbnail, title, category. Categories show title + drag-to-reorder | `app/admin/projects/page.tsx` |
| 29 | Edit room page: room-form component pre-filled from DB | `app/admin/projects/[id]/page.tsx` |
| 30 | Create room page: empty room-form | `app/admin/projects/new/page.tsx` |

### Phase 3: Contact Form Backend
**Goal:** Contact form sends email + stores in DB + viewable in admin.

| # | Task | File(s) |
|---|------|---------|
| 31 | Contact server action: validate with Zod, insert into contact_submissions, send notification via Resend to `NOTIFY_EMAIL`, return success/error | `lib/actions/contact.ts` |
| 32 | Update contact component: replace `setTimeout` mock (L25) with server action call. Add client-side Zod validation via react-hook-form for instant field errors. Add honeypot field for spam. | `components/contact.tsx` |
| 33 | Messages server actions: getSubmissions (with filter), updateStatus, deleteSubmission, getUnreadCount | `lib/actions/messages.ts` |
| 34 | Messages admin page: table with status dot, name, email, project type, date. Filter tabs (All/Unread/Archived). Click row → Sheet shows full message + auto-marks read. Actions: Mark Read/Unread, Archive, Delete. | `app/admin/messages/page.tsx` |
| 35 | Add unread count badge to admin sidebar (fetch via `getUnreadCount()`) | `components/admin/admin-sidebar.tsx` |

### Phase 4: Frontend Migration
**Goal:** Frontend reads from DB. Site looks identical. No hardcoded data.

Migrate components **incrementally** — not all at once. Each component gets a Props interface, parent passes data.

**Step A — Data fetching hub + simple components:**

| # | Task | Notes |
|---|------|-------|
| 36 | `app/page.tsx`: convert to async server component, fetch all content via `getContent()` with `unstable_cache` + tags, pass as props to children | Currently imports 12 components with no props |
| 37 | `hero.tsx`: add `HeroProps` interface, receive `{ tagline, headline, subtitle, ctaText, backgroundImage }` | Currently hardcodes 5 strings in JSX |
| 38 | `philosophy.tsx`: add `PhilosophyProps`, receive `{ title, description, image, features }` | Hardcodes title, description, image src, and 4 feature items |
| 39 | `moodboard.tsx`: add `MoodboardProps`, receive `{ sectionTitle, sectionDescription, items }` | Hardcodes `moodboards` array at top |
| 40 | `before-after.tsx`: add `BeforeAfterProps`, receive `{ title, subtitle, beforeImage, afterImage, beforeLabel, afterLabel }` | Hardcodes image paths and label text |
| 41 | `testimonial.tsx`: add `TestimonialProps`, receive `{ items }` | Hardcodes `testimonials` array at top |

**Step B — Components that read from rooms-data or have complex data:**

| # | Task | Notes |
|---|------|-------|
| 42 | `services.tsx`: add `ServicesProps`, receive `{ sectionTagline, sectionTitle, items }`. Use icon map to resolve `iconName` → Lucide component. | Hardcodes 4 service objects with direct icon imports |
| 43 | `process.tsx`: add `ProcessProps`, receive `{ sectionSubtitle, items }`. Items carry `iconName` strings, resolved via icon map. | Hardcodes 5 steps with inline `<Icon />` JSX — must serialize to icon name strings |
| 44 | `featured-projects.tsx`: receive rooms list as prop instead of importing from `rooms-data` | Currently `import { rooms } from '@/lib/rooms-data'` at L6 |
| 45 | `projects-grid.tsx`: receive categories array as prop instead of hardcoded `projectCategories` | Hardcodes 6 category objects at L7-43 |
| 46 | `contact.tsx`: receive `{ sectionTagline, sectionTitle, sectionSubtitle, email, locationText, projectTypes }` | Hardcodes strings in JSX + 4 option values in select |

**Step C — Layout components + About page:**

| # | Task | Notes |
|---|------|-------|
| 47 | `header.tsx`: receive `{ logoLight, logoDark }` from site-settings | Currently hardcodes `/logo-black.png` and `/logo-color.png` |
| 48 | `footer.tsx`: receive `{ email, socialLinks, logoLight, logoDark }` | Hardcodes email, logo paths, and 4 social link `href="#"` |
| 49 | `app/about/page.tsx`: make async, fetch about + social-links + site-settings content, pass to `about-client.tsx` | About page imports Header/Footer which also need data — pass through |
| 50 | `about-client.tsx`: receive all about data + social links + logo paths as props | Currently hardcodes all text, values, approach paragraphs, social links |
| 51 | `lib/rooms-data.ts`: make `getRoomBySlug`, `getRoomsByCategory`, etc. async — read from DB via repository | Currently synchronous, reads from hardcoded array |
| 52 | Update `app/room/[slug]/page.tsx` and `app/category/[slug]/page.tsx` to use async data layer | |

**Step D — Config cleanup:**

| # | Task | Notes |
|---|------|-------|
| 53 | `next.config.mjs`: add `images.remotePatterns` for `*.public.blob.vercel-storage.com`, remove `images.unoptimized: true`, remove `typescript.ignoreBuildErrors: true` | Currently has both escape hatches enabled |
| 54 | Fix any TypeScript errors surfaced by removing `ignoreBuildErrors` | |

### Phase 5: Polish
| # | Task |
|---|------|
| 55 | Loading skeletons on all admin pages (shadcn Skeleton component) |
| 56 | Success/error toasts on all admin forms via Sonner (`toast.success()` / `toast.error()`) |
| 57 | Tiptap rich text editor for About page `introParagraphs` and `approachParagraphs` — install `@tiptap/react @tiptap/starter-kit @tiptap/pm` now |
| 58 | Optimistic UI on admin forms: use `useTransition` so the form shows saved state immediately while server action runs |
| 59 | Delete `components/furniture-carousel.tsx` (dead code — not imported anywhere) |
| 60 | Address Privacy/Terms footer links (stub pages or remove links) |
| 61 | End-to-end verification (see checklist below) |

---

## Caching + Revalidation Strategy

Use `unstable_cache` with **per-section tags** for granular invalidation:

```ts
// lib/data/repository.ts
import { unstable_cache } from 'next/cache'

export function getContent<T>(key: string): Promise<T> {
  return unstable_cache(
    async () => { /* DB query */ },
    [key],
    { tags: [key] }
  )()
}
```

Server actions call `revalidateTag(section)` — not `revalidatePath('/')` — so editing "hero" doesn't invalidate "testimonials":

```ts
// lib/actions/content.ts
'use server'
import { revalidateTag } from 'next/cache'

export async function updateContent(section: string, data: unknown) {
  // ... validate, save to DB
  revalidateTag(section)  // Only invalidates this section's cache
}
```

---

## Admin UI Structure

```
/admin
  /login          — Password field + submit
  /               — Dashboard: stat cards + quick-link grid
  /pages          — Tabs: Hero / Philosophy / About
  /projects       — Room cards + category panel
  /projects/new   — Create room form
  /projects/[id]  — Edit room form
  /components     — Tabs: Services / Process / Testimonials / Moodboards / Before-After
  /settings       — Cards: Contact Info / Social Links / Site Metadata
  /messages       — Submissions table with filters + detail sheet
```

Sidebar: Dashboard, Pages, Projects, Components, Settings, Messages (unread badge).

---

## Verification Checklist

1. `npm run build` — succeeds with **no TypeScript errors** (ignoreBuildErrors removed)
2. `npm run dev` — frontend looks identical (data from DB, not hardcode)
3. `/admin` → redirect to login → enter password → dashboard with correct stats
4. Edit hero text → save → homepage shows updated text (via `revalidateTag('hero')`)
5. Create new room with uploaded images → appears on projects page
6. Delete a testimonial → gone from frontend
7. Upload image → stored in Vercel Blob → usable in any content field
8. Submit contact form → email arrives at `NOTIFY_EMAIL` + row appears in admin Messages
9. Mark message as read/archived → status updates in table
10. Edit About page paragraphs → about page reflects changes
11. Log out → can't access `/admin` → redirected to login
12. Run seed script twice → no duplicate data (idempotent)

---

## Things NOT in Scope

- Image cropping/resizing
- Role-based access (single admin only)
- Audit log of changes
- CAPTCHA (honeypot only for now)
- i18n / multi-language
