const db = require('../../data/db-config');

const getTasks = () => {
  return db('tasks as t')
    .join('projects as p', 't.project_id', 'p.id')
    .select(
      't.id',
      't.description as task_description',
      't.notes',
      't.completed',
      'p.name as project_name',
      'p.description as project_description'
    )
    .then(tasks =>
      tasks.map(task => {
        return {
          ...task,
          completed: task.completed > 0,
        };
      })
    );
};

const addTask = task => {
  return db('tasks').insert(task);
};

const getTasksByProjectId = id => {
  return db('tasks')
    .where({ project_id: id })
    .select('id', 'description', 'notes', 'completed')
    .then(tasks =>
      tasks.map(task => {
        return {
          ...task,
          completed: task.completed > 0,
        };
      })
    );
};

module.exports = {
  getTasks,
  addTask,
  getTasksByProjectId,
};
