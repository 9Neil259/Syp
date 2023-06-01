const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// Definieren der Route für den Endpunkt "/events"
app.get('/events', (req, res) => {
  // Abrufen der Events aus Redis
  const client = redis.createClient();
  client.get('events', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Fehler beim Abrufen der Events' });
    } else if (data) {
      // Wenn Events bereits im Cache vorhanden sind, sende sie als JSON-Response
      res.json(JSON.parse(data));
    } else {
      // Wenn Events nicht im Cache vorhanden sind, führe die Datenbankabfrage durch
      // und speichere die Events im Cache
      const events = [
        { id: 1, name: 'Abend', date: '04.02.00', location: 'Graz' },
        { id: 2, name: 'Event 2', date: '05.06.57', location: 'Wien' },
        { id: 3, name: 'Event 3', date: '07.01.74', location: 'Graz' },
      ];

      // Speichern der Events im Cache
      client.set('events', JSON.stringify(events));

      // Senden der Events als JSON-Response
      res.json(events);
    }
  });
});

app.post('/events', (req, res) => {
  const event = req.body;
  // Generieren einer eindeutigen ID für das Event
  event.id = Date.now();

  // Speichern des Events im Cache
  const client = redis.createClient();
  client.get('events', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Fehler beim Abrufen der Events' });
    } else if (data) {
      const events = JSON.parse(data);
      events.push(event);
      client.set('events', JSON.stringify(events));
      res.status(201).json(event);
    } else {
      const events = [event];
      client.set('events', JSON.stringify(events));
      res.status(201).json(event);
    }
  });
});

// Starten des Servers
app.listen(3000, () => {
  console.log('Server gestartet auf Port 3000');
});
