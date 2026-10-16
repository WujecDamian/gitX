import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  envDir: "..",
  plugins: [
    react({
      // Explicitly tell the React plugin to handle .tsx and .jsx files inside Frontend
      include: /Frontend\/.*\.(mdx|js|jsx|ts|tsx)$/,
    }),
  ],
  root: "Frontend",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: "esbuild",
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
