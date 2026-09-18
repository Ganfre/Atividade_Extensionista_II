import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tanstackStart({ server: { entry: "server" } }),
    nitro({ preset: "cloudflare_module", output: { dir: "dist" } }),
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
  ],
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
  },
});
