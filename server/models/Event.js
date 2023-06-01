const redis = require('redis');
const client = redis.createClient();

class Event {
  constructor(id, name, date, location) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.location = location;
  }

  static getAll(callback) {
    client.hgetall('events', (err, events) => {
      if (err) throw err;
      callback(events);
    });
  }

  static getById(id, callback) {
    client.hget('events', id, (err, event) => {
      if (err) throw err;
      callback(event);
    });
  }

  save(callback) {
    client.hset('events', this.id, JSON.stringify(this), (err, result) => {
      if (err) throw err;
      callback(result);
    });
  }
}

module.exports = Event;
