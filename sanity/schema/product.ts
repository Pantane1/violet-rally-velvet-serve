import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["tops", "blouses", "crop-tops"] },
    }),
    defineField({ name: "price", title: "Price", type: "number" }),
    defineField({ name: "sizes", title: "Sizes", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "condition", title: "Condition", type: "string" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["in-stock", "low-stock", "sold-out"] },
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean" }),
  ],
  preview: {
    select: { title: "name", media: "images.0" },
  },
});
