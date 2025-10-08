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
  devServer: {
    host: "0.0.0.0", // Listen on all network interfaces (needed for Netlify preview)
    allowedHosts: "all", // Disable host header check
    port: 8080, // Optional: specify your dev server port
  },
};
