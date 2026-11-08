import { createFileRoute } from "@tanstack/react-router";

import { subscribeEmail } from "@/lib/subscribe";

const ALLOWED_ORIGINS = new Set<string>();

function isOriginAllowed(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // same-origin / non-browser clients
  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    if (originUrl.host === requestUrl.host) return true;
    if (originUrl.hostname === "localhost" || originUrl.hostname === "127.0.0.1") return true;
    if (ALLOWED_ORIGINS.has(origin)) return true;
    return false;
  } catch {
    return false;
  }
}

export const Route = createFileRoute("/api/subscribe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isOriginAllowed(request)) {
          return Response.json({ success: false, message: "Forbidden." }, { status: 403 });
        }

        let body: { email?: unknown; company?: unknown } = {};
        try {
          body = (await request.json()) as { email?: unknown; company?: unknown };
        } catch {
          return Response.json(
            { success: false, message: "Invalid request body." },
            { status: 400 },
          );
        }

        // Honeypot: bots fill the hidden "company" field; humans never do.
        if (typeof body.company === "string" && body.company.trim() !== "") {
          return Response.json(
            { success: true, message: "Subscribed (dev mode)" },
            { status: 200 },
          );
        }

        const email = typeof body.email === "string" ? body.email : "";
        const result = await subscribeEmail(email);
        return Response.json(result, { status: result.success ? 200 : 400 });
      },
    },
  },
});
