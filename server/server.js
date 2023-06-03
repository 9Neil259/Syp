const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');

const app = express();
// Create a new Redis client instance
const client = redis.createClient({
  host: 'localhost',
  port: 6379,
  // Add any additional configuration options here
});

// Handle any connection errors
client.on('error', (error) => {
  console.error('Redis connection error:', error);
});

// Start the server after the Redis client is connected
client.on('ready', () => {
  app.listen(3001, () => {
    console.log('Server started on port 3001');
  });
});

app.use(bodyParser.json());

// Definieren der Route für den Endpunkt "/events"
app.get('/events', (req, res) => {
  // Abrufen der Events aus Redis
 
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

process.on('SIGINT', () => {
  // Close the Redis client before shutting down the server
  client.quit(() => {
    console.log('Redis client closed');
    process.exit(0);
  });
});
