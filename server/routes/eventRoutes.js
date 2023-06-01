// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', (req, res) => {
  Event.getAll(events => {
    res.json(events);
  });
});

router.get('/:id', (req, res) => {
  const eventId = req.params.id;
  Event.getById(eventId, event => {
    res.json(event);
  });
});

router.post('/', (req, res) => {
  const { id, name, date, location } = req.body;
  const event = new Event(id, name, date, location);
  event.save(result => {
    res.json(result);
  });
});

module.exports = router;
