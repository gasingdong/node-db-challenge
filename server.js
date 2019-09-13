const express = require('express');

const server = express();

server.use(express.json());

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  }
  console.log(err);
  res
    .status(500)
    .json({ error: 'Error occurred while processing server operation.' });
};

server.use(errorHandler);

module.exports = server;
