const db = require('../../data/db-config');

const getProjects = () => {
  return db('projects').then(projects =>
    projects.map(proj => {
      return {
        ...proj,
        completed: proj.completed > 0,
      };
    })
  );
};

const addProject = project => {
  return db('projects').insert(project);
};

module.exports = {
  getProjects,
  addProject,
};
