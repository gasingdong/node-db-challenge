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

const getContextsByTaskId = id => {
  return db('task_contexts as tc')
    .where({ task_id: id })
    .join('contexts as c', 'c.id', 'tc.context_id')
    .select('c.description');
};

const getTaskById = id => {
  return db('tasks')
    .where({ id })
    .first()
    .then(task =>
      getContextsByTaskId(id).then(contexts => {
        return {
          ...task,
          contexts,
          completed: task.completed > 0,
        };
      })
    );
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
  getTaskById,
};
