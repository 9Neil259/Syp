import React from 'react';

const EventList = ({ events, onSelect, onDeleteEvent }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">Event List</h2>
      {events.map((event) => (
        <div key={event.id} className="bg-white rounded-md p-4 mb-4">
          <h3 className="text-lg font-semibold">{event.name}</h3>
          <button
            onClick={() => onSelect(event)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Select
          </button>
          <button
            onClick={() => onDeleteEvent(event.id)}
            className="px-4 py-2 bg-red text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default EventList;
