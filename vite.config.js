import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: Number(process.env.PORT) || 4321 },
  build: {
    target: "es2022", // the portfolio (src/) uses top-level await
    rollupOptions: {
      input: {
        /* the portfolio with the project orbit and Nuri (src/) — the home page */
        main: resolve(__dirname, "index.html"),
        /* the earlier desktop portfolio, whole in its own folder — at /portfolio-pulpit/ */
        pulpit: resolve(__dirname, "portfolio-pulpit/index.html"),
      },
    },
  },
});
