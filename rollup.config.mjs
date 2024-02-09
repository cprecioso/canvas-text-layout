// @ts-check

import ts from "rollup-plugin-ts";
import typescript from "typescript";

export default /** @type {import("rollup").RollupOptions} */ ({
  input: "src/index.ts",
  output: [
    { file: "dist/index.js", format: "cjs" },
    { file: "dist/index.mjs", format: "esm" },
  ],
  plugins: [ts({ typescript })],
});
