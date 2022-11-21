const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output:{
    publicPath:'http://localhost:7072/'
  },
  devServer: {
    port: 7072,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name:"auth",
      filename:'remoteEntry.js',
      exposes:{
        './AuthApp': './src/boostrap'
      },
      shared:packageJson.dependencies
    })
  ],
};

module.exports = merge(commonConfig, devConfig);
