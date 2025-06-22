const express = require('express');
const cors = require('cors');
const request = require('request');
const app = express();

app.use(cors());

app.get('/proxy', (req, res) => {
  let url = req.query.url;

  if (!url) {
    return res.status(400).send('Missing url parameter');
  }

  try {
    url = decodeURIComponent(url); // ← decodăm URL-ul
  } catch (e) {
    return res.status(400).send('Invalid URL encoding');
  }

  request({ url, followAllRedirects: true })
    .on('error', (err) => {
      res.status(500).send('Error fetching target: ' + err.message);
    })
    .pipe(res);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
