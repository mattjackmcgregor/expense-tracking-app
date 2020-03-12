const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

process.env.NODE_ENV = process.env.NODE_ENV || 'development' 

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test'})
} else if (process.env.NODE_ENV ==='development') {
  require('dotenv').config({ path: '.env.development'})
}
module.exports = (env) => {
  const isProduction = env === 'production'
  const CSSExtract = new ExtractTextPlugin('styles.css')

  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        { test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }, {
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              },
            ]
          }) 
        }
      ]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.API': JSON.stringify(process.env.API),
        'process.env.AUTH_DOMAIN': JSON.stringify(process.env.AUTH_DOMAIN),
        'process.env.DATABASE_URL': JSON.stringify(process.env.DATABASE_URL),
        'process.env.PROJECT_ID': JSON.stringify(process.env.PROJECT_ID),
        'process.env.STORAGE_BUCKET': JSON.stringify(process.env.STORAGE_BUCKET),
        'process.env.MESSAGINE_SENDER_ID': JSON.stringify(process.env.MESSAGINE_SENDER_ID),
        'process.env.APP_ID': JSON.stringify(process.env.APP_ID),
        'process.env.MEASUREMENT_ID': JSON.stringify(process.env.MEASUREMENT_ID),
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  } 
  
}
