import React from 'react';

const EventList = ({ events, onSelect }) => {
  return (
    <div>
      <h2>Event List</h2>
      {events.map((event) => (
        <div key={event.id}>
          <h3>{event.name}</h3>
          <button onClick={() => onSelect(event)}>Select</button>
        </div>
      ))}
    </div>
  );
};

export default EventList;
