const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(':memory:'); // In-memory SQLite database for demo purposes

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date TEXT, location TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS guests (id INTEGER PRIMARY KEY AUTOINCREMENT, event_id INTEGER, name TEXT)');
});


class Event {
  constructor(name, date, location) {
    this.name = name;
    this.date = date;
    this.location = location;
  }

  static getAll(callback) {
    db.all('SELECT * FROM events', (err, rows) => {
      if (err) {
        console.error(err);
        callback([]);
      } else {
        callback(rows);
      }
    });
  }

  static getById(eventId, callback) {
    db.get('SELECT * FROM events WHERE id = ?', [eventId], (err, row) => {
      if (err) {
        console.error(err);
        callback(null);
      } else {
        callback(row);
      }
    });
  }

  save(callback) {
    const self = this; 
    db.run('INSERT INTO events (name, date, location) VALUES (?, ?, ?)', [this.name, this.date, this.location], function (err) {
      if (err) {
        console.error(err);
        callback({ success: false, message: 'Failed to save the event.' });
      } else {
        const eventId = this.lastID;
        callback({ success: true, eventId });

        // Save guests associated with the event
        self.saveGuests(eventId, callback);
      }
    });
  }

  saveGuests(eventId, callback) {
    const guests = this.guests || [];
    guests.forEach((guest) => {
      db.run('INSERT INTO guests (event_id, name,) VALUES (?, ?)', [eventId, guest.name], (err) => {
        if (err) {
          console.error(err);
          callback({ success: false, message: 'Failed to save guests for the event.' });
        }
      });
    });
  }
}

module.exports = Event;
