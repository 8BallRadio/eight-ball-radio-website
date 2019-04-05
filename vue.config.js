const path = require("path");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin")

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/styles/global.scss")]
    }
  },
  configureWebpack: {
    plugins: [
      new PreloadWebpackPlugin({
        rel: "preload",
        include: "all"
      })
    ]
  }
};
