const { defineConfig } = require("@vue/cli-service");
const { resolve } = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  devServer: {
    host: "0.0.0.0",
    port: 5566,
    proxy: {
      "/water": {
        target: "http://localhost:8002/",
        changeOrigin: true,
        pathRewrite: {
          "^/water": "",
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
});
