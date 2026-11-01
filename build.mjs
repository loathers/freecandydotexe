/* eslint-env node */
import { copyFile } from "node:fs/promises";
import { build } from "esbuild";
import babel from "esbuild-plugin-babel";

await build({
  entryPoints: {
    freecandy: "src/index.ts",
  },
  outdir: "KoLmafia/scripts/freecandydotexe",
  bundle: true,
  minifySyntax: true,
  platform: "node",
  target: "rhino1.7.14",
  external: ["kolmafia"],
  plugins: [babel()],
  loader: { ".json": "text" },
  inject: ["./kolmafia-polyfill.js"],
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});

await copyFile("static/dependencies.txt", "KoLmafia/dependencies.txt");
