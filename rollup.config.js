
import { nodeResolve } from "@rollup/plugin-node-resolve";
import ts from 'rollup-plugin-typescript2';
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";
import path from "path";

export default {
  input: "packages/vue/src/index.ts",
  output: {
    name: "Vue", // window.mini-vue3
    format: "umd",
    file: path.resolve("dist/vue.js"),
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      extensions: [".js", ".ts", 'tsx'],
    }),
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    serve({
      open: true,
      openPage: '/public/index.html',
      port: 3000,
      contentBase: ''
    })
  ],
};
