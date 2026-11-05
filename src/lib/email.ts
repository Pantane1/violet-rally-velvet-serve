/**
 * Lightweight email format validation shared by the client and server.
 * Kept dependency-free so it can be unit-tested in isolation.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}
