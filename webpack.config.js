const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const ReactRefreshWebpackPlugin= require("@pmmmwh/react-refresh-webpack-plugin")


let mode = "development"
let target = "web"

if (process.env.NODE_ENV === "production") {
  mode = "production"
  target = "browserslist"
}

let plugins= [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: "./src/index.html",
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, "src/sw"),
        noErrorOnMissing: true
      },
      {
        from: path.resolve(__dirname, "src/icons"),
        noErrorOnMissing: true
      },
      {
        from: path.resolve(__dirname, "src/netlify.toml"),
        noErrorOnMissing: true
      }
    ]
  })
]

if(process.env.SERVE){
  plugins= [...plugins, new ReactRefreshWebpackPlugin()]
}

const rules= [
  {
    test: /\.(png|svg|gif|jpe?g)$/i,
    type: "asset/resource",
  },
  {
    test: /\.(s[ac]|c)ss$/i,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: { publicPath: "" },
      },
      "css-loader",
      "postcss-loader",
      "sass-loader",
    ],
  },
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
    },
    include: path.resolve(__dirname,"src")
  },
]

module.exports = {
  mode,
  target,
  devtool: "source-map",
  entry: "./src/index.js",
  module: {
    rules
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, "public"),
    assetModuleFilename: "images/[hash][ext][query]",
  },
  optimization: {
    runtimeChunk: 'single',
  },
  devServer: {
    historyApiFallback: true,
    publicPath: "/",
    contentBase: "public",
    hot: true,
    port: 3000,
  },
}
