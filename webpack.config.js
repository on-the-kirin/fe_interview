const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  target: "node",
  entry: {
    tutorial: path.resolve("./tutorial/ui/tutorialController.ts"),
    index: path.resolve("./index.ts"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "."),
    },
    modules: [path.resolve(__dirname, "."), "node_modules"],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
  ],
  output: {
    publicPath: "/",
    filename: "[name].js",
    path: path.resolve("dist"),
  },
  externals: [nodeExternals()],
};
