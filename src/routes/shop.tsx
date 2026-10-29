import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/config/site";
import { productCategories, products, type ProductCategory } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { ProductCard } from "@/components/shop/ProductCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/brand/Reveal";
import { BallMark } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: `Shop the Fits — ${site.brand.name}` },
      {
        name: "description",
        content:
          "Browse curated one-of-one thrifted tops, blouses and crop tops. Filter by category, size, price and availability, then order your favourite on WhatsApp.",
      },
      { property: "og:title", content: `Shop the Fits — ${site.brand.name}` },
      {
        property: "og:description",
        content: "Curated one-of-one thrifted tops, blouses and crop tops — order on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [category, setCategory] = useState<"all" | ProductCategory>("all");
  const [size, setSize] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [inStockOnly, setInStockOnly] = useState(false);

  const priceCap = Math.max(...products.map((p) => p.price));
  const allSizes = [...new Set(products.flatMap((p) => p.sizes))].sort();

  const filtered = products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (size === "all" || p.sizes.includes(size)) &&
      p.price <= maxPrice &&
      (!inStockOnly || p.status !== "sold-out"),
  );

  const resetFilters = () => {
    setCategory("all");
    setSize("all");
    setMaxPrice(priceCap);
    setInStockOnly(false);
  };

  return (
    <>
      {/* Page header */}
      <section className="bg-lilac pb-4 pt-28 lg:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Shop the fits"
              title="One-of-one pieces, ready for their next chapter"
              description="Every top is hand-picked and pre-loved — sizes and condition are checked piece by piece. To order, pick your size and check out on WhatsApp."
            />
            <p className="mt-4 text-xs text-muted-foreground">
              Prices are sample values — real inventory is coming soon.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <section
        className="sticky top-16 z-30 glass border-b border-border/70 py-4"
        aria-label="Product filters"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 sm:px-6 lg:px-8">
          {/* Category chips */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Category">
            <button
              type="button"
              onClick={() => setCategory("all")}
              aria-pressed={category === "all"}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                category === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-charcoal hover:bg-accent",
              )}
            >
              All
            </button>
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                aria-pressed={category === cat.id}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                  category === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-charcoal hover:bg-accent",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              Size
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="rounded-full border border-input bg-card px-3 py-2 text-xs font-semibold text-charcoal"
              >
                <option value="all">All sizes</option>
                {allSizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              Price
              <input
                type="range"
                min={500}
                max={priceCap}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-28 accent-[var(--color-primary)]"
                aria-label={`Maximum price, currently ${formatPrice(maxPrice)}`}
              />
              <span className="whitespace-nowrap font-semibold text-charcoal">
                ≤ {formatPrice(maxPrice)}
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-charcoal">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="h-4 w-4 rounded accent-[var(--color-primary)]"
              />
              Available only
            </label>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product, i) => (
              <Reveal key={product.id} delay={(i % 4) * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md py-16 text-center">
            <BallMark className="mx-auto h-16 w-16 text-lavender" />
            <h2 className="mt-6 font-display text-2xl font-semibold text-charcoal">
              No pieces match those filters
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try widening your search — new one-of-one pieces land all the time.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
