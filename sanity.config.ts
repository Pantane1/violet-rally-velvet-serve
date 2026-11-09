import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./sanity/schema";

export default defineConfig({
  name: "violet-rally-studio",
  title: "Violet Rally / Set & Slay",
  projectId: "1i7u04h7",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
