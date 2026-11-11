/**
 * Pure helpers for the Sanity on-demand revalidation webhook.
 *
 * Kept free of framework/IO so the rules can be unit-tested in isolation.
 */

export interface RevalidatePayload {
  _type?: string;
  slug?: string | { current?: string };
  [key: string]: unknown;
}

export interface RevalidateResult {
  status: number;
  body: { revalidated?: boolean; now?: number; error?: string };
}

/** Constant-time-ish comparison of two secrets. */
export function verifySecret(
  provided: string | null | undefined,
  expected: string | undefined,
): boolean {
  if (!expected || !provided) return false;
  if (provided.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

/** Resolve the document slug from a Sanity payload. */
export function resolveSlug(payload: RevalidatePayload): string | null {
  if (typeof payload.slug === "string") return payload.slug;
  if (
    payload.slug &&
    typeof payload.slug === "object" &&
    typeof payload.slug.current === "string"
  ) {
    return payload.slug.current;
  }
  return null;
}

/**
 * Determine which paths to revalidate for a given payload.
 * Returns null when the payload is invalid.
 */
export function getRevalidatePaths(payload: unknown): string[] | null {
  if (!payload || typeof payload !== "object") return null;
  const { _type } = payload as RevalidatePayload;
  if (typeof _type !== "string" || _type.length === 0) return null;

  const paths = ["/shop", "/lash"];
  const slug = resolveSlug(payload as RevalidatePayload);

  if (_type === "product" && slug) {
    paths.push(`/shop/${slug}`);
  }

  return paths;
}

export interface RevalidateInput {
  secret: string | null;
  expectedSecret: string | undefined;
  payload: unknown;
  purge?: (paths: string[]) => Promise<void> | void;
}

export async function handleRevalidate(input: RevalidateInput): Promise<RevalidateResult> {
  const { secret, expectedSecret, payload, purge } = input;

  if (!verifySecret(secret, expectedSecret)) {
    return { status: 401, body: { error: "Invalid secret" } };
  }

  const paths = getRevalidatePaths(payload);
  if (!paths) {
    return { status: 400, body: { error: "Invalid payload" } };
  }

  if (purge) {
    try {
      await purge(paths);
    } catch {
      // Best-effort: never fail the webhook because of a cache purge error.
    }
  }

  return { status: 200, body: { revalidated: true, now: Date.now() } };
}
