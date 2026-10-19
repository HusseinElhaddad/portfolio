import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
export default defineConfig([
  globalIgnores([
    "out/**",
    ".next/**",
    "qa/**",
    "playwright-report/**",
    "test-results/**",
    "next-env.d.ts",
  ]),
  {
    files: ["**/*.{js,mjs,ts,tsx}"],
    languageOptions: {
      globals: {
        process: "readonly",
        console: "readonly",
        Buffer: "readonly",
        URL: "readonly",
        document: "readonly",
        localStorage: "readonly",
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
]);
