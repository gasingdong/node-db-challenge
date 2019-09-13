const db = require('../../data/db-config');
const Resources = require('../resources/resources-model');
const Tasks = require('../tasks/tasks-model');

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

const getProjectById = id => {
  const projectQuery = db('projects')
    .where({ id })
    .first();
  return Promise.all([
    projectQuery,
    Resources.getResourcesByProjectId(id),
    Tasks.getTasksByProjectId(id),
  ]).then(([project, resources, tasks]) => {
    return project
      ? {
          ...project,
          completed: project.completed > 0,
          resources,
          tasks,
        }
      : null;
  });
};

module.exports = {
  getProjects,
  addProject,
  getProjectById,
};
