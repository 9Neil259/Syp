const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
// Create a new Redis client instance
const client = redis.createClient({
  host: 'localhost',
  port: 6379,
  // Add any additional configuration options here
});
client.connect();
// Handle any connection errors
client.on('error', (error) => {
  console.error('Redis connection error:', error);
});

// Start the server after the Redis client is connected
client.on('ready', () => {
  console.log('Redis client connected');
  app.listen(3001, () => {
    console.log('Server started on port 3001');
  });
});

app.use(bodyParser.json());

// Define the route for the "/events" endpoint
app.get('/events', (req, res) => {
  // Retrieve events from Redis

  client.get('events', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Fehler beim Abrufen der Events' });
    } else if (data) {
      // If events are already present in the cache, send them as a JSON response
      res.json(JSON.parse(data));
    } else {
      // If events are not present in the cache, perform the database query
      // and store the events in the cache
      const events = [
        { id: 1, name: 'Abend', date: '04.02.00', location: 'Graz' },
        { id: 2, name: 'Event 2', date: '05.06.57', location: 'Wien' },
        { id: 3, name: 'Event 3', date: '07.01.74', location: 'Graz' },
      ];

      // Store the events in the cache
      client.set('events', JSON.stringify(events));

      // Send the events as a JSON response
      res.json(events);
    }
  });
});

app.post('/events', (req, res) => {
  const event = req.body;
  // Generate a unique ID for the event
  event.id = Date.now();

  // Store the event in the cache
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
