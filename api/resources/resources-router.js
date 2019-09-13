const express = require('express');
const Resources = require('./resources-model');

const router = express.Router();

router.use(express.json());

// Validation for resource data
const validateResource = (req, res, next) => {
  const { body } = req;

  if (!body) {
    res.status(400).json({ error: 'No request body.' });
    return;
  }

  const { name } = body;

  if (name) {
    next();
  } else {
    res.status(400).json({ error: 'Resource requires a name.' });
  }
};

// Router root endpoints
router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const resources = await Resources.getResources();
      res.status(200).json(resources);
    } catch (err) {
      next(err);
    }
  })
  .post(validateResource, async (req, res, next) => {
    try {
      const { name, description } = req.body;
      const result = await Resources.addResource({ name, description });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
