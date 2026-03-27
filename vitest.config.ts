import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    include: ["test/unit/**/*.test.ts"],
    exclude: ["test/e2e/**", "test/**/*.spec.ts", "node_modules/**"],
  },
});
