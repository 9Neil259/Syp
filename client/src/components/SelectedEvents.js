import React from 'react';

function SelectedEvents({ selectedEvents }) {
  return (
    <div>
      <h2>Selected Events</h2>
      {selectedEvents.map((event) => (
        <div key={event.id}>{event.name}</div>
      ))}
    </div>
  );
}

export default SelectedEvents;
