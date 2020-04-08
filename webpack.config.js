const webpack = require('webpack');
const env = require('yargs').argv.mode;
const path = require('path');

const sources = location => path.join(__dirname, './src', location);

const libraryName = 'MobxSchemaForm';
let outputFile;
let mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';


if (process.env.NODE_ENV === 'production') {
  outputFile = `${libraryName}.min.js`;
} else {
  outputFile = `${libraryName}.js`;
}

const config ={
  entry: path.join(__dirname, './src/index.js'),
  target: 'web',
  mode,
  node: {
    global: true,
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [sources('')],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },

  output: {
    filename: outputFile,
    sourcePrefix: '',
    path: path.resolve(__dirname, './lib'),
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      src: path.join(__dirname, './src'),
    },
  },
};

const compiler = webpack(config);
compiler.run((err, stats) => {
  if (err) throw err;

  // Output stats
  console.log(stats.toString({
    colors: true,
    hash: false,
    chunks: false,
    version: false,
    children: false,
    chunkModules: false,
  }));
});
