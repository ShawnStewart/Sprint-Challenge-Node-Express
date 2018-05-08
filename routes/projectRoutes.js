const express = require('express');

const router = express.Router();

const db = require('../data/helpers/projectModel');

const err_not_found = "A project with that specific ID does not exist.";

router.get('/', (req, res) => {
  db
    .get()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(project => {
      res.json(project);
    })
    .catch(err => {
      res.status(404).json({ message: err_not_found });
    });
});

router.get('/:id/actions', (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(project => {
      res.json(project.actions);
    })
    .catch(err => {
      res.status(404).json({ message: err_not_found});
    });
});

router.post('/', (req, res) => {
  projectInfo = req.body;

  db
    .insert(projectInfo)
    .then(response => {
      db
        .get(response.id)
        .then(project => {
          res.status(201).json(project);
        });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(response => {
      if (response !== null) {
        db
          .get(id)
          .then(project => {
            res.json(project);
          });
      } else {
        res.status(404).json({ message: err_not_found });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let project;

  db
    .get(id)
    .then(foundProject => {
      project = foundProject;

      db
        .remove(id)
        .then(response => {
          res.json(project);
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    })
    .catch(err => {
      res.status(404).json({ message: err_not_found });
    });
});

module.exports = router;