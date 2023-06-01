import React from 'react';

function EventItem({ event, onSelect }) {
  const handleSelect = () => {
    onSelect(event);
  };

  return (
    <div>
      <h3>{event.name}</h3>
      <button onClick={() => onSelect(event.id)}>Select Event</button>
    </div>
  );
}

export default EventItem;