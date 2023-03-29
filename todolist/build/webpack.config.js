let path = require("path");
let webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  /**
     * mode的取值有以下两个，默认是development
     * 1.development 开发环境
      不会对打包生成的文件进行代码压缩和性能优化
      打包速度快，适合在开发阶段使用

      2.production
      生成环境
      会对打包生成的文件进行代码压缩和性能优化
      打包速度很慢，仅适合在项目发布阶段使用
  */
  mode: "development",
  entry: "./src/main.js", // 入口： 默认是./src/index.html
  // 输出 告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。主要输出文件的默认值是 ./dist/main.js，其他生成文件默认放置在 ./dist 文件夹中。
  output: {
    path: path.join(__dirname, "dist"), // 输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
    filename: "bundle.js", // 默认是 ./dist/main.js
  },
  module: {
    // ... 其它规则
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              esModule: false, // 关闭es6模块化解析
              //[hash:7]取图片的hash的前7位  [ext]取文件原来扩展名
              // name: utils.assetsPath('img/[name].[hash:7].[ext]')
            },
          },
        ],
      },
    ],
  },
  devServer: {
    hot: true, // 启用 webpack 的 热模块替换 特性
    open: true, //初次打包完成后，自动打开浏览器
    host: "127.0.0.1", //实时打包所使用的主机地址
    port: 8080, // 将本地启动的服务默认端口号设置为8080
  },
  plugins: [
    // 生成一个 HTML5 文件， 在 body 中使用 script 标签引入你所有 webpack 生成的 bundle。 只需添加该插件到你的 webpack 配置中
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new VueLoaderPlugin(), // 使用npm 导入使用vue-loader的插件
    new webpack.HotModuleReplacementPlugin(), // 热更新引入(HMR 绝对不能被用在生产环境)
  ],
};
