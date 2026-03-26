const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
  mode: isDev ? 'development' : 'production',

  // ── Entry & Output ──────────────────────────────────────
  entry: './src/main.js',
  output: {
    filename: 'main.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,           // limpia dist/ en cada build
    assetModuleFilename: 'images/[name].[contenthash][ext]',
  },

  // ── Source maps solo en desarrollo ──────────────────────
  devtool: isDev ? 'eval-source-map' : false,

  // ── Dev Server ──────────────────────────────────────────
  devServer: {
    static: './dist',
    hot: true,
    open: true,
    port: 8080,
  },

  // ── Módulos / Loaders ───────────────────────────────────
  module: {
    rules: [
      // CSS + PostCSS
      {
        test: /\.css$/i,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },

      // Imágenes
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // < 8KB → base64 inline
          },
        },
      },

      // Fuentes
      {
        test: /\.(woff2?|ttf|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[contenthash][ext]',
        },
      },
    ],
  },

  // ── Plugins ─────────────────────────────────────────────
  plugins: [
    // HTML minificado con assets inyectados
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: isProd
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
          }
        : false,
    }),

    // Extrae CSS a archivos separados (solo producción)
    isProd &&
      new MiniCssExtractPlugin({
        filename: 'main.[contenthash].css',
      }),

    // Analizador de bundle (plugin adicional #1)
    isProd &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',        // genera report.html, no abre navegador
        openAnalyzer: false,
        reportFilename: 'bundle-report.html',
      }),
  ].filter(Boolean),

  // ── Optimización ────────────────────────────────────────
  optimization: {
    minimize: isProd,
    minimizer: [
      // Minifica JS
      new TerserPlugin(),

      // Minifica CSS
      new CssMinimizerPlugin(),

      // Comprime imágenes (plugin adicional #2)
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              jpeg: { quality: 80 },
              png: { quality: 80 },
              webp: { quality: 80 },
            },
          },
        },
      }),
    ],

    // Code splitting: separa vendors del código propio
    splitChunks: {
      chunks: 'all',
    },
  },
};