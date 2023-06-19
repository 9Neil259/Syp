const express = require('express');
const router = express.Router();

const Event = require('../models/Event');

router.get('/', (req, res) => {
  Event.getAll((events) => {
    res.json(events);
  });
});

router.get('/:id', (req, res) => {
  const eventId = req.params.id;
  Event.getById(eventId, (event) => {
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  });
});

router.post('/', (req, res) => {
  const { name, date, location } = req.body;
  const event = new Event(name, date, location);
  event.save((result) => {
    if (result.success) {
      res.json({ success: true, eventId: result.eventId });
    } else {
      res.status(500).json({ error: result.message });
    }
  });
});

module.exports = router;
