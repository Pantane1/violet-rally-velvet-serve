import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const variants = {
  /** Solid royal plum — primary CTAs on light backgrounds. */
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-plum/20",
  /** Outlined plum — secondary CTAs on light backgrounds. */
  outline:
    "border border-primary/30 bg-transparent text-primary hover:border-primary hover:bg-secondary",
  /** Tennis lime — high-contrast CTA on plum backgrounds. */
  lime: "bg-lime text-charcoal hover:brightness-95 shadow-lg shadow-charcoal/20",
} as const;

export function WhatsAppButton({
  message,
  children,
  variant = "primary",
  className,
}: {
  /** Prefilled WhatsApp message text. */
  message: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none",
        variants[variant],
        className,
      )}
    >
      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      {children}
    </a>
  );
}
