import React from 'react';
import 'tailwindcss/tailwind.css';

const EventDetails = ({ event }) => {
  if (!event) {
    return null;
  }

  return (
    <div className="bg-grey-light rounded p-4">
    <h2 className="text-xl font-bold mb-2">Event Details</h2>
    <h3 className="text-lg font-semibold mb-2">{event.name}</h3>
    <p className="mb-1">Date: {event.date}</p>
    <p className="mb-1">Location: {event.location}</p>
  </div>  
  );
};

export default EventDetails;
