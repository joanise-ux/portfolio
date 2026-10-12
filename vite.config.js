import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: Number(process.env.PORT) || 4321 },
  build: {
    target: "es2022", // the v2 page (src/lab) uses top-level await
    rollupOptions: {
      input: {
        /* the v2 portfolio (src/lab) is the home page */
        main: resolve(__dirname, "index.html"),
        /* the earlier NEON OS desktop (src/main.jsx) — kept at /classic/ */
        classic: resolve(__dirname, "classic/index.html"),
      },
    },
  },
});
