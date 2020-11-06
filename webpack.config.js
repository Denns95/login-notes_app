const path = require('path')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    home: path.resolve(__dirname, 'src/assets/js/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'assets', 'js'),
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // hot: true,
    // open: true,
    // noInfo: true,
    port: 3000
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.scss'],
    alias: {
      node_modules: path.join(__dirname, 'node_modules'),
      pages: path.join(__dirname, 'src/pages'),
      images: path.join(__dirname, 'src/assets/images'),
      modules: path.join(__dirname, 'src/assets/js')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Aplicación',
      template: path.join(__dirname, 'src/pages/index.html')
    }),
    // new MiniCssExtractPlugin({
    //   filename: 'assets/css/[name].css'
    // })
  ]
}