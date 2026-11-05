import { Resend } from "resend";

import { isValidEmail } from "./email";

export interface SubscribeResult {
  success: boolean;
  message: string;
}

/**
 * Subscribe an email address to the VIP list.
 *
 * - Validates the email format.
 * - In local dev (no RESEND_API_KEY) returns a graceful mock success so the
 *   UI can be exercised without credentials.
 * - In production calls the Resend Contacts API.
 */
export async function subscribeEmail(email: string): Promise<SubscribeResult> {
  const trimmed = email.trim();

  if (!isValidEmail(trimmed)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`[subscribe] dev mode: would subscribe ${trimmed}`);
    return { success: true, message: "Subscribed (dev mode)" };
  }

  try {
    const resend = new Resend(apiKey);
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    await resend.contacts.create({
      email: trimmed,
      ...(audienceId ? { audienceId } : {}),
    });
    return { success: true, message: "You're on the list!" };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Subscription failed. Please try again.";
    return { success: false, message };
  }
}
