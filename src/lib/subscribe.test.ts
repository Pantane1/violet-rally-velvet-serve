import { Resend } from "resend";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { isValidEmail } from "./email";
import { subscribeEmail } from "./subscribe";

const { createMock } = vi.hoisted(() => ({ createMock: vi.fn() }));

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function () {
    return { contacts: { create: createMock } };
  }),
}));

describe("isValidEmail", () => {
  it("accepts a well-formed email", () => {
    expect(isValidEmail("jane@example.com")).toBe(true);
  });

  it("trims surrounding whitespace", () => {
    expect(isValidEmail("  jane@example.com  ")).toBe(true);
  });

  it("rejects a missing @", () => {
    expect(isValidEmail("janeexample.com")).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(isValidEmail("")).toBe(false);
  });

  it("rejects a missing domain", () => {
    expect(isValidEmail("jane@")).toBe(false);
  });
});

describe("subscribeEmail", () => {
  beforeEach(() => {
    createMock.mockReset();
    (Resend as unknown as { mockClear: () => void }).mockClear();
    delete process.env["RESEND_API_KEY"];
    delete process.env["RESEND_AUDIENCE_ID"];
  });

  afterEach(() => {
    delete process.env["RESEND_API_KEY"];
    delete process.env["RESEND_AUDIENCE_ID"];
  });

  it("returns dev-mode success when no API key is set", async () => {
    const result = await subscribeEmail("jane@example.com");
    expect(result).toEqual({ success: true, message: "Subscribed (dev mode)" });
    expect(createMock).not.toHaveBeenCalled();
  });

  it("rejects an invalid email even in dev mode", async () => {
    const result = await subscribeEmail("not-an-email");
    expect(result.success).toBe(false);
    expect(result.message).toBe("Please enter a valid email address.");
  });

  it("calls Resend with the email when an API key is set", async () => {
    process.env["RESEND_API_KEY"] = "re_test_key";
    createMock.mockResolvedValue({ data: { id: "c_1" }, error: null });

    const result = await subscribeEmail("  jane@example.com  ");

    expect(result).toEqual({ success: true, message: "You're on the list!" });
    expect(Resend).toHaveBeenCalledWith("re_test_key");
    expect(createMock).toHaveBeenCalledWith({ email: "jane@example.com", unsubscribed: false });
  });

  it("passes segmentId when RESEND_AUDIENCE_ID is set", async () => {
    process.env["RESEND_API_KEY"] = "re_test_key";
    process.env["RESEND_AUDIENCE_ID"] = "aud_123";
    createMock.mockResolvedValue({ data: { id: "c_1" }, error: null });

    await subscribeEmail("jane@example.com");

    expect(createMock).toHaveBeenCalledWith({
      email: "jane@example.com",
      unsubscribed: false,
      segments: [{ id: "aud_123" }],
    });
  });

  it("returns a failure when Resend responds with an error object", async () => {
    process.env["RESEND_API_KEY"] = "re_test_key";
    createMock.mockResolvedValue({ data: null, error: { message: "Contact already exists" } });

    const result = await subscribeEmail("jane@example.com");

    expect(result).toEqual({ success: false, message: "Contact already exists" });
  });

  it("returns a failure message when Resend throws", async () => {
    process.env["RESEND_API_KEY"] = "re_test_key";
    createMock.mockRejectedValue(new Error("Resend is down"));

    const result = await subscribeEmail("jane@example.com");

    expect(result).toEqual({ success: false, message: "Resend is down" });
  });

  it("trims and caps the email to 254 characters", async () => {
    process.env["RESEND_API_KEY"] = "re_test_key";
    createMock.mockResolvedValue({ data: { id: "c_1" }, error: null });

    const longEmail = "  " + "a".repeat(250) + "@b.com  ";
    await subscribeEmail(longEmail);

    const called = createMock.mock.calls[0]![0] as { email: string };
    expect(called.email.length).toBe(254);
    expect(called.email).not.toMatch(/^\s/);
    expect(called.email).not.toMatch(/\s$/);
  });
});
