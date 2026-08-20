import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  envDir: "..",
  plugins: [
    react({
      // Explicitly tell the React plugin to handle .tsx and .jsx files inside Frontend
      include: /Frontend\/.*\.(tsx|jsx)$/,
    }),
  ],
  root: "Frontend",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
