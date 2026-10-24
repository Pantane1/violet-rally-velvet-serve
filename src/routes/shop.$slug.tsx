import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { site } from "@/config/site";
import { findProductBySlug, products, stockStatusLabels } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { whatsappMessages } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ProductCard } from "@/components/shop/ProductCard";
import { Reveal } from "@/components/brand/Reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = findProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: `${loaderData.product.name} — ${site.brand.name}`,
          },
          {
            name: "description",
            content: `${loaderData.product.name} — ${formatPrice(
              loaderData.product.price,
            )}. Curated, one-of-one thrifted fashion from ${site.brand.name}. Order on WhatsApp.`,
          },
          {
            property: "og:title",
            content: `${loaderData.product.name} — ${site.brand.name}`,
          },
          {
            property: "og:description",
            content: `${formatPrice(loaderData.product.price)} · ${
              loaderData.product.condition
            } · Sizes ${loaderData.product.sizes.join(", ")}`,
          },
          { property: "og:type", content: "product" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: `Product unavailable — ${site.brand.name}` }],
  }),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState<string | null>(null);

  const related = products
    .filter((p) => p.slug !== product.slug && (p.category === product.category || p.featured))
    .slice(0, 4);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:px-8 lg:pt-36">
        <Link
          to="/shop"
          className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back to the shop
        </Link>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Photos */}
        <div>
          <div className="overflow-hidden rounded-4xl border border-border bg-secondary">
            <img
              src={product.images[0]}
              alt={product.name}
              width={1024}
              height={1280}
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.slice(1).map((img, i) => (
                <button
                  key={i}
                  type="button"
                  className="overflow-hidden rounded-2xl border border-border"
                  aria-label={`View photo ${i + 2} of ${product.name}`}
                >
                  <img
                    src={img}
                    alt=""
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="eyebrow text-primary">
            {product.category === "crop-tops"
              ? "Crop tops"
              : product.category === "blouses"
                ? "Blouses"
                : "Tops"}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 font-display text-3xl font-semibold text-primary">
            {formatPrice(product.price)}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-lime px-3 py-1 text-xs font-semibold text-charcoal">
              {product.condition}
            </span>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold",
                product.status === "sold-out"
                  ? "bg-charcoal text-primary-foreground"
                  : "bg-lavender text-charcoal",
              )}
            >
              {stockStatusLabels[product.status]}
            </span>
          </div>

          <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>

          {/* Size selector */}
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-charcoal">Select size</h2>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Size">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s === size ? null : s)}
                  aria-pressed={size === s}
                  className={cn(
                    "h-11 min-w-11 rounded-full border px-3 text-sm font-semibold transition-all",
                    size === s
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-charcoal hover:border-primary",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {size
                ? `Ordering in size ${size}.`
                : "Optional — choose a size to include it in your WhatsApp order."}
            </p>
          </div>

          <div className="mt-8">
            {product.status === "sold-out" ? (
              <WhatsAppButton
                variant="outline"
                className="w-full sm:w-auto"
                message={whatsappMessages.productOrder(product.name, size)}
              >
                Ask about this piece
              </WhatsAppButton>
            ) : (
              <WhatsAppButton
                className="w-full sm:w-auto"
                message={whatsappMessages.productOrder(product.name, size)}
              >
                Order on WhatsApp
              </WhatsAppButton>
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              Opens WhatsApp with this piece and your size pre-filled — no account needed.
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-charcoal">You may also love</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </Reveal>
        </section>
      )}
    </>
  );
}
