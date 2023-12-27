import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig({
  build: {
    target: "modules",
    rollupOptions: {
      external: ["@dogma-project/core-meta"],
    },
  },
  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    mainFields: ["nodenext", "module", "jsnext:main", "jsnext"],
  },
});
