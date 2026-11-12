# Violet Rally / Set & Slay — Build Roadmap

Production site: https://v-v-s.vercel.app
Sanity Studio: https://violet-rally.sanity.studio/
Repository: https://github.com/Pantane1/violet-rally-velvet-serve

## Completed Engineering Missions

- [x] Mission 01 — Repository setup & Lovable cleanup (removed platform scaffolding, error telemetry, promotional docs)
- [x] Mission 02 — Senior developer audit & professionalization roadmap
- [x] Mission 02.1 — GitHub Actions CI workflow (lint → typecheck → test → build)
- [x] Mission 02.2 — Dependency & dead-code purge (unused shadcn/ui scaffold + ~20 unused packages)
- [x] Mission 02.3 — Real business contact data + Vercel deployment switch
- [x] Mission 02.4 — SEO pack, mobile menu accessibility, product gallery interactivity
- [x] Mission 02.5 — Extracted booking form validation + expanded unit tests
- [x] Mission 02.6 — License, security policy, production README
- [x] Mission 03.1 — Resend footer email subscription (VIP list)
- [x] Mission 04.1 — Product route nesting fix, Resend endpoint hardening, typecheck in CI
- [x] Mission 04.2 — SSR hydration, accessibility headers, JSON-LD schemas, WhatsApp order format
- [x] Mission 04.3 — Nitro ISR caching, security headers, mobile collapsible filters, nitro preview
- [x] Mission 04.4 — Lockfile sync to unblock GitHub CI
- [x] Mission 05.1 — Sanity.io CMS integration with graceful static fallbacks
- [x] Mission 05.2 — Sanity Studio configuration & deploy scripts
- [x] Mission 05.3 — Sanity Studio deployed (https://violet-rally.sanity.studio/)
- [x] Mission 06.1 — Sanity on-demand ISR revalidation webhook (/api/revalidate)
- [x] Mission 06.2 — Sanity image pipeline optimization, vendor chunk splitting
- [x] Mission 07 — Final production SEO audit & store owner handoff (OWNER_GUIDE.md)
- [x] Mission 07.1 — Repository documentation update for v1.0 launch

## Production Milestones

- [x] Live site: https://v-v-s.vercel.app
- [x] Sanity Studio: https://violet-rally.sanity.studio/
- [x] Revalidation webhook: /api/revalidate
- [x] VIP subscription endpoint: /api/subscribe
- [x] CI pipeline: .github/workflows/ci.yml (typecheck → lint → test → build)
- [x] Proprietary license + security disclosure policy

## Post-Launch / Business Operations

Remaining work is business-content and measurement tasks, not engineering blockers:

- [ ] Upload real product inventory and pricing in Sanity Studio (see OWNER_GUIDE.md)
- [ ] Upload real lash service menu and aftercare steps
- [ ] Replace social profile URLs (Instagram, TikTok) in src/config/site.ts
- [ ] Set real opening hours and business location (currently "By appointment only")
- [ ] Supply founder name and bio copy for the About page
- [ ] Replace placeholder brand tagline/copy if desired
- [ ] Run Lighthouse on the Vercel preview URL for /shop and /lash (mobile, throttled) and record LCP/CLS/INP
- [ ] Set Vercel environment variables: RESEND_API_KEY, RESEND_AUDIENCE_ID, SANITY_REVALIDATE_SECRET
- [ ] Configure the Sanity webhook to point at https://v-v-s.vercel.app/api/revalidate
- [ ] Decide and document analytics/conversion tracking (privacy-first) if needed
- [ ] Optional: remove remaining Vite tsconfig-paths deprecation warning (use resolve.tsconfigPaths)
