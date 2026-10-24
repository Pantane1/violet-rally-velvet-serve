# Violet Rally Velvet Serve

Build a Premium Fashion & Beauty Brand Website — Violet Rally / Set & Slay



Act as a senior UI/UX designer, brand strategist, and full-stack developer. Build a complete, polished, mobile-first business website for a young female entrepreneur whose business combines thrifted women's tops, eyelash services, and her personal love for tennis.



This must feel like a professionally art-directed fashion and beauty brand, not a generic e-commerce template.



1. Brand Identity



Use Violet Rally as the initial working brand name, but keep the brand name easy to change throughout the project.



Brand personality:



- Feminine, confident, elegant, stylish, and youthful.

- Premium fashion editorial mixed with modern beauty studio aesthetics.

- Subtle tennis-inspired personality.

- Visually memorable, with a strong and consistent purple identity.



Suggested tagline: "Your style. Your glow. Your court."



Supporting message: "Curated fits. Beautiful lashes. Unapologetically you."



2. Visual Design System



Create a cohesive visual identity using this palette:



- Royal plum: "#542478"

- Lavender: "#A987D2"

- Lilac mist: "#F5EFFA"

- Charcoal: "#27212D"

- Tennis lime accent: "#D4F06A"

- White: "#FFFFFF"



Use royal plum for brand elements and primary buttons, lilac mist for soft backgrounds, charcoal for typography, and tennis lime sparingly for distinctive accents.



Typography:



- Elegant editorial serif headings.

- Clean, modern sans-serif body text.

- Beautiful typography hierarchy with generous whitespace.



Design direction:



- Premium fashion magazine layouts.

- Large, beautiful photography.

- Refined borders and rounded corners.

- Subtle gradients and glass effects only where appropriate.

- Smooth, tasteful animations and hover transitions.

- A distinctive logo combining an elegant wordmark with a subtle tennis-court line or tennis-ball curve.

- No excessive tennis graphics, random gradients, generic AI-looking illustrations, or cluttered layouts.



Use high-quality fashion, eyelash, and tennis lifestyle imagery that matches the visual identity. Never use unrelated placeholder images. If real business photography is unavailable, use suitable temporary imagery that can easily be replaced.



3. Homepage



Build a striking, premium hero section with an editorial image composition, a clear headline, and two prominent calls to action.



Headline:

"Your style. Your glow. Your court."



Description:

"Discover curated women's fashion and beautiful lash looks, all in one place."



Primary CTA: "Shop the Collection"

Secondary CTA: "Explore Lash Services"



Include a subtle tennis-inspired decorative element without making the website look like a sports store.



Below the hero, add:



1. A featured fashion collection.

2. A lash services preview.

3. A "Meet the Founder" section.

4. A stylish brand-story section explaining the connection between confidence, personal style, beauty, and tennis.

5. A featured products section.

6. Customer testimonials, only when real testimonials are provided.

7. A final conversion section with WhatsApp contact and social links.

8. A complete branded footer.



4. Fashion Store — Shop the Fits



Create a dedicated shop page for thrifted women's tops.



Features:



- Beautiful product-card grid.

- Product photographs.

- Product name, price, available sizes, condition, and stock status.

- Categories such as tops, blouses, crop tops, and other categories that can be configured later.

- Filtering by category, size, price, and availability.

- Product detail views with additional photos and descriptions.

- Clear "Order on WhatsApp" buttons.

- Responsive product cards and attractive empty states.



Each product must be easy to update. Store product information in a reusable data structure or connected database rather than scattering hardcoded content throughout the components.



Do not invent actual inventory, prices, customer reviews, or business policies. Use clearly identifiable sample content until the owner supplies the real information.



5. Lash Studio — Beauty Services



Build a dedicated lash-services page that feels like a luxury beauty studio.



Include:



- A beautiful lash-focused hero section.

- A gallery for before-and-after photos, once supplied.

- Service cards with editable service names, descriptions, prices, and estimated durations.

- An appointment-request form with name, contact number, requested service, preferred date, and preferred time.

- A WhatsApp booking CTA.

- A location and opening-hours section that can be configured later.

- Aftercare information that the owner can edit.



Clearly distinguish an appointment request from a confirmed booking. Do not claim an appointment has been confirmed unless a real booking system verifies it.



6. About the Founder



Create a warm, stylish founder section that celebrates her personality.



The story should communicate:



- Her passion for fashion.

- Her interest in beauty and lash services.

- Her love of tennis.

- Her belief in helping women express their individuality and confidence.



Keep the copy authentic and editable. Do not invent her name, qualifications, personal history, or business achievements.



Use a portrait placeholder that can later be replaced with her real photograph.



7. Brand Journal / Social Gallery



Add an optional editorial gallery where the owner can feature:



- New thrift drops.

- Lash transformations.

- Styling inspiration.

- Behind-the-scenes content.

- Tennis-inspired lifestyle moments.



