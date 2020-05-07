const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    bundle: './extension/index.ts',
    devtools: './extension/devtools.ts',
    background: './extension/background.ts',
    contentscript: './extension/contentscript.ts',
    inject: './extension/inject.ts',
  },
  plugins: [
    new CopyWebpackPlugin([
        { from: 'extension/manifest.json', to: 'manifest.json' },
        { from: 'extension/devtools.html', to: 'devtools.html' },
        { from: 'extension/panel.html', to: 'panel.html' },
      ]),
  ],
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [
      '.tsx', '.ts', '.js'
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build'),
  }
}