import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs";

export default defineConfig(() => {
  // 1. Detect if the command is running inside the subfolder or at the main root
  const isInsideFrontendFolder = fs.existsSync("./index.html");

  // 2. Adjust the root and output paths dynamically
  const computedRoot = isInsideFrontendFolder ? "./" : "./Frontend";
  const computedOutDir = isInsideFrontendFolder
    ? resolve(__dirname, "dist")
    : resolve(__dirname, "Frontend/dist");

  return {
    plugins: [react()],
    root: computedRoot,
    build: {
      outDir: computedOutDir,
      emptyOutDir: true,
    },
  };
});
