import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: Number(process.env.PORT) || 4321 },
  build: {
    target: "es2022", // the lab uses top-level await
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        /* v2 motion prototype — served at /lab/ */
        lab: resolve(__dirname, "lab/index.html"),
      },
    },
  },
});
