export default [
  {
    ignores: ["**/node_modules/**", ".next", "**/.next/**"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn", // or "off" to disable entirely
        {
          argsIgnorePattern: "^_", // allow unused function args prefixed with _
          varsIgnorePattern: "^_", // allow unused vars prefixed with _
        },
      ],
    },
  },
];
