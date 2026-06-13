"use server"

import { revalidateTag } from "next/cache"
import { setContent } from "@/lib/data/repository"
import { contentSchemaMap } from "@/lib/data/schemas"
import type { ContentKey, ContentMap } from "@/lib/types/content"
import { logActionError, toErrorMessage } from "@/lib/debug" // TEMP: instrumentation

export async function updateContent<K extends ContentKey>(
  section: K,
  data: ContentMap[K]
) {
  const schema = contentSchemaMap[section]
  const parsed = schema.safeParse(data)

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors }
  }

  try {
    await setContent(section, parsed.data as ContentMap[K])
    revalidateTag(section, "max")
    return { success: true }
  } catch (err) {
    logActionError(`updateContent:${section}`, err) // TEMP: instrumentation
    return { error: toErrorMessage(err) }
  }
}
