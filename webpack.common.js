const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './dev/js/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'eslint-loader'
      }
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [{
        loader: 'css-loader'
      },
      {
        loader: 'postcss-loader'
      },
      {
        loader: 'sass-loader',
        options: {
          implementation: require('sass')
        }
      },
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          url: false,
          sourceMap: true
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
      ]
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'images'
        }
      }]
    },
    {
      test: /\.(woff|woff2|ttf|otf|eot)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './fonts/',
          publicPath: './.'
        }
      }]
    }
    ]
  },

  devServer: {
    watchContentBase: true,
    compress: true
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    })
  ],

  mode: 'development'
}
