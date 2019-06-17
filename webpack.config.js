const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: "./psyche/webpack-entry.tsx",
  mode: "development",
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /.tsx?/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    plugins: [new TsconfigPathsPlugin()]
  },
  plugins: [new HtmlWebpackPlugin()]
};
