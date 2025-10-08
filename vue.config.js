const path = require("path");

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, "src/styles/setup/_variables.scss"),
        path.resolve(__dirname, "src/styles/setup/_typography.scss"),
        path.resolve(__dirname, "src/styles/setup/_reset.scss"),
        path.resolve(__dirname, "src/styles/setup/_common.scss"),
        path.resolve(__dirname, "src/styles/setup/_animations.scss"),
      ],
    },
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  },
};
