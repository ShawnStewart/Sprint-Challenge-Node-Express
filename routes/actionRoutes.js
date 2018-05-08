const express = require('express');

const router = express.Router();

const db = require('../data/helpers/actionModel');

const err_not_found = "An action with that specific ID does not exist.";

router.get('/', (req, res) => {
  db
    .get()
    .then(action => {
      res.json(action);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(action => {
      res.json(action);
    })
    .catch(err => {
      res.status(404).json({ message: err_not_found });
    });
})

router.post('/', (req, res) => {
  actionInfo = req.body;

  db
    .insert(actionInfo)
    .then(response => {
      db
        .get(response.id)
        .then(action => {
          res.status(201).json(action);
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
          .then(action => {
            res.json(action);
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
  let action;

  db
    .get(id)
    .then(foundAction => {
      action = foundAction;

      db
        .remove(id)
        .then(response => {
          res.json(action);
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