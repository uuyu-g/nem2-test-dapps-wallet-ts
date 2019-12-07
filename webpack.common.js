const path = require("path");

module.exports = {
  entry: {
    popup: path.join(__dirname, "src/index.tsx"),
    background: path.join(__dirname, "src/background/background.ts"),
    contentscript: path.join(__dirname, "src/contentscript.ts"),
    inpage: path.join(__dirname, "src/inpage/inpage.ts")
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js",
    globalObject: "this" // ポイント！
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },
  // target: "node", つけない
  externals: [/node_modules/, "bufferutil", "utf-8-validate"],
  node: {
    fs: "empty",
    global: true,
    crypto: true,
    tls: "empty",
    net: "empty",
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};
