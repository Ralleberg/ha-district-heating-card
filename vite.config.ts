import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/ha-district-heating-card.ts",
      formats: ["es"],
      fileName: () => "ha-district-heating-card.js",
    },
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
