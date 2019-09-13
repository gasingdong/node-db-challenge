const express = require('express');
const ResourceRouter = require('./api/resources/resources-router');
const ProjectRouter = require('./api/projects/projects-router');
const TaskRouter = require('./api/tasks/tasks-router');

const server = express();

server.use(express.json());

server.use('/api/resources', ResourceRouter);
server.use('/api/projects', ProjectRouter);
server.use('/api/tasks', TaskRouter);

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
