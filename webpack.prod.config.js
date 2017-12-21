const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'static/js/bundle.js'
  },
  // devtool: 'source-map',
  // 将错误信息 展示到源代码中 不再bundle中
  resolve:{
    extensions:[".js",".json",".jsx"]
  },
  module: {
    rules: [
     {
       test: /\.js$/,
       exclude: /node_modules/,
       use: {
         loader: 'babel-loader',
         options: {
           presets: ['env','react','stage-0']
         }
       }
     },
     {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          {
            loader:"css-loader",
            options:{
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer'),
                require('cssnano')
              ]
            }
          }
        ]
      })
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            // outputPath:'build/static/'
          }
        }
      ]
    }
   ]
 },
 plugins: [
   new CleanWebpackPlugin(['build']),
    new ExtractTextPlugin({
      filename:'static/css/bundle.min.css'
    }),
    // 压缩 js 去掉所有警告和console
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'public/index.html',
      filename: 'index.html'
    })
  ]
};
