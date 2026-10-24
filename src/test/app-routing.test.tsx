import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { products } from "@/data/products";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("builds a product link that resolves to the product detail route", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const product = products[0];
    if (!product) throw new Error("Expected at least one sample product");

    const location = router.buildLocation({
      to: "/shop/$slug",
      params: { slug: product.slug },
    });
    const matches = router.matchRoutes(location.pathname);

    expect(location.pathname).toBe(`/shop/${product.slug}`);
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it.each(products.map((p) => [p.slug]))(
    "renders %s as the leaf detail route, not the shop listing",
    (slug) => {
      const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

      const matches = router.matchRoutes(`/shop/${slug}`);

      // Root + the product detail route only: it must not be nested under the
      // /shop listing, which has no <Outlet /> and would hide the product.
      expect(matches.map((m) => m.routeId)).toEqual([rootRouteId, "/shop/$slug"]);
    },
  );
});
