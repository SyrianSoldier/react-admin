const { whenDev, whenProd, pluginByName, getPlugin } = require('@craco/craco')
const path = require('path')
const defaultSettings = require('./src/settings')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const { title } = defaultSettings
const resolve = p => path.resolve(__dirname, p)

const cdns = {
  js: ['https://cdn.bootcdn.net/ajax/libs/xlsx/0.18.5/xlsx.full.min.js']
}

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src')
    },
    configure: webpackConfig => {
      /* plugins */
      whenProd(() => {
        webpackConfig.plugins = [
          ...webpackConfig.plugins,
          /* bundle-analyzer */
          new BundleAnalyzerPlugin(),
          /* gzip压缩 */
          new CompressionWebpackPlugin({
            test: /\.(html|js|css)/
          })
        ]
      })
      /* cdns */
      whenProd(() => {
        webpackConfig.externals = {
          xlsx: 'XLSX'
        }

        const { isFound, match } = getPlugin(
          webpackConfig,
          pluginByName('HtmlWebpackPlugin')
        )

        if (isFound) {
          // 这里要用userOptions挂载， 模板中用htmlWebpackPlugin.options读取
          match.userOptions.cdns = cdns
        }
      })
      /* split-chunks */
      whenProd(() => {
        webpackConfig.optimization.runtimeChunk = 'single'
        webpackConfig.optimization.splitChunks = {
          ...webpackConfig.optimization.splitChunks,
          chunks: 'all',
          cacheGroups: {
            vendors: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              reuseExistingChunk: true,
              priority: 10
            },
            react: {
              name: 'chunk-react',
              test: /(react|react-dom)/,
              priority: 20,
              chunks: 'initial'
            },
            antd: {
              name: 'chunk-antd',
              test: /[\\/]node_modules[\\/]antd/,
              priority: 25
            },
            components: {
              name: 'chunk-components',
              test: path.resolve(__dirname, 'src/components'),
              priority: 15,
              minChunks: 2,
              reuseExistingChunk: true
            }
          }
        }
      })
      /* imagemin */
      whenProd(() => {
        webpackConfig.optimization.minimizer.push(
          new ImageMinimizerPlugin({
            minimizer: {
              implementation: ImageMinimizerPlugin.imageminMinify, // 共有imageminMinify和squooshMinify两种模式
              options: {
                plugins: [
                  ['gifsicle', { interlaced: true }],
                  [
                    'mozjpeg',
                    {
                      // 图片压缩质量
                      quality: 50,
                      //是否开启渐进式图片
                      progressive: true
                    }
                  ],
                  ['pngquant', { quality: [0.3, 0.5] }],
                  [
                    'svgo',
                    {
                      plugins: [
                        'preset-default',
                        {
                          name: 'removeViewBox',
                          active: false
                        },
                        {
                          name: 'addAttributesToSVGElement',
                          params: {
                            attributes: [
                              { xmlns: 'http://www.w3.org/2000/svg' }
                            ]
                          }
                        }
                      ]
                    }
                  ]
                ]
              }
            }
          })
        )
      })
      /* preload */
      return webpackConfig
    }
  },
  devServer: {
    port: 9999,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://ihrm.itheima.net',
        // target: 'http://liufusong.top:3000',
        changeOrigin: true
      }
    }
  }
}
