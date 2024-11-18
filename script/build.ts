import { build } from "esbuild";

build({
  entryPoints: [
    "./src/index.ts",
    "./src/batteries/fs.ts",
    "./src/batteries/url.ts",
  ],
  bundle: true,
  outdir: "dist/lib/cmd-ts-too",
  format: "esm",
  splitting: true,
  sourcemap: true,
  target: "es2022",
  external: ["node:*", "chalk", "debug", "didyoumean", "strip-ansi"],
  chunkNames: "chunks/[name]-[hash]",
});
