import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

import { aftercareSteps, lashServices } from "@/data/services";
import { products } from "@/data/products";
import type { LashService } from "@/data/services";
import type { Product } from "@/data/products";

const projectId = import.meta.env["VITE_SANITY_PROJECT_ID"] as string | undefined;
const dataset = (import.meta.env["VITE_SANITY_DATASET"] as string | undefined) || "production";

export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion: "2024-01-01", useCdn: true })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: unknown): string | null {
  if (!builder || !source) return null;
  try {
    return builder.image(source).url();
  } catch {
    return null;
  }
}

interface SanityProduct {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  category?: Product["category"];
  price?: number;
  sizes?: string[];
  condition?: string;
  status?: Product["status"];
  images?: string[];
  featured?: boolean;
}

export async function getProducts(): Promise<Product[]> {
  if (!sanityClient) return products;
  try {
    const query = `*[_type == "product"] | order(_createdAt desc) {
      _id,
      name,
      "slug": slug.current,
      description,
      category,
      price,
      sizes,
      condition,
      status,
      "images": images[].asset->url,
      featured
    }`;
    const result = (await sanityClient.fetch(query)) as SanityProduct[];
    if (!Array.isArray(result) || result.length === 0) return products;
    return result.map((item) => ({
      id: item._id,
      slug: item.slug || item._id,
      name: item.name || "Untitled",
      description: item.description || "",
      category: item.category || "tops",
      price: typeof item.price === "number" ? item.price : 0,
      sizes: Array.isArray(item.sizes) ? item.sizes : [],
      condition: item.condition || "Good",
      status: item.status || "in-stock",
      images: Array.isArray(item.images) && item.images.length > 0 ? item.images : [],
      featured: Boolean(item.featured),
    }));
  } catch (error) {
    console.error("[sanity] getProducts failed, falling back to static data:", error);
    return products;
  }
}

interface SanityService {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  duration?: string;
  popular?: boolean;
}

export async function getServices(): Promise<LashService[]> {
  if (!sanityClient) return lashServices;
  try {
    const query = `*[_type == "lashService"] | order(_createdAt asc) {
      _id,
      name,
      description,
      price,
      duration,
      popular
    }`;
    const result = (await sanityClient.fetch(query)) as SanityService[];
    if (!Array.isArray(result) || result.length === 0) return lashServices;
    return result.map((item) => ({
      id: item._id,
      name: item.name || "Untitled",
      description: item.description || "",
      price: typeof item.price === "number" ? item.price : 0,
      duration: item.duration || "",
      popular: Boolean(item.popular),
    }));
  } catch (error) {
    console.error("[sanity] getServices failed, falling back to static data:", error);
    return lashServices;
  }
}

export async function getAftercareSteps(): Promise<string[]> {
  if (!sanityClient) return aftercareSteps;
  try {
    const query = `*[_type == "aftercareStep"] | order(_createdAt asc) { text }`;
    const result = (await sanityClient.fetch(query)) as { text?: string }[];
    if (!Array.isArray(result) || result.length === 0) return aftercareSteps;
    const steps = result.map((item) => item.text).filter((t): t is string => typeof t === "string");
    return steps.length > 0 ? steps : aftercareSteps;
  } catch (error) {
    console.error("[sanity] getAftercareSteps failed, falling back to static data:", error);
    return aftercareSteps;
  }
}
