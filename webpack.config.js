var path = require("path");
var webpack = require("webpack");
var packageData = require("./package.json");

module.exports = {
  entry: {
    // Point "entry" to scripts you want to be CLI-eligible.
    "main-script-name": "./src/main.ts",
  },
  mode: "development",
  devtool: false,
  output: {
    // Change the final string here to the name you want your script to use in mafia.
    path: path.resolve(__dirname, "KoLmafia", "scripts", packageData.name),
    filename: "[name].js",
    libraryTarget: "commonjs",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        // exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [],
  externals: {
    // Add any ASH scripts you would like to use here.
    kolmafia: "commonjs kolmafia",
    "canadv.ash": "commonjs canadv.ash",
  },
};
