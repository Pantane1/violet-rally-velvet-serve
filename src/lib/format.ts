import { site } from "@/config/site";

/** Formats a sample price in the configured display currency, e.g. "KSh 1,800". */
export function formatPrice(amount: number): string {
  return `${site.currency} ${amount.toLocaleString("en-US")}`;
}
