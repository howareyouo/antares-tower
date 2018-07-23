const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const apiMocker = require('webpack-api-mocker')
const webpack = require('webpack')
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'

var cssOption = {
  modules: false,
  importLoaders: 1,
  localIdentName: '[name]_[local]_[hash:base64]',
  sourceMap: true,
  minimize: true
}

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: dev ? '[name].js' : '[name].[hash:6].js',
    chunkFilename: dev ? '[id].js' : '[id].[hash:6].js',
    publicPath: '/'
  },
  // see https://webpack.github.io/docs/webpack-dev-server.html
  devServer: {
    noInfo: false,
    quiet: false,
    port: 3000,
    hot: true,
    // #https://github.com/webpack/webpack-dev-server/issues/882
    disableHostCheck: true,

    /* api mock
    before (app) {
      apiMocker(app, path.resolve('./mocker.js'), {
        proxy: {
          '/api/*': 'https://api.github.com/'
        },
        changeHost: true
      })
    },
    */

    // api proxy redirect
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:22111'
        // pathRewrite: {'^/api' : ''}
      }
    },
    inline: true,
    historyApiFallback: true,
    contentBase: '/public',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'javascript/auto',
        use:  [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'javascript/auto',
        use:  [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
            plugins: [
              ['import', {'libraryName': 'antd', 'libraryDirectory': 'es', 'style': true}] ,
              'react-hot-loader/babel'
            ]
          }
        }
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          dev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: cssOption
          },
          {
            loader: 'less-loader',
            options: {
              ...cssOption,
              javascriptEnabled: true,
              modifyVars: {
                'border-radius-base': '3px',
                'primary-color': '#af1f39',
                'link-color': '#af1f39'
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: dev ? '[name].css' : '[name].[hash:6].css',
      chunkFilename: dev ? '[id].css' : '[id].[hash:6].css'
    }),
    new HtmlWebPackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
    })
  ]
}
