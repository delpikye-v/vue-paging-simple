// Refer to https://rollupjs.org/guide/en#output-globals for details
import vue from "rollup-plugin-vue";
import buble from "rollup-plugin-buble";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

import pkg from './package.json'

const config = {
  input: "src/index.js",
  // list external dependencies, exactly the way it is written in the import statement.
  external: ['vue'],
}

const globals = {
  vue: 'Vue'
}

const preTransferVue = [
  replace({ 
    "process.env.NODE_ENV": JSON.stringify("production"),
    preventAssignment: true,
  }),
  commonjs(),
  postcss(),
  resolve({ browser: true, jsnext: true, main: true, })
]

const vueBase = {
  css: true,
  template: {
    isProduction: true,
  },
}
const postVue = [buble({ transforms: { forOf: false } })]

// Customize configs for individual targets
const esConfig = {
  ...config,
  output: {
    file: pkg.module,
    format: "esm",
    name: "VuePaging",
    exports: "named",
  },
  plugins: [
    ...preTransferVue,
    vue(vueBase),
    ...postVue,
    terser({
      output: {
        ecma: 6,
      },
    }),
  ],
};

const unpkgConfig = {
  ...config,
  output: {
    compact: true,
    file: pkg.unpkg,
    format: "iife",
    name: "VuePaging",
    exports: 'auto',
  },
  plugins: [
    ...preTransferVue,
    vue(vueBase),
    ...postVue,
    terser({
      output: {
        ecma: 5,
      },
    }),
  ],
  globals
};

// Export config
export default [
  esConfig,
  // umdConfig,
  unpkgConfig
];
