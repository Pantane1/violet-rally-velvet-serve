import { createFileRoute } from "@tanstack/react-router";

import { handleRevalidate } from "@/lib/revalidate";

async function purgePaths(paths: string[]): Promise<void> {
  // Best-effort Nitro cache purge. Nitro auto-imports `useStorage`; access it
  // defensively so this route still works (and type-checks) if unavailable.
  const nitroStorage = (
    globalThis as {
      useStorage?: (mount?: string) => { removeItem: (key: string) => Promise<void> };
    }
  ).useStorage;
  if (typeof nitroStorage !== "function") return;
  const storage = nitroStorage("cache");
  for (const path of paths) {
    for (const key of [`nitro:handlers:${path}`, `nitro:cache:${path}`, path]) {
      try {
        await storage.removeItem(key);
      } catch {
        // Ignore missing keys.
      }
    }
  }
}

export const Route = createFileRoute("/api/revalidate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const url = new URL(request.url);
        const secret = request.headers.get("x-sanity-signature") ?? url.searchParams.get("secret");

        let body: unknown = null;
        try {
          body = await request.json();
        } catch {
          body = null;
        }

        const expected = process.env["SANITY_REVALIDATE_SECRET"];
        const result = await handleRevalidate({
          secret,
          expectedSecret: expected,
          payload: body,
          purge: purgePaths,
        });

        return Response.json(result.body, { status: result.status });
      },
    },
  },
});
