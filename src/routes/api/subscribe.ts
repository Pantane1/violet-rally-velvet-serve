import { createFileRoute } from "@tanstack/react-router";

import { subscribeEmail } from "@/lib/subscribe";

export const Route = createFileRoute("/api/subscribe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let email = "";
        try {
          const body = (await request.json()) as { email?: unknown };
          email = typeof body?.email === "string" ? body.email : "";
        } catch {
          return Response.json(
            { success: false, message: "Invalid request body." },
            { status: 400 },
          );
        }

        const result = await subscribeEmail(email);
        return Response.json(result, { status: result.success ? 200 : 400 });
      },
    },
  },
});
