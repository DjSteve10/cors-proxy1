const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use(cors());

app.use('/:url(*)', (req, res, next) => {
  const target = req.params.url;
  if (!/^https?:\/\//i.test(target)) return res.status(400).send('Invalid URL');
  return createProxyMiddleware({ target, changeOrigin: true, pathRewrite: { ['^/' + target]: '' } })(req, res, next);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`CORS Proxy running on port ${PORT}`);
});
