/* eslint-disable */
const path = require('path')
const glob = require('glob')
const fs = require('fs')
const rootPath = process.cwd()
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { isHot, isPrd, isDev, isSource } = require('@tools/webpack/utils/process')

module.exports = {
  entry() {
    return {
      'example/*': path.join(rootPath, 'example/*/index.js')
    }
  },
  output: {
    path: path.join(rootPath, 'asset'),
    sourceMapFilename: `source-map/[file].map`
  },
  publicPath: '/',
  monitor: false,
  resolve: {
    extensions: [],
    alias: {
      '@root': path.join(rootPath),
      '@src': path.join(rootPath, 'src'),
      '@static': path.join(rootPath, 'static')
    }
  },
  externals: {},
  esLint: true,
  devtool: 'source-map',
  babelLoaderInclude: ['example', 'src', 'node_modules/@liepin'],
  esLintInclude() {
    return ['', '../example']
  },
  watchIgnored: [],
  loader: {},
  plugins({ allPlugins }) {
    return [
      allPlugins.CleanWebpackPlugin,
      allPlugins.WebpackBar,
      allPlugins.FriendlyErrorsPlugin,
      allPlugins.HardSourceWebpackPlugin,
      ...(isPrd() ? [allPlugins.MiniCssExtractPlugin] : []),
      ...(isSource() ? [] : [allPlugins.SourceMapDevToolPluginForHot]),
      new CopyWebpackPlugin([
        {
          from: path.join(rootPath, 'example/**/*.ico'),
          to: path.join(path.join(rootPath, 'asset'), '[name].[ext]')
        }
      ]),
      ...glob.sync(path.join(rootPath, 'example/*/index.html')).map((filePath) => {
        return new HtmlWebpackPlugin({
          inject: true,
          filename: filePath.replace(/^.*\/(.*?)\/.*?(\.s?html)$/, '$1$2'),
          template: filePath
        })
      })
    ]
  },
  devServer: {
    defaultBrowser: 'Google Chrome',
    host: '',
    openPage: '/demo.html',
    feHost: 'fet-proxy.lietou.com',
    port: '3000',
    https: false,
    proxy: {}
  }
}
