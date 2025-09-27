const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api/qwen": {
        target: "https://dashscope.aliyuncs.com",
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          "^/api/qwen": "/api/v1/services/aigc/text-generation/generation",
        },
        headers: {
          Origin: "https://dashscope.aliyuncs.com",
        },
      },
    },
  },
});
