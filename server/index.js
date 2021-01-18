require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2'); // eslint-disable-line
const express = require('express');
const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const authorizationMiddleware = require('./authorization-middleware');
const app = express();
const jsonMiddleware = express.json();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(jsonMiddleware);
app.use(staticMiddleware);

app.post('/api/auth/sign-up', (req, res, next) => {
  const { firstName, lastName, username, password } = req.body;
  if (!username || !password || !firstName || !lastName) {
    throw new ClientError(400, 'first name, last name, username and password are required fields');
  }

  argon2
    .hash(password)
    .then(hashedPassword => {
      const params = [username, firstName, lastName, hashedPassword];
      const sql = `
        insert into "Users" ("username", "firstName", "lastName", "hashedPassword")
        values ($1, $2, $3, $4)
        returning "userId", "username", "createdAt"
      `;

      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }

  const params = [username];

  const sql = `
    select "userId", "hashedPassword", "username"
      from "Users"
     where "username" = $1
  `;

  db
    .query(sql, params)
    .then(result => {
      if (result.rows.length === 0) {
        throw new ClientError(401, 'invalid login');
      } else {
        const hashedPassword = result.rows[0].hashedPassword;
        argon2
          .verify(hashedPassword, password)
          .then(isMatching => {
            if (isMatching === false) {
              throw new ClientError(400, 'Invalid login');
            } else {
              const payload = {
                userId: result.rows[0].userId,
                username: params[0]
              };
              const token = jwt.sign(payload, process.env.TOKEN_SECRET);
              res.status(201).json({ token, payload });
            }
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

app.get('/api/post/:postId', (req, res, next) => {
  const postId = req.params.postId;

  if (!postId) {
    throw new ClientError(400, 'PostId is a required fields');
  }

  const params = [postId];
  const sql = `
    select "Post"."title",
           "Post"."tags",
           "Post"."content",
           "Post"."image",
           "Post"."postId",
           "Users"."username"
      from "Post"
      join "Users" using ("userId")
     where "Post"."postId" = $1
  `;
  db.query(sql, params)
    .then(results => {
      res.json(results.rows[0]);
    })
    .catch(err => next(err));
});

app.delete('/api/likes/:userId/post/:postId', (req, res, next) => {
  // const { userId } = req.user;
  const userId = req.params.userId;
  const postId = req.params.postId;
  console.log(userId);
  console.log(postId);

  const params = [postId, userId];
  const sql = `
     delete from "likes"
           where "postId" = $1
             and "userId" = $2
       returning *
  `;
  db.query(sql, params)
    .then(results => {
      res.json(results.rows);
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.post('/api/post-form', uploadsMiddleware, (req, res, next) => {
  const { title, content } = req.body;
  let { tags } = req.body;
  const { userId } = req.user;

  if (!title || !tags || !content) {
    throw new ClientError(400, 'A title, tags and content are required fields');
  }

  if (!Array.isArray(tags)) {
    tags = [tags];
  }

  const tagsArray = JSON.stringify(tags);
  const imageUrl = `images/${req.file.filename}`;

  const params = [title, tagsArray, content, imageUrl, userId];
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

app.get('/api/users-posts', (req, res, next) => {
  const { userId } = req.user;

  if (!userId) {
    throw new ClientError(400, 'UserId is a required fields');
  }

  const params = [userId];
  const sql = `
    select "Post"."title",
           "Post"."tags",
           "Post"."content",
           "Post"."image",
           "Post"."postId",
           "Users"."username"
      from "Post"
      join "Users" using ("userId")
     where "userId" = $1
  order by "postId" desc
  `;

  db.query(sql, params)
    .then(results => {
      res.json(results.rows);
    })
    .catch(err => next(err));
});

app.put('/api/post/:postId', uploadsMiddleware, (req, res, next) => {
  const postId = req.params.postId;
  const { userId } = req.user;
  const { title, content } = req.body;
  let { tags } = req.body;

  if (!postId) {
    throw new ClientError(400, 'PostId is a required fields');
  }

  if (!Array.isArray(tags)) {
    tags = [tags];
  }

  const tagsArray = JSON.stringify(tags);
  let imageUrl = null;

  if (req.file) {
    imageUrl = `images/${req.file.filename}`;
  }

  const params = [title, tagsArray, content, imageUrl, postId, userId];
  const sql = `
    update "Post"
       set "title" = $1,
           "tags" = $2,
           "content" = $3,
           "image" = coalesce($4, "image")
     where "postId" = $5
       and "userId" = $6
 returning *
  `;
  db.query(sql, params)
    .then(results => {
      res.json(results.rows);
    })
    .catch(err => next(err));
});

app.delete('/api/post/:postId', (req, res, next) => {
  const postId = req.params.postId;
  const { userId } = req.user;

  if (!postId) {
    throw new ClientError(400, 'PostId is a required fields');
  }

  const params = [postId, userId];

  const sql = `
    delete from "Post"
          where "postId" = $1
            and "userId" = $2
      returning *
  `;
  db.query(sql, params)
    .then(results => {
      res.json(results.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/likes/post/:postId', (req, res, next) => {
  const { userId } = req.user;
  const postId = req.params.postId;

  const params = [postId, userId];
  const sql = `
     insert into "likes" ("postId", "userId")
          values ($1, $2)
       returning *
  `;
  db.query(sql, params)
    .then(results => {
      res.json(results.rows);
    })
    .catch(err => next(err));
});

app.get('/api/likes', (req, res, next) => {
  const { userId } = req.user;

  const params = [userId];
  const sql = `
     select "postId"
       from "likes"
      where "userId" = $1
  `;
  db.query(sql, params)
    .then(results => {
      console.log(results.rows);
      res.json(results.rows);
    })
    .catch(err => next(err));
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
