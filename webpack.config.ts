import webpack from "webpack";
import path from "path";
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CompressionPlugin from "compression-webpack-plugin";
// import pathAlias from './path-alias';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import pathAlias from './path-alias';
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' })
const isDevelopment = process.env.NODE_ENV !== 'production'
const stylesHandler = MiniCssExtractPlugin.loader;
const ENV_VARIABLES = JSON.stringify(dotenv.parsed);
const tsconfigPathsEntry = require.resolve('tsconfig-paths-webpack-plugin');

const reactRefreshRuntimeEntry = require.resolve('react-refresh/runtime');
const reactRefreshWebpackPluginRuntimeEntry = require.resolve(
  '@pmmmwh/react-refresh-webpack-plugin'
);
const babelRuntimeEntry = require.resolve('babel-preset-react-app');
const babelRuntimeEntryHelpers = require.resolve(
  '@babel/runtime/helpers/esm/assertThisInitialized',
  { paths: [babelRuntimeEntry] }
);
const babelRuntimeRegenerator = require.resolve('@babel/runtime/regenerator', {
  paths: [babelRuntimeEntry],
});

interface Configuration extends webpack.Configuration {
  devServer?: WebpackDevServerConfiguration
}

const config: Configuration = {
  mode: isDevelopment ? "development" : "production",
  output: {
    publicPath: "/",
    filename: 'app-[contenthash:7].js',
    path: path.resolve(__dirname, 'build'),
  },
  entry: "./src/index",
  optimization: {
    minimize: !isDevelopment,
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              isDevelopment &&
                require.resolve('react-refresh/babel'),
            ].filter(Boolean)
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          stylesHandler,
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                auto: true,
                localIdentName: "[name]__[local]--[hash:base64:5]",
              }
              // url: {
              //     filter: (url: string) => {
              //       // Semantic-UI-CSS has an extra semi colon in one of the URL due to which CSS loader along
              //       // with webpack 5 fails to generate a build.
              //       // Below if condition is a hack. After Semantic-UI-CSS fixes this, one can replace use clause with just
              //       // use: ['style-loader', 'css-loader']
              //       if (url.includes('charset=utf-8;;')) {
              //         return false;
              //       }
              //       return true;
              //     },
              // }
            },
          },
          'postcss-loader'
        ],
      },
      // {
      //   test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
      //   exclude: /node_modules/,
      //   type: 'asset',
      // },
      // {
      //   test: /\.svg/,
      //   use: ["@svgr/webpack"],
      // },
      {
        test: /\.(svg)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      // "file" loader makes sure those assets get served by WebpackDevServer.
      // When you `import` an asset, you get its (virtual) filename.
      // In production, they would get copied to the `build` folder.
      // This loader doesn't use a "test" so it will catch all modules
      // that fall through the other loaders.
      {
        // Exclude `js` files to keep "css" loader working as it injects
        // its runtime that would otherwise be processed through "file" loader.
        // Also exclude `html` and `json` extensions so they get processed
        // by webpacks internal loaders.
        exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    // This allows you to set a fallback for where webpack should look for modules.
      // We placed these paths second because we want `node_modules` to "win"
      // if there are any conflicts. This matches Node resolution mechanism.
      // https://github.com/facebook/create-react-app/issues/253
      modules: ['node_modules'],
      // These are the reasonable defaults supported by the Node ecosystem.
      // We also include JSX as a common component filename extension to support
      // some tools, although we do not recommend using it, see:
      // https://github.com/facebook/create-react-app/issues/290
      // `web` extension prefixes have been added for better support
      // for React Native Web.
    extensions: [".tsx", ".ts", ".js",'jsx','json', '.css', '.scss'],
    // preferRelative: true,
    alias: pathAlias,
    // alias: resolveTsAliases(path.resolve("tsconfig.json")),
    plugins: [
       // Prevents users from importing files from outside of src/ (or node_modules/).
        // This often causes confusion because we only process files within src/ with babel.
        // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
        // please link the files into your node_modules/ and let module-resolution kick in.
        // Make sure your source files are compiled, as they will not be processed in any way.
        new ModuleScopePlugin(path.resolve("src"), [
          "package.json",
          reactRefreshRuntimeEntry,
          reactRefreshWebpackPluginRuntimeEntry,
          babelRuntimeEntry,
          babelRuntimeEntryHelpers,
          babelRuntimeRegenerator,
          
        ]),
        // new TsconfigPathsPlugin({extensions: [".tsx", ".ts", ".js",'jsx','json']})
      ],
    fallback: {
      assert: false,
    },
  },
  plugins: [
    // This gives some necessary context to module not found errors, such as
      // the requesting resource.
    new ModuleNotFoundPlugin(path.resolve(".")),
    new CompressionPlugin(),
    new webpack.DefinePlugin({
      // 'process.env': ENV_VARIABLES,
      'window.env': ENV_VARIABLES,
      'window.env.PRODUCTION': isDevelopment ? false : true,
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./public/images", to: "images" },
      ],
    }),
    new MiniCssExtractPlugin(),
    new ReactRefreshWebpackPlugin({
      overlay: false,
    })
  ],
  devtool: isDevelopment ? "inline-source-map" : false,
  performance: {
    hints: false,
  },
  devServer: {
    // static: path.join(__dirname, "public"),
    historyApiFallback: true,
    host: 'localhost',
    open: true,
    port: 3000,
    hot: true
    
  },
};

export default config;
