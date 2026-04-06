# MK Interiors — Improved Admin Dashboard / CMS Plan

## Context

MK Interiors is a Next.js 16 interior design portfolio with all content hardcoded in components. The goal is to add an admin dashboard so a non-technical user can edit all website content, upload images, and receive contact form submissions — without touching code. Deployed on Vercel.

## Key Improvements Over Existing Plan

| # | Problem in existing plan | Improvement |
|---|--------------------------|-------------|
| 1 | Contact form explicitly deferred | **Contact form is now Phase 3** — stores submissions in DB + sends email via Resend |
| 2 | Custom HMAC auth from scratch | Use `jose` library for JWT signing/verification (same lib NextAuth uses internally) |
| 3 | Server-side image upload hits Vercel's 4.5MB body limit | Use Vercel Blob **client uploads** — browser uploads directly to CDN via signed token |
| 4 | react-hook-form + zod installed but plan never mentions using them | All admin forms use react-hook-form + zodResolver + shadcn Form component |
| 5 | No admin view of contact submissions | New "Messages" section in admin with read/unread/archive |
| 6 | 7 phases too granular | Consolidated to **5 phases** |
| 7 | Tiptap deferred entirely | Tiptap in Phase 5 for About page multi-paragraph fields |
| 8 | `ignoreBuildErrors: true` not addressed | Remove in Phase 4 after migration ensures type safety |

## Tech Stack

| Concern | Choice | Why |
|---------|--------|-----|
| Database | Vercel Postgres (Neon) | Native to Vercel, free 256MB, same-network low latency |
| ORM | Drizzle | Lightweight, TS-first, first-class JSONB with `.$type<T>()`, no codegen step |
| Image storage | Vercel Blob (client uploads) | Native to Vercel, free 250MB, avoids 4.5MB server limit |
| Auth | `jose` + single password | For single-admin, a full auth framework (NextAuth, better-auth) adds complexity for no benefit. `jose` handles JWT sign/verify in ~10 lines |
| Email | Resend | Free 100 emails/day, simple API, official Next.js SDK |
| Admin forms | react-hook-form + zod + shadcn Form | Already installed and unused — single Zod schema validates both client and server |
| Rich text | Tiptap (Phase 5) | Headless, style with own CSS, only for About page long-form content |
| Mutations | Server Actions | No fetch boilerplate, type-safe, automatic revalidation |

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
| slug | text unique | URL slug |
| image | text | Category card thumbnail URL |
| sort_order | integer | Display order on projects grid |

### `contact_submissions` table (NEW)

| Column | Type | Notes |
|--------|------|-------|
| id | serial PK | Auto-increment |
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
middleware.ts                              # Protect /admin/* routes

lib/
  auth.ts                                  # jose JWT session create/verify
  db.ts                                    # Drizzle ORM client + connection
  db/
    schema.ts                              # Drizzle table definitions
    migrate.ts                             # Migration runner
    seed.ts                                # Seed script (hardcoded data → DB)
  types/content.ts                         # TypeScript interfaces for all content
  data/
    repository.ts                          # getContent/setContent + room/category queries
    schemas.ts                             # Zod validation schemas (shared client+server)
    icons.ts                               # Icon name string → Lucide component map
  actions/
    content.ts                             # Server Actions: updateContent(section, data)
    rooms.ts                               # Server Actions: createRoom, updateRoom, deleteRoom
    categories.ts                          # Server Actions: CRUD categories
    contact.ts                             # Server Action: submitContactForm
    messages.ts                            # Server Actions: getSubmissions, updateStatus, delete

app/
  api/
    auth/login/route.ts                    # POST: verify password, set cookie
    auth/logout/route.ts                   # POST: clear cookie
    admin/upload/route.ts                  # POST: return Vercel Blob client upload token

  admin/
    layout.tsx                             # Admin shell (sidebar + header)
    page.tsx                               # Dashboard with stats + quick links
    login/page.tsx                         # Login page
    pages/page.tsx                         # Edit Hero, Philosophy, About (tabs)
    projects/page.tsx                      # Rooms list + categories
    projects/[id]/page.tsx                 # Edit room
    projects/new/page.tsx                  # Create room
    components/page.tsx                    # Edit Services, Process, Testimonials, Moodboards, Before/After (tabs)
    settings/page.tsx                      # Contact, Social Links, Site metadata
    messages/page.tsx                      # Contact form submissions

components/admin/
  admin-sidebar.tsx                        # Sidebar navigation (with unread badge)
  admin-header.tsx                         # Top bar with logout
  image-upload.tsx                         # Drag & drop → Vercel Blob client upload
  icon-picker.tsx                          # Lucide icon selector dropdown
  room-form.tsx                            # Room create/edit form
  color-swatch-editor.tsx                  # Add/remove color swatches
  array-field-editor.tsx                   # Reusable array-of-objects editor
