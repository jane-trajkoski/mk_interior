// TEMPORARY debugging instrumentation — remove once the "Something went wrong"
// save bug is diagnosed. Surfaces the real server-side error in the UI and the
// server logs instead of a generic message, so we can see the actual cause when
// the client saves. Safe to delete this file and revert the call sites after.

export function toErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  if (typeof err === "string") return err
  try {
    return JSON.stringify(err)
  } catch {
    return String(err)
  }
}

export function logActionError(label: string, err: unknown): void {
  // eslint-disable-next-line no-console
  console.error(`[action-error:${label}]`, err)
}
