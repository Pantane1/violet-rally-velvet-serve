/**
 * ─────────────────────────────────────────────────────────────────────
 *  BRAND & CONTACT CONFIGURATION
 *  Edit this single file to update the brand name, tagline, WhatsApp
 *  number, email, social links, location and opening hours everywhere
 *  on the website.
 *
 *  Anything marked SAMPLE is placeholder content that must be replaced
 *  with the real business details before launch.
 * ─────────────────────────────────────────────────────────────────────
 */

export const site = {
  brand: {
    /** Working brand name — easy to change in one place. */
    name: "Violet Rally",
    shortName: "VR",
    tagline: "Your style. Your glow. Your court.",
    supportingMessage: "Curated fits. Beautiful lashes. Unapologetically you.",
  },

  contact: {
    /**
     * SAMPLE — replace with the real WhatsApp number.
     * Format: country code + number, digits only. Example: "254712345678".
     * Never link to someone else's account.
     */
    whatsappNumber: "000000000000",

    /** SAMPLE — replace with the real business email. */
    email: "hello@violetrally.example",

    /** SAMPLE — replace with the real studio / collection point. */
    location: {
      line1: "Studio address — to be confirmed",
      line2: "City, Country",
    },

    /** SAMPLE — replace with real opening hours. */
    hours: [
      { days: "Monday – Friday", time: "10:00 – 18:00" },
      { days: "Saturday", time: "09:00 – 16:00" },
      { days: "Sunday", time: "Closed" },
    ],
  },

  /** SAMPLE — replace with the real profile URLs. */
  social: {
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/",
  },

  /** SAMPLE — display currency for product & service prices. */
  currency: "KSh",
} as const;

export type SiteConfig = typeof site;
