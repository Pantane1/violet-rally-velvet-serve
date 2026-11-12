# Violet Rally / Set & Slay

**[Premium fashion and beauty brand website](https://v-v-s.vercel.app)** — thrifted women's tops, lash services, and a tennis-inspired identity.


## Overview

Violet Rally / Set & Slay is a full-stack, server-rendered React website for a business
combining thrifted women's tops, eyelash services, and a tennis-inspired identity. All
brand, product, and service content is centralized in `src/config/site.ts` and
`src/data/*`, with optional Sanity.io CMS integration for non-technical inventory
management. Orders and lash appointments are handled through WhatsApp deep links (no
payment gateway is integrated).

## Tech stack

- **Frontend:** React 19, TypeScript 5.9, Vite 8
- **Full-stack SSR:** TanStack Start + TanStack Router (file-based routes)
- **Styling:** Tailwind CSS 4 (oklch design tokens in `src/styles.css`)
- **Deployment:** Nitro 3 (Vercel preset) — output in `.vercel/output`
- **CMS:** Sanity.io (optional, with graceful static fallback)
- **Email:** Resend (footer VIP-list subscription)
- **Testing:** Vitest 4 + Testing Library
- **Quality:** ESLint 9 + Prettier, strict TypeScript
- **State/data:** TanStack Query (router context)

## Getting started

```sh
npm ci
npm run dev        # http://localhost:8080
```

## Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Start the development server (Vite dev, SSR enabled) |
| `npm run build` | Production build (Vercel output) |
| `npm run preview` | Preview the production build locally (Nitro) |
| `npm run lint` | ESLint over the project |
| `npm run format` | Prettier formatting |
| `npm test` | Run unit tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run typecheck` | TypeScript type check (`tsc --noEmit`) |
| `npm run studio` | Launch Sanity Studio locally |
| `npm run studio:deploy` | Deploy Sanity Studio to sanity.io |

## Environment variables

Copy `.env.example` to `.env` and fill in real values. Never commit secrets.

| Variable | Purpose |
| :--- | :--- |
| `RESEND_API_KEY` | Resend API key for footer VIP-list subscription |
| `RESEND_AUDIENCE_ID` | Resend segment ID (e.g. the "violet list" segment) |
| `VITE_SANITY_PROJECT_ID` | Sanity project ID (optional; falls back to static data when unset) |
| `VITE_SANITY_DATASET` | Sanity dataset (default `production`) |
| `SANITY_REVALIDATE_SECRET` | Secret for the `/api/revalidate` webhook |

## Deployment (Vercel)

The project is configured for Vercel (`vercel.json` + `nitro({ preset: "vercel" })`
in `vite.config.ts`). Connect the repository to Vercel and it builds with
`npm run build`, serving from `.vercel/output/public`. WhatsApp number, email,
socials, hours and location live in `src/config/site.ts`; products in
`src/data/products.ts`; lash services in `src/data/services.ts`.

## CI pipeline

GitHub Actions (`.github/workflows/ci.yml`) runs on push to `main` and on pull
requests targeting `main`: `npm ci` -> `npm run typecheck` -> `npm run lint` ->
`npm run test` -> `npm run build`. All steps must pass before merge.

## Store owner guide

See `OWNER_GUIDE.md` for a jargon-free guide covering login, publishing thrifted
tops, marking items sold out, managing lash services and aftercare, and how
updates go live automatically via ISR revalidation.

## License

Proprietary - All Rights Reserved. See [LICENSE](https://github.com/Pantane1/violet-rally-velvet-serve/blob/main/LICENSE).
