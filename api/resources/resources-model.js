const db = require('../../data/db-config');

const getResources = () => {
  return db('resources');
};

const addResource = resource => {
  return db('resources').insert(resource);
};

module.exports = {
  getResources,
  addResource,
};