```

---

## New Dependencies

```bash
# Runtime (8 packages)
npm i @vercel/postgres @vercel/blob drizzle-orm jose resend @tiptap/react @tiptap/starter-kit @tiptap/pm

# Dev (1 package)
npm i -D drizzle-kit
```

Everything else (react-hook-form, zod, shadcn, sonner, lucide) is already installed.

## Environment Variables

```env
POSTGRES_URL=               # Vercel Postgres connection string
BLOB_READ_WRITE_TOKEN=      # Vercel Blob access token
ADMIN_PASSWORD=             # Single admin password
SESSION_SECRET=             # JWT signing key (openssl rand -hex 32)
RESEND_API_KEY=             # From resend.com (free tier)
NOTIFY_EMAIL=               # Where contact notifications go (e.g. creativeinteriors.mk@gmail.com)
```

---

## Implementation Phases

### Phase 1: Database + Auth + Admin Shell
**Goal:** Log into `/admin` and see a working dashboard skeleton.

1. **Drizzle schema** — `lib/db/schema.ts`: content, rooms, categories, contact_submissions tables
2. **DB client** — `lib/db.ts`: Drizzle + `@vercel/postgres` connection
3. **Migration runner** — `lib/db/migrate.ts`
4. **Seed script** — `lib/db/seed.ts`: extract hardcoded data from all 13+ source components into DB
5. **Auth helpers** — `lib/auth.ts`: `createSession()` / `verifySession()` using `jose` SignJWT/jwtVerify
6. **Middleware** — `middleware.ts`: protect `/admin/*`, redirect to login if no valid cookie
7. **Auth routes** — `app/api/auth/login/route.ts`, `app/api/auth/logout/route.ts`
8. **Login page** — `app/admin/login/page.tsx`
9. **Admin layout** — `app/admin/layout.tsx` with sidebar + header
10. **Admin sidebar** — `components/admin/admin-sidebar.tsx` (uses existing shadcn Sidebar)
11. **Dashboard home** — `app/admin/page.tsx` with stats cards (total rooms, categories, unread messages) + quick-link grid to each admin section

**Key files to read for seed data:**
- `components/hero.tsx` (inline JSX strings)
- `components/philosophy.tsx`, `components/services.tsx`, `components/process.tsx`
- `components/testimonial.tsx`, `components/moodboard.tsx`, `components/before-after.tsx`
- `components/contact.tsx`, `components/footer.tsx`, `components/featured-projects.tsx`
- `components/projects-grid.tsx` (category images + section text)
- `app/about/about-client.tsx` (values, approach, CTA)
- `lib/rooms-data.ts` (rooms + categories)

### Phase 2: Server Actions + Upload + Admin Pages
**Goal:** Edit all content in admin, save to DB, upload images.

12. **Content types** — `lib/types/content.ts`: TypeScript interfaces for all 13 content keys
13. **Zod schemas** — `lib/data/schemas.ts`: shared between server validation and react-hook-form
14. **Repository** — `lib/data/repository.ts`: `getContent()`, `setContent()`, room/category CRUD
15. **Icon map** — `lib/data/icons.ts`: icon name string → Lucide component
16. **Content actions** — `lib/actions/content.ts`: `updateContent(section, data)` + `revalidatePath()`
17. **Room actions** — `lib/actions/rooms.ts`: create/update/delete + revalidation
18. **Category actions** — `lib/actions/categories.ts`: create/update/delete + revalidation
19. **Upload endpoint** — `app/api/admin/upload/route.ts`: returns client upload token (Vercel Blob client upload — browser uploads directly, avoids 4.5MB limit)
20. **Reusable admin components:**
    - `components/admin/image-upload.tsx` — drag & drop with preview, uses `@vercel/blob/client` `upload()`
    - `components/admin/array-field-editor.tsx` — generic add/remove/reorder for arrays of objects
    - `components/admin/icon-picker.tsx` — Lucide icon selector
    - `components/admin/color-swatch-editor.tsx` — add/remove color swatches
    - `components/admin/room-form.tsx` — room create/edit with react-hook-form
21. **Admin pages** (all use react-hook-form + zodResolver + shadcn Form):
    - `app/admin/settings/page.tsx` — Contact Info, Social Links, Site Metadata (3 cards)
    - `app/admin/components/page.tsx` — Services, Process, Testimonials, Moodboards, Before-After (5 tabs)
    - `app/admin/pages/page.tsx` — Hero, Philosophy, About (3 tabs)
    - `app/admin/projects/page.tsx` — Room list + category management
    - `app/admin/projects/[id]/page.tsx` — Edit room
    - `app/admin/projects/new/page.tsx` — Create room

### Phase 3: Contact Form Backend
**Goal:** Contact form actually works — sends email + stores in DB + viewable in admin.

22. **Contact server action** — `lib/actions/contact.ts`:
    - Validates with Zod (name, email required; phone, projectType optional; message required)
    - Inserts into `contact_submissions` table
    - Sends notification email via Resend to `NOTIFY_EMAIL`
    - Returns success/error
23. **Migrate Contact component** — update `components/contact.tsx` to call the server action instead of `setTimeout`
24. **Admin Messages page** — `app/admin/messages/page.tsx`:
    - Table view with columns: status dot, name, email, project type, date, actions
    - Filter tabs: All / Unread / Archived (shadcn Tabs)
    - Click row → Sheet/Dialog shows full message, auto-marks as read
    - Actions dropdown: Mark Read/Unread, Archive, Delete
    - Unread count badge in admin sidebar
25. **Contact admin actions** — `lib/actions/messages.ts`: getSubmissions, updateStatus, deleteSubmission, getUnreadCount

### Phase 4: Frontend Migration
**Goal:** Frontend reads from DB instead of hardcoded data. Site looks identical.

26. **Update `app/page.tsx`** — server component fetches all content from DB, passes as props to each section
27. **Migrate components** (each gets a Props interface, receives data instead of hardcoding):
    - `hero.tsx`, `philosophy.tsx`, `projects-grid.tsx`, `moodboard.tsx`
    - `before-after.tsx`, `featured-projects.tsx`, `services.tsx`, `process.tsx`
    - `testimonial.tsx`, `contact.tsx`, `footer.tsx`, `header.tsx`
    - `app/about/about-client.tsx`
28. **Update `lib/rooms-data.ts`** — functions become async, read from DB
29. **Update room/category/about pages** — use async data layer
30. **Update `next.config.mjs`:**
    - Add `images.remotePatterns` for `*.public.blob.vercel-storage.com`
    - Remove `images.unoptimized: true`
    - Remove `typescript.ignoreBuildErrors: true`

### Phase 5: Polish
31. Loading skeletons on admin pages (shadcn Skeleton component)
32. Success/error toasts on all admin forms (Sonner — already installed)
33. Honeypot field on contact form for basic spam protection
34. Tiptap rich text editor for About page `introParagraphs` and `approachParagraphs` (bold, italic, links, paragraphs)
35. Remove `furniture-carousel.tsx` (dead code — not imported anywhere)
36. Address Privacy/Terms footer links (stub pages or remove links)
37. End-to-end verification

---

## Authentication Flow

1. User visits `/admin` → middleware checks for `admin_session` cookie
2. No valid cookie → redirect to `/admin/login`
3. User enters password → POST `/api/auth/login`
4. Server compares with `ADMIN_PASSWORD` env var (timing-safe)
5. On match: create JWT signed with `SESSION_SECRET` via `jose`, set HttpOnly cookie (7 days)
6. Middleware verifies JWT signature on subsequent requests

## Admin UI Structure

```
/admin
  /login          — Password login
  /               — Dashboard (stats cards + quick links)
  /pages          — Tabs: Hero / Philosophy / About
  /projects       — Room cards grid + category management
  /projects/new   — Create room form
  /projects/[id]  — Edit room form
  /components     — Tabs: Services / Process / Testimonials / Moodboards / Before-After
  /settings       — Cards: Contact Info / Social Links / Site Metadata
  /messages       — Contact form submissions (table with read/unread/archive)
```

Sidebar shows: Dashboard, Pages, Projects, Components, Settings, Messages (with unread badge).

## Frontend Migration Pattern

1. `app/page.tsx` (server component) becomes the data hub — fetches all content from DB, passes as props
2. Each component gets a `Props` interface and receives data instead of hardcoding
3. `lib/rooms-data.ts` functions become async, read from DB
4. Room/category pages updated to use async data layer
5. Server Actions call `revalidatePath()` after writes for instant updates
6. Enable `next/image` with Vercel Blob `remotePatterns`

**Components to migrate** (13 total):
- `hero.tsx`, `philosophy.tsx`, `projects-grid.tsx`, `moodboard.tsx`
- `before-after.tsx`, `featured-projects.tsx`, `services.tsx`, `process.tsx`
- `testimonial.tsx`, `contact.tsx`, `footer.tsx`, `header.tsx`
- `app/about/about-client.tsx`

---

## Verification Plan

1. `npm run dev` — frontend looks identical (data from DB, not hardcode)
2. `/admin` → redirect to login → enter password → see dashboard with stats
3. Edit hero text → save → homepage shows updated text instantly
4. Create new room with uploaded images → appears on projects page
5. Delete a testimonial → gone from frontend
6. Upload image → stored in Vercel Blob → usable in content
7. **Submit contact form → email received at NOTIFY_EMAIL + appears in admin Messages**
8. Mark message as read/archived in admin → status updates
9. Edit about page with Tiptap → about page reflects rich text changes
10. Log out → can't access `/admin`
11. `npm run build` succeeds with no TypeScript errors

---

## Future Enhancements (out of scope)

- Image cropping/resizing in the upload flow
- Role-based access if more than one admin is needed
- Audit log of content changes
- Turnstile CAPTCHA if spam becomes an issue
