import { resolve } from "node:path";
import { defineConfig, loadEnv, mergeConfig, type UserConfig, type Plugin } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import { devtools } from "@tanstack/devtools-vite";

const root = process.cwd();

export default defineConfig((env) => {
  // Inject VITE_* env vars as import.meta.env.VITE_* constants.
  const envDefine: Record<string, string> = {};
  for (const [key, value] of Object.entries(loadEnv(env.mode, root, "VITE_"))) {
    envDefine[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  const plugins: Plugin[] = [
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Keep the same import protection the scaffold applied: client code may
      // not import server modules or "server-only".
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
      // Redirect TanStack Start's bundled server entry to src/server.ts
      // (our SSR error wrapper). nitro/vite builds from this.
      server: { entry: "server" },
    }),
  ];

  // nitro produces the deployable worker on production builds (Cloudflare
  // module worker by default; NITRO_PRESET can override the target).
  if (env.command === "build") {
    plugins.push(nitro({ defaultPreset: "cloudflare-module" }));
  }

  plugins.push(react());

  let config: UserConfig = {
    define: envDefine,
    css: { transformer: "lightningcss" },
    resolve: {
      alias: { "@": `${root}/src` },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      ignoreOutdatedRequests: true,
    },
    plugins,
  };

  if (env.mode === "development") {
    plugins.unshift(
      devtools({
        logging: false,
        eventBusConfig: { enabled: false },
        enhancedLogs: { enabled: false },
        consolePiping: { enabled: false },
        removeDevtoolsOnBuild: false,
        injectSource: { enabled: true },
      }),
    );
  }

  // `vite build --mode development`: keep the dev-mode parity bits.
  if (env.command === "build" && env.mode === "development") {
    config = mergeConfig(config, {
      environments: {
        client: {
          define: { "process.env.NODE_ENV": JSON.stringify("development") },
        },
      },
      esbuild: { keepNames: true },
    });
  }

  config = mergeConfig(config, {
    server: {
      host: "::",
      port: 8080,
      watch: {
        // Debounce chatty editors on save.
        awaitWriteFinish: { stabilityThreshold: 1000, pollInterval: 100 },
      },
    },
  });

  return config;
});
