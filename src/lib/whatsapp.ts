import { site } from "@/config/site";
import { formatPrice } from "@/lib/format";

/**
 * Builds a wa.me deep link with a prefilled message.
 * The WhatsApp number lives in src/config/site.ts — until the owner
 * supplies the real number the link points at an obvious placeholder.
 */
export function buildWhatsAppLink(message: string): string {
  const number = site.contact.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Prefilled message templates for the three conversion paths. */
export const whatsappMessages = {
  general: () => `Hi ${site.brand.name}! I'd love to make a general enquiry.`,

  /** Product enquiry — includes the product name, selected size, price and link when available. */
  productOrder: (productName: string, size?: string | null, price?: number, url?: string) => {
    const lines = [`Hi ${site.brand.name}! I'd like to order the "${productName}".`];
    if (size) lines.push(`Size: ${size}`);
    if (typeof price === "number") lines.push(`Price: ${formatPrice(price)}`);
    if (url) lines.push(`Link: ${url}`);
    lines.push("Is it still available?");
    return lines.join(" ");
  },

  /**
   * Lash appointment REQUEST (not a confirmed booking) — includes the
   * requested service and preferred appointment details.
   */
  lashAppointment: (opts: { service: string; name?: string; date?: string; time?: string }) => {
    const lines = [
      `Hi ${site.brand.name}! I'd like to request a lash appointment.`,
      `Service: ${opts.service}`,
    ];
    if (opts.date) lines.push(`Preferred date: ${opts.date}`);
    if (opts.time) lines.push(`Preferred time: ${opts.time}`);
    if (opts.name) lines.push(`Name: ${opts.name}`);
    lines.push("Please confirm availability. Thank you!");
    return lines.join("\n");
  },
};
