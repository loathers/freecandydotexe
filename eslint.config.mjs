import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import libram from "eslint-plugin-libram";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["KoLmafia/**", "node_modules/**"] },
  {
    files: ["src/**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      prettier,
      ...libram.configs.recommended,
    ],
    rules: {
      "block-scoped-var": "error",
      eqeqeq: "error",
      "no-var": "error",
      "prefer-const": "error",
      "eol-last": "error",
      "prefer-arrow-callback": "error",
      "no-trailing-spaces": "error",
      "prefer-template": "error",
      "sort-imports": ["error", { ignoreCase: true, ignoreDeclarationSort: true }],
    },
  }
);
