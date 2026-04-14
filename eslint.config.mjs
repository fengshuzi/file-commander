import tsparser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import obsidianmd from "eslint-plugin-obsidianmd";

export default defineConfig([
  ...obsidianmd.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: { project: "./tsconfig.json" },
      globals: {
        console: "readonly",
        setTimeout: "readonly",
        document: "readonly",
        btoa: "readonly",
        confirm: "readonly",
      },
    },
    rules: {
      "obsidianmd/sample-names": "off",
    },
  },
]);
