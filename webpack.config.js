const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  watch: true,
  entry: {
    devtools: './extension/devtools.ts',
    background: './extension/background.ts',
    contentscript: './extension/contentscript.ts',
    inject: './extension/inject.ts',
    main: './extension/frontend/main.tsx',
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
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(png|jpe?g|gif|jp2|webp)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      },
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