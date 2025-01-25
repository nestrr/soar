// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
const eslintConfig = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.config({
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          fixStyle: "inline-type-imports",
        },
      ],
    },
  })
);
export default eslintConfig;
