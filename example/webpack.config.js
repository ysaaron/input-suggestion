const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, './js/index.js'),

    output: {
      filename: 'bundle.js',
      publicPath: '/public/',
      path: path.resolve(__dirname, 'dist/')
    },
    
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.less$/,
          use: [{
              loader: 'style-loader'
          }, {
              loader: 'css-loader',
              options: {
                modules: true
              }
          }, {
              loader: 'less-loader'
          }]
        }
      ]
    },

    resolve: {
      alias: {
        jsx: path.resolve(__dirname, "../src/dom-generator/jsx")
      }
    }
  }