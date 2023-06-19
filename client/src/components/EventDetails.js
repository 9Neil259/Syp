import React from 'react';

const EventDetails = ({ event }) => {
  if (!event) {
    return null;
  }

  return (
    <div>
      <h2>Event Details</h2>
      <h3>{event.name}</h3>
      <p>Date: {event.date}</p>
      <p>Location: {event.location}</p>
    </div>
  );
};

export default EventDetails;
