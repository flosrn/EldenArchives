/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */
/** @typedef {import("prettier").Config} PrettierConfig */

/**
 * Remember to restart VSCode after making
 * any changes here and saving this file.
 */
/** @type {PrettierConfig | SortImportsConfig} */

module.exports = {
  trailingComma: "es5",
  tabWidth: 2,
  printWidth: 80,
  endOfLine: "lf",
  semi: true,
  singleQuote: false,
  arrowParens: "always",
  jsxBracketSameLine: false,
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "^next-",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/(.*)$",
    "",
    "^[./]",
    "^(?!.*[.]scss$)[./].*$",
    ".scss$",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
};
