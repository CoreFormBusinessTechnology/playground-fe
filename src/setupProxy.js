const { createProxyMiddleware } = require('http-proxy-middleware');

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
  module.exports = function(app) {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://localhost:3000',
        changeOrigin: true,
      })
    );
  };
}