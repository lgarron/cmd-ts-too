module.exports = {
  exclude: ["test/**", "src/example/**"],
  excludeExternals: true,
  excludeNotExported: true,
  excludePrivate: true,
  hideGenerator: true,
  includes: "./src",
  out: "dist/web",
  module: "commonjs",
  stripInternal: "true",
};
