const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output:{
    publicPath:'http://localhost:7073/'
  },
  devServer: {
    port: 7073,
    historyApiFallback: {
      index: "/index.html",
    },
    headers:{
      'Access-Control-Allow-Origin':'*'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name:"dashboard",
      filename:'remoteEntry.js',
      exposes:{
        './DashboardApp': './src/boostrap'
      },
      shared:packageJson.dependencies
    })
  ],
};

module.exports = merge(commonConfig, devConfig);
