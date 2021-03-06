import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import entrypointHashmanifest from "rollup-plugin-entrypoint-hashmanifest";

const production = !process.env.ROLLUP_WATCH;

const plugins = [
  nodeResolve({}),
  commonjs(),
  typescript(),
  production && terser()
];

export default [
  {
    input: "./src/entrypoints/app.ts",
    output: {
      dir: "dist/",
      format: "es",
      entryFileNames: production ? "[name]-[hash].js" : "[name].js",
      chunkFileNames: "[name]-[hash].js"
    },
    plugins: [
      ...plugins,
      production && entrypointHashmanifest({ manifestName: "manifest.json" })
    ]
  },
  {
    input: "./src/entrypoints/ce-alert-link.ts",
    output: {
      dir: "dist/",
      format: "es",
      entryFileNames: "[name].js",
      chunkFileNames: "[name]-[hash].js"
    },
    plugins
  }
];
