import { defineField, defineType } from "sanity";

export const lashService = defineType({
  name: "lashService",
  title: "Lash Service",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "price", title: "Price", type: "number" }),
    defineField({ name: "duration", title: "Duration", type: "string" }),
    defineField({ name: "popular", title: "Popular", type: "boolean" }),
  ],
  preview: {
    select: { title: "name", subtitle: "duration" },
  },
});

export const aftercareStep = defineType({
  name: "aftercareStep",
  title: "Aftercare Step",
  type: "document",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
