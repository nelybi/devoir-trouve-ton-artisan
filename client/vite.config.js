import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Vite basculera sur 5174 si 5173 est pris (normal)
    proxy: {
      "/api": {
        target: "http://localhost:4001",
        changeOrigin: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      // IMPORTANT : coupe les warnings Sass provenant de node_modules (ex: Bootstrap)
      scss: {
        quietDeps: true,
      },
      sass: {
        quietDeps: true,
      },
    },
  },
});
