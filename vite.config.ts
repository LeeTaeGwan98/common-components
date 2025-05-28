import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr({ include: "**/*.svg" })],
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },

  server: {
    proxy: {
      "/api/v1": {
        target: "https://api.bookaroon.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
