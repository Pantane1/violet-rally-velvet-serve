/**
 * ─────────────────────────────────────────────────────────────────────
 *  PRODUCTS — SAMPLE CONTENT
 *
 *  All products, prices, sizes, conditions and stock states below are
 *  clearly-identifiable samples. Replace them with the real inventory.
 *  To update the shop, edit this one file: add, change or remove
 *  product objects — the shop grid, filters and detail pages update
 *  automatically.
 *
 *  Product photos live in src/assets/products/ and are imported below.
 * ─────────────────────────────────────────────────────────────────────
 */

import blouseSatin from "@/assets/products/blouse-satin.jpg";
import cropTopBlack from "@/assets/products/crop-top-black.jpg";
import shirtOversized from "@/assets/products/shirt-oversized.jpg";
import knitPlum from "@/assets/products/knit-plum.jpg";
import blouseBloom from "@/assets/products/blouse-bloom.jpg";
import camiPlum from "@/assets/products/cami-plum.jpg";
import teeCharcoal from "@/assets/products/tee-charcoal.jpg";
import corsetLilac from "@/assets/products/corset-lilac.jpg";

export type StockStatus = "in-stock" | "low-stock" | "sold-out";

export type ProductCategory = "tops" | "blouses" | "crop-tops";

export interface Product {
  id: string;
  /** URL segment, e.g. /shop/$slug */
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  sizes: string[];
  condition: string;
  status: StockStatus;
  /** Photo paths, main photo first. Add more photos to show a gallery on the detail page. */
  images: string[];
  featured?: boolean;
}

export const productCategories: { id: ProductCategory; label: string }[] = [
  { id: "tops", label: "Tops" },
  { id: "blouses", label: "Blouses" },
  { id: "crop-tops", label: "Crop tops" },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "lavender-satin-blouse",
    name: "Lavender Satin Blouse",
    description:
      "A softly draped satin blouse with a fluid button-through silhouette. Wear it tucked into tailored trousers for the office or loose over denim for evenings. SAMPLE description — replace with the real piece's details.",
    category: "blouses",
    price: 1800,
    sizes: ["S", "M", "L"],
    condition: "Excellent",
    status: "in-stock",
    images: [blouseSatin],
    featured: true,
  },
  {
    id: "p2",
    slug: "midnight-ribbed-crop-top",
    name: "Midnight Ribbed Crop Top",
    description:
      "A fitted ribbed crop with a sweetheart neckline that flatters everything. Pairs beautifully with high-waisted denim or a lilac tennis skirt. SAMPLE description — replace with the real piece's details.",
    category: "crop-tops",
    price: 950,
    sizes: ["S", "M"],
    condition: "Good",
    status: "in-stock",
    images: [cropTopBlack],
    featured: true,
  },
  {
    id: "p3",
    slug: "oversized-white-shirt",
    name: "Oversized White Shirt",
    description:
      "The forever classic — crisp cotton with an easy oversized cut, dropped shoulders and a chest pocket. Layer it, knot it, live in it. SAMPLE description — replace with the real piece's details.",
    category: "tops",
    price: 1200,
    sizes: ["M", "L"],
    condition: "Good",
    status: "low-stock",
    images: [shirtOversized],
    featured: true,
  },
  {
    id: "p4",
    slug: "plum-fine-knit",
    name: "Plum Fine-Knit Sweater",
    description:
      "A fine-gauge knit in the season's deepest plum. Light enough for warm afternoons, cosy enough for cool evenings on the court. SAMPLE description — replace with the real piece's details.",
    category: "tops",
    price: 1400,
    sizes: ["S", "M", "L"],
    condition: "Like new",
    status: "in-stock",
    images: [knitPlum],
    featured: true,
  },
  {
    id: "p5",
    slug: "bloom-print-blouse",
    name: "Bloom Print Blouse",
    description:
      "A vintage-inspired blouse scattered with purple florals — the kind of thrifted treasure that never comes back once it's gone. SAMPLE description — replace with the real piece's details.",
    category: "blouses",
    price: 1600,
    sizes: ["S", "M"],
    condition: "Good",
    status: "in-stock",
    images: [blouseBloom],
  },
  {
    id: "p6",
    slug: "plum-silk-cami",
    name: "Plum Silk Cami",
    description:
      "A cowl-neck cami in deep plum satin. Dress it up with a blazer or keep it effortless with jeans. SAMPLE description — replace with the real piece's details.",
    category: "tops",
    price: 1100,
    sizes: ["S", "M", "L"],
    condition: "Excellent",
    status: "sold-out",
    images: [camiPlum],
  },
  {
    id: "p7",
    slug: "charcoal-cropped-tee",
    name: "Charcoal Cropped Tee",
    description:
      "A boxy cropped tee in soft charcoal cotton — an easy everyday layer with an effortless edge. SAMPLE description — replace with the real piece's details.",
    category: "crop-tops",
    price: 850,
    sizes: ["S", "M"],
    condition: "Good",
    status: "in-stock",
    images: [teeCharcoal],
  },
  {
    id: "p8",
    slug: "lilac-corset-top",
    name: "Lilac Corset Top",
    description:
      "A structured corset top with visible seam boning and a beautiful lilac tone. Made for statement moments. SAMPLE description — replace with the real piece's details.",
    category: "crop-tops",
    price: 1900,
    sizes: ["XS", "S"],
    condition: "Excellent",
    status: "low-stock",
    images: [corsetLilac],
  },
];

export const stockStatusLabels: Record<StockStatus, string> = {
  "in-stock": "Available",
  "low-stock": "Low stock",
  "sold-out": "Sold",
};

export function findProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
