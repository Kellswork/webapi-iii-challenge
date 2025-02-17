const express = require('express');
const user = require('./users/userRouter');
const post = require('./posts/postRouter');
const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

server.use(express.json());
server.use(logger);
server.use('/api/users', user);
server.use('/api/posts', post);

module.exports = server;
