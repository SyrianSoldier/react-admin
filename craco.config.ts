const path = require('path')
const interpolateHtml = require('craco-interpolate-html-plugin')
const defaultSettings = require('./src/settings')

const { title } = defaultSettings
const resolve = (p: string) => path.resolve(__dirname, p)

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src')
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
  },
  plugins: [
    {
      plugin: interpolateHtml,
      // Enter the variable to be interpolated in the html file
      options: {
        preText: title
      }
    }
  ]
}
export default {}
