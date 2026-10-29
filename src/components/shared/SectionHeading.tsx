import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Use on plum / dark backgrounds. */
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && <p className={cn("eyebrow", light ? "text-lime" : "text-primary")}>{eyebrow}</p>}
      <h2
        className={cn(
          "mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl",
          light ? "text-primary-foreground" : "text-charcoal",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            light ? "text-primary-foreground/75" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
      {/* Tennis-court line flourish */}
      <span
        className={cn(
          "mt-6 block h-px w-24",
          align === "center"
            ? "mx-auto bg-gradient-to-r from-transparent via-lavender to-transparent"
            : "bg-gradient-to-r from-lavender to-transparent",
        )}
        aria-hidden="true"
      />
    </div>
  );
}
