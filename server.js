const express = require('express');
const user = require('./users/userRouter');
const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'origin'
    )}`
  );
  next();
}

server.use(logger);
server.use('/api/user', user);

module.exports = server;
