# Dynamic Category Management — Design Spec

**Date:** 2026-05-31  
**Status:** Approved

## Goal

Allow the admin to add, edit, and delete room categories from the UI instead of hardcoding them in `lib/rooms-data.ts`. The DB schema and server actions already exist; this spec covers the missing admin interface and supporting data-layer changes.

## Patterns Applied

- **Compound components** — `<Dialog>` with shared state via context (add/edit form)
- **Container/presentational split** — server component fetches, client component renders and manages dialog state
- **Schema-first design** — Zod schema is source of truth; types inferred from it
- **Repository pattern** — all DB reads go through `lib/data/repository.ts`
- **Thin controllers** — server actions validate, delegate, and return structured errors

---

## Section 1 — Data Layer

### `lib/data/schemas.ts`

Update `categorySchema`:

- `image` → `z.string().default("")` (remove `min(1)`; column stays NOT NULL in DB, we store `""` for categories without a cover image — no migration needed)
- `id` → `z.string().optional()` (generated from slug on create, present on update)
- `sort_order` → stays `z.number().default(0)`

### `lib/data/repository.ts`

Add:

```ts
export async function getRoomCountByCategoryId(categoryId: string): Promise<number>
```

Uses `db.select({ count: count() }).from(rooms).where(eq(rooms.category_id, categoryId))`. Used by the delete guard in the server action.

### `lib/actions/categories.ts`

Update `deleteCategory(id)`:

1. Call `getRoomCountByCategoryId(id)`
2. If count > 0 → return `{ error: "Cannot delete — ${count} room(s) are assigned to this category." }`
3. Otherwise proceed with `db.delete`

Update `createCategory(data)`:

- Derive `id` from slug if not provided (set `id = parsed.data.slug`)

---

## Section 2 — `/admin/categories` Page

### Files

| File | Role |
|---|---|
| `app/admin/categories/page.tsx` | Server component — fetches data |
| `app/admin/categories/categories-client.tsx` | Client component — dialog state, table |

### `page.tsx` (server component)

1. Call `getAllCategories()` from repository
2. For each category, call `getRoomCountByCategoryId(id)` — or do a single join query if preferred (simple approach: sequential calls are fine given low category count)
3. Pass `categories` (with attached room counts) to `<CategoriesClient />`

### `categories-client.tsx` (client component)

**State:**
- `dialogOpen: boolean` — controls Dialog visibility
- `editing: Category | null` — `null` = add mode, populated = edit mode

**Layout:**
```
[Categories heading]                    [Add Category button → opens dialog]

┌─────────────────┬──────────────────┬────────┬─────────────┐
│ Title           │ Slug             │ Rooms  │ Actions     │
├─────────────────┼──────────────────┼────────┼─────────────┤
│ Living Rooms    │ living-rooms     │ 3      │ Edit Delete │
│ Bedrooms        │ bedrooms         │ 2      │ Edit Delete │
└─────────────────┴──────────────────┴────────┴─────────────┘
```

**Dialog (add/edit form):**
- Title: `<input>` — on change, auto-populates slug via `slugify(title)` (lowercase, spaces → hyphens)
- Slug: `<input>` — editable manually if auto-generated slug isn't right; also serves as `id` on create
- Submit: calls `createCategory` (add mode) or `updateCategory(id, data)` (edit mode)
- On success: close dialog, `toast.success("Category saved")`
- On error: show field errors inline or `toast.error(message)`

**Delete flow:**
- Delete button calls `deleteCategory(id)` server action
- On `{ error }` response → `toast.error(error)`
- On `{ success }` → `toast.success("Category deleted")`
- No confirmation dialog (delete is blocked server-side for non-empty categories, so the risk of accidental loss is low)

---

## Section 3 — Sidebar

Update `components/admin/admin-sidebar.tsx`:

- Add `{ href: "/admin/categories", label: "Categories", icon: Tag }` after the Projects item
- Import `Tag` from `lucide-react`

---

## What This Does Not Cover

- Category cover images — `image` field stays in schema but is not surfaced in the form; can be added later
- Drag-to-reorder (`sort_order`) — not implemented; categories render in DB insertion order
- The static `categories` array in `lib/rooms-data.ts` — still used as a fallback on the public side when the DB is unavailable; no change needed for now
