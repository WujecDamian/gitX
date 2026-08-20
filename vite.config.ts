import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  // 1. Tell Vite that the source files live inside the Frontend subfolder
  root: "./Frontend",
  build: {
    // 2. Output files explicitly into Frontend/dist
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});
