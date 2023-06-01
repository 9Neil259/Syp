import React from 'react';
import EventItem from './EventItem';

const events = [
  { id: 1, name: 'Abend', date: '04.02.00', location: 'Graz'},
  { id: 2, name: 'Event 2', date: '05.06.57', location: 'Wien' },
  { id: 3, name: 'Event 3', date: '07.01.74', location: 'Graz' },
];

function EventList({ onSelect }) {
  return (
    <div>
      <h2>Event List</h2>
      {events.map((event) => (
        <EventItem key={event.id} event={event} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default EventList;