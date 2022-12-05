const { resolve } = require('path')

module.exports = {
  webpack: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  devServer: {
    port: 8888,
    host: 'localhost'
  }
}
