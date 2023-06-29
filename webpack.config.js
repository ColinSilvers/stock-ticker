const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  module: {
    rules: [
      {
      loader: 'babel-loader',
      test:/\.js$/,
      exclude: /node_mudles/
    },
    {
      test: /\.(png|jpg|gif|json|xml|ico|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            outputPath: 'assets',
            publicPath: '/'
          }
        }
      ]
    },

  ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 8080,
  }
};