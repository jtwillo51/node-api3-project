const express = require('express');
const userRouter = require("./users/userRouter");

const server = express();
server.use(express());
server.use(express.json());
server.use(logger)
server.use(userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(`time: ${time}, ip: ${req.ip}, method: ${req.method}, url: ${req.url}`)
  next()
}

module.exports = server;
