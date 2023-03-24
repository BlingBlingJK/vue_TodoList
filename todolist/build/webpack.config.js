const path = require("path");
module.exports = {
  mode: "development", // 开发模式
  entry: path.resolve(__dirname, "../src/main.js"), // 入口文件
  output: {
    filename: "output.js", // 打包后的文件名称
    path: path.resolve(__dirname, "../dist"), // 打包后的目录，不用新建，打包后自动生成
    clean: true, //自动清理打包目录
  },
};
