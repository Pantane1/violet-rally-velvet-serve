import { site } from "@/config/site";

/**
 * The brand mark: a tennis-ball silhouette (circle + seam curves) in
 * lime, paired with the serif wordmark. Colour follows the parent's
 * text colour so it works on light, plum and glass surfaces.
 */
export function BallMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="16" cy="16" r="12.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M10.5 4.8 C 16.5 10.5 16.5 21.5 10.5 27.2"
        stroke="var(--color-lime)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M21.5 4.8 C 15.5 10.5 15.5 21.5 21.5 27.2"
        stroke="var(--color-lime)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  className = "",
  markClassName = "",
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-label={site.brand.name}
    >
      <BallMark className={`h-8 w-8 ${markClassName}`} />
      <span className="font-display text-[1.3rem] font-semibold leading-none tracking-tight">
        {site.brand.name}
      </span>
    </span>
  );
}
