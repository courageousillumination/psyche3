const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    psyche: "./psyche/debug/render-app.tsx",
    worker: "./psyche/worker/index.ts"
  },
  mode: "development",
  output: {
    filename: "[name]-bundle.js"
  },
  module: {
    rules: [
      {
        test: /.tsx?/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { modules: true } },
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    plugins: [new TsconfigPathsPlugin()]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./psyche/debug/template.html" }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      "process.env.USE_REST_BACKEND": JSON.stringify(!!process.env.PSYCHE_REST),
      "process.env.REST_BACKEND_HOST": JSON.stringify(
        process.env.PSYCHE_REST_HOST || "http://localhost:8000/"
      )
    })
  ]
};
