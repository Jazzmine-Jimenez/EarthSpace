require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');

const app = express();

app.post('/api/env', uploadsMiddleware, (req, res, next) => {
  console.log(req.body);
});

app.use(staticMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
