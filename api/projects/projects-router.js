const express = require('express');
const Projects = require('./projects-model');

const router = express.Router();

router.use(express.json());

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
        completed,
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
