/**
 * LASH SERVICES — SAMPLE CONTENT.
 * Replace names, descriptions, prices and durations with the real
 * service menu. Prices are sample values, not real quotes.
 */

export interface LashService {
  id: string;
  name: string;
  description: string;
  /** Sample price in the display currency (see site config). */
  price: number;
  duration: string;
  popular?: boolean;
}

export const lashServices: LashService[] = [
  {
    id: "classic-set",
    name: "Classic Set",
    description:
      "One extension per natural lash for a beautifully defined, everyday look. Light, natural and effortlessly polished.",
    price: 2500,
    duration: "90 min",
  },
  {
    id: "volume-set",
    name: "Volume Set",
    description:
      "Handcrafted fans for soft, full volume with a feather-light finish. The signature glam that photographs beautifully.",
    price: 3500,
    duration: "120 min",
    popular: true,
  },
  {
    id: "mega-volume",
    name: "Mega Volume",
    description:
      "Maximum fullness and drama — ultra-fine fans layered for a bold, show-stopping lash line.",
    price: 4500,
    duration: "150 min",
  },
  {
    id: "refill",
    name: "Refill",
    description:
      "Top-up for sets applied within the last three weeks, restoring fullness between full appointments.",
    price: 1500,
    duration: "60 min",
  },
  {
    id: "lash-lift",
    name: "Lash Lift & Tint",
    description:
      "Your natural lashes, lifted and darkened — low maintenance definition that lasts for weeks.",
    price: 2000,
    duration: "60 min",
  },
  {
    id: "removal",
    name: "Gentle Removal",
    description:
      "Safe, damage-free removal of existing extensions using professional remover — gentle on natural lashes.",
    price: 500,
    duration: "30 min",
  },
];

/** SAMPLE — replace with the studio's real aftercare guidance. */
export const aftercareSteps: string[] = [
  "Keep lashes completely dry for the first 24 hours after your appointment.",
  "Avoid oil-based cleansers and makeup removers around the eye area.",
  "Brush through your lashes daily with a clean spoolie to keep them fluffy.",
  "Skip lash curlers — your extensions are already perfectly curled.",
  "Book a refill every 2–3 weeks to keep your set looking full.",
];
