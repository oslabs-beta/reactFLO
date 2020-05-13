const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  watch: true,
  entry: {
    bundle: './extension/index.ts',
    devtools: './extension/devtools.ts',
    background: './extension/background.ts',
    contentscript: './extension/contentscript.ts',
    inject: './extension/inject.ts',
    main: './extension/frontend/main.jsx',
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
        test: /\.jsx/,
        include: path.resolve('./extension/frontend/'),
        exclude: /node_modules/,
        use: 
        {
          loader: 'babel-loader',
          options: 
          {
            // @ sign is important!!
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      { 
        test: /\.css$/, 
        use: [
          'style-loader',
          'css-loader' 
        ]
      }
    ],
  },
  resolve: {
    extensions: [
      '.tsx', '.ts', '.js', '.jsx'
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build'),
  }
}