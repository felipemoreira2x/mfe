const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 7069,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    
    new ModuleFederationPlugin({
      name:'container',
      remotes: {
        marketing:'marketing@http://localhost:7071/remoteEntry.js'
      },
      shared:packageJson.dependencies
    })
  ],
};

module.exports = merge(commonConfig, devConfig);
