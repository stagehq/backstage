module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "react-hooks"],
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:cypress/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:import/typescript",
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // Disallow imports from src/server/ in src/pages/ except for src/pages/api
    // (see the "overrides" section for the exception)
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          {
            target: "./src/pages",
            from: "./src/server",
          },
        ],
      },
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks: "(useRecoilCallback|useRecoilTransaction_UNSTABLE)",
      },
    ],
    "no-console": "warn",
  },
  overrides: [
    {
      files: ["next.config.js", "tailwind.config.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      // Allow imports from src/server/ in src/pages/api
      files: ["src/pages/api/**/*"],
      rules: {
        "import/no-restricted-paths": [
          "error",
          {
            zones: [
              {
                target: "./src/pages/api",
                from: "./src/client/",
              },
            ],
          },
        ],
      },
    },
  ],
};
