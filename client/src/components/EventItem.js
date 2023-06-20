import React from 'react';

function EventItem({ event, onSelect }) {
  const handleSelect = () => {
    onSelect(event);
  };

  return (
    <div className="bg-grey-light p-4 flex items-center justify-between">
    <h3 className="text-lg font-semibold">{event.name}</h3>
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={() => onSelect(event.id)}
    >
      Select Event
    </button>
  </div>
  
  );
}

export default EventItem;
