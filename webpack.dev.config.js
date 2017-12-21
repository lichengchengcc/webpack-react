const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'static/js/bundle.js'
  },
  devtool: 'source-map',
  // 将错误信息 展示到源代码中 不再bundle中
  devServer:{
    compress: true,
    port:3000,
    hot:true,
    historyApiFallback: true
  },
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
        use: ['style-loader','css-loader']
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
      new HtmlWebpackPlugin({
        title: 'My App',
        template: 'public/index.html',
        filename: 'index.html'
      }),
      new OpenBrowserPlugin({
        url:'http://localhost:3000/'
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  };
