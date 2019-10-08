const path = require('path');

const conf = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: 'dist/'
  },
  devServer: {
    overlay: true,
    compress: true,
    port: 3000,
    stats: 'errors-only'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/bode_modules/'
      }
    ]
  }
};

module.exports = (env, options) => {
  const production = options.mode === 'production';
  conf.devtool = production ? 'source-map' : 'eval-sourcemap';

  return conf;
};
