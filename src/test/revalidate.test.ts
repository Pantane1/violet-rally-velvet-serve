import { describe, expect, it } from "vitest";

import { getRevalidatePaths, handleRevalidate, resolveSlug, verifySecret } from "@/lib/revalidate";

describe("verifySecret", () => {
  it("returns true for matching secrets", () => {
    expect(verifySecret("abc123", "abc123")).toBe(true);
  });

  it("returns false for mismatched secrets", () => {
    expect(verifySecret("abc123", "xyz789")).toBe(false);
  });

  it("returns false when expected secret is missing", () => {
    expect(verifySecret("abc123", undefined)).toBe(false);
  });

  it("returns false when provided secret is missing", () => {
    expect(verifySecret(null, "abc123")).toBe(false);
  });
});

describe("resolveSlug", () => {
  it("returns a string slug", () => {
    expect(resolveSlug({ _type: "product", slug: "lavender-satin-blouse" })).toBe(
      "lavender-satin-blouse",
    );
  });

  it("returns slug.current when slug is an object", () => {
    expect(resolveSlug({ _type: "product", slug: { current: "plum-fine-knit" } })).toBe(
      "plum-fine-knit",
    );
  });

  it("returns null when no slug", () => {
    expect(resolveSlug({ _type: "product" })).toBeNull();
  });
});

describe("getRevalidatePaths", () => {
  it("returns base paths for a product payload", () => {
    expect(getRevalidatePaths({ _type: "product", slug: "lavender-satin-blouse" })).toEqual([
      "/shop",
      "/lash",
      "/shop/lavender-satin-blouse",
    ]);
  });

  it("returns base paths for a service payload (no slug route)", () => {
    expect(getRevalidatePaths({ _type: "lashService" })).toEqual(["/shop", "/lash"]);
  });

  it("returns null for invalid payload", () => {
    expect(getRevalidatePaths(null)).toBeNull();
    expect(getRevalidatePaths({})).toBeNull();
    expect(getRevalidatePaths("string")).toBeNull();
  });
});

describe("handleRevalidate", () => {
  it("returns 401 on invalid secret", async () => {
    const result = await handleRevalidate({
      secret: "wrong",
      expectedSecret: "correct",
      payload: { _type: "product", slug: "x" },
    });
    expect(result.status).toBe(401);
    expect(result.body).toEqual({ error: "Invalid secret" });
  });

  it("returns 400 on bad payload", async () => {
    const result = await handleRevalidate({
      secret: "correct",
      expectedSecret: "correct",
      payload: { foo: "bar" },
    });
    expect(result.status).toBe(400);
    expect(result.body).toEqual({ error: "Invalid payload" });
  });

  it("returns 200 with revalidated:true on success", async () => {
    const result = await handleRevalidate({
      secret: "correct",
      expectedSecret: "correct",
      payload: { _type: "product", slug: "lavender-satin-blouse" },
    });
    expect(result.status).toBe(200);
    expect(result.body.revalidated).toBe(true);
    expect(typeof result.body.now).toBe("number");
  });

  it("calls purge with the resolved paths", async () => {
    const purge = vi.fn();
    await handleRevalidate({
      secret: "correct",
      expectedSecret: "correct",
      payload: { _type: "product", slug: "lavender-satin-blouse" },
      purge,
    });
    expect(purge).toHaveBeenCalledWith(["/shop", "/lash", "/shop/lavender-satin-blouse"]);
  });

  it("still returns 200 when purge throws", async () => {
    const purge = vi.fn().mockRejectedValue(new Error("boom"));
    const result = await handleRevalidate({
      secret: "correct",
      expectedSecret: "correct",
      payload: { _type: "lashService" },
      purge,
    });
    expect(result.status).toBe(200);
    expect(result.body.revalidated).toBe(true);
  });
});
