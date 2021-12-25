module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    "quotes": "off",
    "indent": "off",
    "no-trailing-spaces": "off",
    "semi": "off",
    "key-spacing": "off",
    "max-len": "off",
    "eol-last": "off",
    "require-jsdoc": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/jsx-indent": "off",
    "react/jsx-indent-props": "off",
    "object-curly-spacing": "off",
    "quote-props": "off",
  },
};
