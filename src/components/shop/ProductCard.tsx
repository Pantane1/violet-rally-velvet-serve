import { Link } from "@tanstack/react-router";
import { formatPrice } from "@/lib/format";
import { stockStatusLabels, type Product } from "@/data/products";
import { cn } from "@/lib/utils";

const statusStyles = {
  "in-stock": "bg-lime text-charcoal",
  "low-stock": "bg-lavender text-charcoal",
  "sold-out": "bg-charcoal text-primary-foreground",
} as const;

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/shop/$slug"
      params={{ slug: product.slug }}
      className="group block focus-visible:outline-none"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          width={1024}
          height={1280}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide",
            statusStyles[product.status],
          )}
        >
          {stockStatusLabels[product.status]}
        </span>
        {product.status === "sold-out" && (
          <span className="absolute inset-0 flex items-center justify-center bg-charcoal/40 font-display text-lg font-semibold text-primary-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Sold out
          </span>
        )}
      </div>
      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-snug text-charcoal">
            {product.name}
          </h3>
          <p className="shrink-0 font-display text-lg font-semibold text-primary">
            {formatPrice(product.price)}
          </p>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {product.condition} · Sizes {product.sizes.join(", ")}
        </p>
        <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
          View &amp; order
          <span aria-hidden="true">→</span>
        </p>
      </div>
    </Link>
  );
}
