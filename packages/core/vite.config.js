import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      entryRoot: "src",
      outDir: "dist",
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "index",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["@reduxjs/toolkit", "redux-thunk"],
      output: {
        globals: {
          "@reduxjs/toolkit": "ReduxToolkit",
          "redux-thunk": "ReduxThunk"
        },
      },
    },
  },
});
