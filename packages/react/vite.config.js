import { defineConfig } from "vite";
import path from "node:path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Used to enable HMR with sub-packages
      exclude: /node_modules\/(?!@chart-io\/).*/,
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
