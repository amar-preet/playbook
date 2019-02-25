module.exports = {
  entry: './client/index.js',

  output: {
    filename: './public/bundle.js',
    publicPath: ''

  },
  devServer: {
    historyApiFallback: {
      index: 'index.html'
    },
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }
}
