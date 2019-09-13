/* eslint-disable camelcase */
const express = require('express');
const Tasks = require('./tasks-model');

const router = express.Router();

router.use(express.json());

// Validation for task ID
const validateTaskId = async (req, res, next) => {
  const { id } = req.params;

  if (Number.isNaN(Number(id)) || !Number.isFinite(Number(id))) {
    res.status(400).json({ error: 'Invalid id.' });
    return;
  }

  try {
    const currentTask = await Tasks.getTaskById(id);

    if (currentTask) {
      req.task = currentTask;
      next();
    } else {
      res.status(404).json({ error: `Task with id ${id} does not exist.` });
    }
  } catch (err) {
    next(err);
  }
};

// Validation for task data
const validateTask = (req, res, next) => {
  const { body } = req;

  if (!body) {
    res.status(400).json({ error: 'No request body.' });
    return;
  }

  const { description, project_id } = body;

  if (description && project_id) {
    next();
  } else {
    res
      .status(400)
      .json({ error: 'Task requires a description and a project ID.' });
  }
};

// Router root endpoints
router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const tasks = await Tasks.getTasks();
      res.status(200).json(tasks);
    } catch (err) {
      next(err);
    }
  })
  .post(validateTask, async (req, res, next) => {
    try {
      const { notes, description, completed, project_id } = req.body;
      const result = await Tasks.addTask({
        notes,
        description,
        // Check explicitly against undefined to avoid database inputting null value
        completed: completed !== undefined && completed,
        project_id,
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:id')
  .all(validateTaskId)
  .get((req, res, next) => {
    try {
      const { task } = req;
      res.status(200).json(task);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
