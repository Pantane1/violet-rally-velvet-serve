# Store Owner Guide — Violet Rally / Set & Slay

Welcome! This guide shows you how to manage your website's products, lash services,
and content — no coding required. Everything happens in your Sanity Studio.

## 1. Logging in

1. Open **https://violet-rally.sanity.studio/** in any browser (phone or desktop).
2. Sign in with the account that owns the project (the email you used when creating it).
3. You'll see your dashboard with **Product**, **Lash Service**, and **Aftercare Step** lists.

> Tip: Bookmark the studio URL on your phone's home screen for quick access.

## 2. Publishing a new thrifted top

1. Click **Product** → **Create new**.
2. Fill in:
   - **Name** — the piece's name (e.g. "Lavender Satin Blouse").
   - **Slug** — click "Generate" next to the slug field.
   - **Description** — a short, honest description of the piece.
   - **Category** — Tops, Blouses, or Crop tops.
   - **Price** — in KES (e.g. 1800). This is what customers see.
   - **Sizes** — add each available size (S, M, L, …).
   - **Condition** — Excellent / Like new / Good.
   - **Status** — set to **In stock** for a new piece.
   - **Images** — upload one or more photos (the first becomes the main photo).
   - **Featured** — turn on to show it on the homepage.
3. Click **Publish** (top right).

Your new piece appears on the shop page and (if featured) the homepage automatically.
You do not need to redeploy the website.

## 3. Marking an item as Sold Out vs. removing it

- **Sold Out (recommended for sold pieces):** Open the product, change **Status** to
  **Sold out**, then **Publish**. The card stays visible with a "Sold out" badge and a
  "Ask about this piece" button, so customers can enquire about similar items. This
  keeps your sold history and SEO value.
- **Unpublish (hide without deleting):** Click **Unpublish**. The piece disappears from
  the shop but stays in your studio for later.
- **Delete (permanent):** Only use this for mistakes or test entries. Click the three
  dots → **Delete**. This cannot be undone.

## 4. Adding or updating Lash Services

1. Click **Lash Service** → **Create new** (or open an existing one).
2. Fill in:
   - **Name** (e.g. "Volume Set").
   - **Description** — what the service includes.
   - **Price** — in KES.
   - **Duration** (e.g. "120 min").
   - **Popular** — turn on to highlight it on the menu.
3. Click **Publish**.

The service appears on the Lash Studio page and the homepage preview automatically.

## 5. Updating Aftercare Steps

1. Click **Aftercare Step** → **Create new** for each step, or edit an existing one.
2. Enter the **Text** of the step.
3. **Publish** each step.

Steps appear in order on the Lash Studio page under "Lash aftercare".

## 6. How updates go live automatically

- Your website caches pages for up to 1 hour for speed.
- When you **Publish** or **Unpublish** in Sanity, Sanity sends a secure signal to the
  website (the revalidation webhook) and the affected pages refresh within seconds.
- You do not need to redeploy the website or contact a developer for normal content
  updates.
- If a page ever looks stale, wait 60 seconds and refresh — the cache always expires
  within an hour.

## 7. Tips

- **Photos:** Upload clear, well-lit photos. The first image becomes the main product
  photo; add more for a gallery.
- **Prices:** Always enter numbers in KES with no currency symbol (e.g. 1800, not "KSh 1800").
- **Sizes:** Add each size as a separate entry (S, M, L). Customers filter by size on the shop.
- **Stock status:** Use "Low stock" for the last 1–2 pieces to create urgency.
- **Don't share your Sanity login** — anyone with access can publish or delete content.

## Need help?

- Technical issues or feature requests: pantane254@gmail.com
- Sanity Studio help: https://www.sanity.io/docs
