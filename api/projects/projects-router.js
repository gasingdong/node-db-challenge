const express = require('express');
const Projects = require('./projects-model');

const router = express.Router();

router.use(express.json());

// Validation for project ID
const validateProjectId = async (req, res, next) => {
  const { id } = req.params;

  if (Number.isNaN(Number(id)) || !Number.isFinite(Number(id))) {
    res.status(400).json({ error: 'Invalid id.' });
    return;
  }

  try {
    const currentProject = await Projects.getProjectById(id);

    if (currentProject) {
      req.project = currentProject;
      next();
    } else {
      res.status(404).json({ error: `Project with id ${id} does not exist.` });
    }
  } catch (err) {
    next(err);
  }
};

// Validation for project data
const validateProject = (req, res, next) => {
  const { body } = req;

  if (!body) {
    res.status(400).json({ error: 'No request body.' });
    return;
  }

  const { name } = body;

  if (name) {
    next();
  } else {
    res.status(400).json({ error: 'Project requires a name.' });
  }
};

// Router root endpoints
router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const projects = await Projects.getProjects();
      res.status(200).json(projects);
    } catch (err) {
      next(err);
    }
  })
  .post(validateProject, async (req, res, next) => {
    try {
      const { name, description, completed } = req.body;
      const result = await Projects.addProject({
        name,
        description,
        // Check explicitly against undefined to avoid database inputting null value
        completed: completed !== undefined && completed,
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:id')
  .all(validateProjectId)
  .get((req, res, next) => {
    try {
      const { project } = req;
      res.status(200).json(project);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
