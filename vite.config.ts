import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/ha-district-heating-card.ts",
      name: "DistrictHeatingCard",
      formats: ["es"],
      fileName: () => "ha-district-heating-card.js",
    },
    outDir: ".",
    emptyOutDir: false,
    minify: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