Make it easy to link out to Instagram and TikTok. Do not fabricate social-media feeds or claim an integration exists unless it has actually been implemented.



8. WhatsApp and Contact



Design WhatsApp as a key conversion channel.



Implement configurable contact details and prefilled messages for:



- General enquiries.

- Product orders.

- Lash appointment requests.



Product enquiries should include the product name and selected size when available. Lash enquiries should include the requested service and preferred appointment details.



Keep phone numbers, social links, business location, and contact information in a central configuration file. Use obvious placeholders until the owner supplies the actual details.



Never invent a phone number or link orders to someone else's account.



9. Technical Requirements



Use the project's existing framework and architecture where applicable. If starting fresh, use React, TypeScript, Vite, and Tailwind CSS with reusable components and a maintainable folder structure.



Requirements:



- Responsive layouts for mobile, tablet, and desktop.

- Mobile-first navigation with a polished mobile menu.

- Working navigation and calls to action.

- Accessible semantic HTML, keyboard navigation, and appropriate contrast.

- Optimized images and sensible loading states.

- Search-engine-friendly titles, descriptions, URLs, and social-sharing metadata.

- A custom favicon and branded 404 page.

- Reusable product, service, gallery, and testimonial components.

- Form validation and clear success/error states.

- Secure handling of any API keys and credentials.

- No exposed secrets, fake payment integrations, or nonfunctional buttons.



Use a suitable database and secure server-side functionality if needed for persistent products, appointments, or administration. Do not add unnecessary backend complexity if a simpler reliable implementation is sufficient.



If the project already exists, inspect its current structure first. Preserve useful existing functionality and dependencies. Avoid unnecessary rewrites.



10. Owner-Friendly Management



Prepare the project so the owner can maintain it without editing multiple unrelated files.



Make the following easy to update:



- Brand name and tagline.

- Colours and typography.

- Products, prices, sizes, and stock.

- Lash services and prices.

- Gallery photographs.

- WhatsApp number and social links.

- Location and opening hours.



If you implement an admin dashboard, protect it with proper server-side authentication and authorization. Never expose admin credentials in frontend code. Do not present a decorative dashboard as functional.



11. Final Quality Standard



Before considering the work complete:



- Build all requested pages and connect the navigation.

- Verify that product and service cards render correctly.

- Test WhatsApp links and prefilled messages.

- Test the appointment form's actual submission behaviour.

- Check mobile responsiveness and visual consistency.

- Remove broken links, console errors, and dead buttons.

- Ensure every page shares the same brand identity.

- Provide clear setup and deployment instructions.



Prioritize exceptional visual design, usability, real business functionality, and a cohesive brand experience.



Start by planning the page structure and design system, then implement the actual website. Do not stop at a wireframe, landing-page mockup, or design proposal. Build the working website.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/30bfec2e-330b-4238-9e7a-36f91f00a615).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

This project uses **Bun** (see `bun.lock` and `bunfig.toml`). Install [Bun](https://bun.sh), then:

```sh
git clone https://github.com/Pantane1/violet-rally-velvet-serve.git
cd violet-rally-velvet-serve
bun install --frozen-lockfile
bun run dev
```

| Command | What it does |
| --- | --- |
| `bun run dev` | Start the local dev server |
| `bun run build` | Production build (output in `.output/`) |
| `bun run lint` | ESLint + Prettier checks |
| `bun run test` | Vitest unit and routing tests |
| `npx tsc --noEmit -p tsconfig.json` | Type check |

### Where to edit content

- **Brand name, WhatsApp number, email, address, opening hours, social links:** `src/config/site.ts`. Entries marked `SAMPLE` must be replaced with real details before launch.
- **Products:** `src/data/products.ts` (sample inventory, not real stock or prices).
- **Lash services:** `src/data/services.ts` (sample prices).
- **Journal posts:** `src/data/journal.ts` (sample entries).
- **Routes:** `src/routes/`. Files are flat, e.g. `shop.index.tsx` (`/shop`) and `shop.$slug.tsx` (`/shop/:slug`). See `src/routes/README.md`.

No environment variables are required. The site has no backend: forms prepare a request and open WhatsApp, and nothing is stored or sent by the website itself.

## Deployment

The production build is generated by Nitro and includes a Cloudflare Workers configuration (`.output/server/wrangler.json`). The build output also reports that it can be deployed with `npx nitro deploy --prebuilt`.

Before going live:

1. Replace every `SAMPLE` value in `src/config/site.ts`, `src/data/*.ts` with real details.
2. Confirm the WhatsApp number is set (the placeholder `000000000000` makes every order link non-functional).
3. Run `bun run lint && bun run test && bun run build`.
4. Deploy from `main` after the change is reviewed. Commits pushed to `main` also sync to the Lovable project.

The deployment target and account are not configured in this repository. Confirm the hosting account and deploy command with the project owner before the first production deploy.
