import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

const preset = process.env.DEPLOY_TARGET || "node-server";

export default defineConfig({
  plugins: [
    TanStackStartVite({
      server: { preset },
    }),
    tailwindcss(),
    react(),
    tsConfigPaths(),
  ],
});
