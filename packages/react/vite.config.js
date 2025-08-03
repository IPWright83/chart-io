import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Used to enable HMR with sub-packages
      exclude: /node_modules\/(?!@chart-io\/).*/,
    }),
    dts({
      entryRoot: "src/lib",
      outDir: "dist",
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      ourDir: "build",
      entry: path.resolve(__dirname, "src/lib/index.ts"),
      name: "index",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
