/// <reference types="vitest" />

import angular from "@analogjs/vite-plugin-angular";
import { resolve } from "path";

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [angular()],
    resolve: {
      alias: {
        "@app": resolve(__dirname, "src/app"),
        "@environments": resolve(__dirname, "src/environments"),
        "@shared": resolve(__dirname, "src/app/shared"),
        "@core": resolve(__dirname, "src/app/core"),
        "@features": resolve(__dirname, "src/app/features")
      }
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["src/test-setup.ts"],
      include: ["**/*.spec.ts"],
      reporters: ["default"],
    },
    define: {
      "import.meta.vitest": mode !== "production",
    },
  };
});
