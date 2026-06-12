/**
 * One-off migration: normalize all category ids/slugs and room slugs to
 * lowercase URL-safe form (see slugify in lib/utils).
 *
 * Dry run (default):  npx tsx --env-file=.env.local scripts/normalize-slugs.ts
 * Apply:              npx tsx --env-file=.env.local scripts/normalize-slugs.ts --apply
 */
import { neon } from "@neondatabase/serverless"
import { slugify } from "../lib/utils"

const apply = process.argv.includes("--apply")
const sql = neon(process.env.POSTGRES_URL!)

function uniqueSlug(base: string, taken: Set<string>) {
  let candidate = base
  let n = 2
  while (taken.has(candidate)) candidate = `${base}-${n++}`
  taken.add(candidate)
  return candidate
}

async function main() {
  // --- Categories (id is the FK target and the URL key, so keep id === slug) ---
  const cats = await sql`select id, title, slug, image, sort_order from categories order by sort_order`
  const catTaken = new Set<string>(
    cats.filter((c) => slugify(c.slug) === c.slug && c.id === c.slug).map((c) => c.slug)
  )
  const catChanges: { oldId: string; cat: (typeof cats)[number]; newId: string }[] = []
  for (const c of cats) {
    if (slugify(c.slug) === c.slug && c.id === c.slug) continue
    const newId = uniqueSlug(slugify(c.slug) || slugify(c.title) || `category-${c.sort_order}`, catTaken)
    catChanges.push({ oldId: c.id, cat: c, newId })
  }

  // --- Rooms ---
  const rooms = await sql`select id, slug, sort_order from rooms order by sort_order, id`
  const roomTaken = new Set<string>(rooms.filter((r) => slugify(r.slug) === r.slug).map((r) => r.slug))
  const roomChanges: { id: string; oldSlug: string; newSlug: string }[] = []
  for (const r of rooms) {
    if (slugify(r.slug) === r.slug) continue
    const newSlug = uniqueSlug(slugify(r.slug) || `room-${r.id}`, roomTaken)
    roomChanges.push({ id: r.id, oldSlug: r.slug, newSlug })
  }

  console.log(`Categories to update: ${catChanges.length}`)
  for (const { oldId, newId } of catChanges) console.log(`  ${JSON.stringify(oldId)} -> ${JSON.stringify(newId)}`)
  console.log(`Rooms to update: ${roomChanges.length}`)
  for (const { oldSlug, newSlug } of roomChanges) console.log(`  ${JSON.stringify(oldSlug)} -> ${JSON.stringify(newSlug)}`)

  if (!apply) {
    console.log("\nDry run — pass --apply to write these changes.")
    return
  }

  // Category id is rooms.category_id's FK target: insert the new row,
  // repoint rooms, then drop the old row.
  for (const { oldId, cat, newId } of catChanges) {
    await sql`insert into categories (id, title, slug, image, sort_order)
              values (${newId}, ${cat.title}, ${newId}, ${cat.image}, ${cat.sort_order})`
    await sql`update rooms set category_id = ${newId} where category_id = ${oldId}`
    await sql`delete from categories where id = ${oldId}`
    console.log(`Updated category ${JSON.stringify(oldId)} -> ${JSON.stringify(newId)}`)
  }

  // Two-phase rename so transient collisions can't trip the unique constraint
  // (e.g. one row's target slug is another changing row's current slug).
  for (const { id } of roomChanges) {
    await sql`update rooms set slug = ${"tmp-slug-" + id} where id = ${id}`
  }
  for (const { id, oldSlug, newSlug } of roomChanges) {
    await sql`update rooms set slug = ${newSlug} where id = ${id}`
    console.log(`Updated room slug ${JSON.stringify(oldSlug)} -> ${JSON.stringify(newSlug)}`)
  }

  console.log("\nDone.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
