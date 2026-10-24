/**
 * ─────────────────────────────────────────────────────────────────────
 *  BRAND JOURNAL / SOCIAL GALLERY
 *
 *  The owner can feature new thrift drops, lash transformations,
 *  styling inspiration, behind-the-scenes moments and tennis-inspired
 *  lifestyle content here. Edit this one file — entries are grouped
 *  by kind with filter chips on the Journal page.
 *
 *  NOTE: these are sample entries. Social links are only rendered
 *  when real profile URLs exist in src/config/site.ts. No social-feed
 *  integration is claimed or implemented.
 * ─────────────────────────────────────────────────────────────────────
 */

import heroEditorial from "@/assets/hero-editorial.jpg";
import lashHero from "@/assets/lash-hero.jpg";
import tennisEditorial from "@/assets/tennis-editorial.jpg";
import blouseBloom from "@/assets/products/blouse-bloom.jpg";
import corsetLilac from "@/assets/products/corset-lilac.jpg";
import knitPlum from "@/assets/products/knit-plum.jpg";

export type JournalKind = "drop" | "transformation" | "inspiration" | "bts" | "tennis";

export interface JournalEntry {
  id: string;
  kind: JournalKind;
  title: string;
  caption: string;
  image: string;
}

export const journalKindLabels: Record<JournalKind, string> = {
  drop: "New drop",
  transformation: "Lash transformation",
  inspiration: "Styling inspiration",
  bts: "Behind the scenes",
  tennis: "Tennis life",
};

export const journalEntries: JournalEntry[] = [
  {
    id: "j1",
    kind: "drop",
    title: "The Purple Haze Edit",
    caption:
      "Six new vintage tops landed this week — plum, lilac and everything between. DM to claim before they're gone. SAMPLE entry.",
    image: blouseBloom,
  },
  {
    id: "j2",
    kind: "transformation",
    title: "Soft Glam Volume",
    caption:
      "A wispy volume set that went from everyday to editorial in one appointment. SAMPLE entry — replace with real before/after photography.",
    image: lashHero,
  },
  {
    id: "j3",
    kind: "tennis",
    title: "Match-Day Uniform",
    caption:
      "Court whites, lilac pleats and one very optimistic backhand. Style that travels from baseline to brunch. SAMPLE entry.",
    image: tennisEditorial,
  },
  {
    id: "j4",
    kind: "inspiration",
    title: "Satin Season",
    caption:
      "How we're styling the satin blouse three ways this month. SAMPLE entry — swap in real styling content.",
    image: heroEditorial,
  },
  {
    id: "j5",
    kind: "bts",
    title: "Behind the Steamer",
    caption:
      "Prepping the next drop — steaming, tagging and photographing every piece in natural light. SAMPLE entry.",
    image: knitPlum,
  },
  {
    id: "j6",
    kind: "drop",
    title: "Corset Drop Preview",
    caption:
      "One-of-one structured pieces in lilac. First look before it hits the shop. SAMPLE entry.",
    image: corsetLilac,
  },
];
