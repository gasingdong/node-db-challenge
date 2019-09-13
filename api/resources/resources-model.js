const db = require('../../data/db-config');

const getResources = () => {
  return db('resources');
};

const addResource = resource => {
  return db('resources').insert(resource);
};

const getResourcesByProjectId = id => {
  return db('project_resources as pr')
    .where({ project_id: id })
    .leftJoin('resources as r', 'pr.resources_id', 'r.id')
    .select('id', 'name', 'description');
};

module.exports = {
  getResources,
  addResource,
  getResourcesByProjectId,
};
