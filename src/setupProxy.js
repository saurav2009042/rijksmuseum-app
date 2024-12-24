const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://www.rijksmuseum.nl',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api',
      },
      logLevel: 'debug',
    })
  );
};
