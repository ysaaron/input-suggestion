module.exports = {
    entry: './js/index.js',

    output: {
      filename: './dist/bundle.js'
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
    }
  }