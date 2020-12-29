require('dotenv/config');
const express = require('express');
const pg = require('pg');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();

app.post('/api/post-form', uploadsMiddleware, (req, res, next) => {
  const { title, tags, content } = req.body;
  const image = req.file.filename;
  const params = [title, tags, content, image, 1];

  const sql = `
    insert into "Post" ("title", "tags", "content", "image", "userId")
         values  ($1, $2, $3, $4, $5)
      returning  *
  `;
  db.query(sql, params)
    .then(results => {
      res.json(results.rows[0]);
    })
    .catch(err => next(err));
});

app.use(staticMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
