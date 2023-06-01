import React from 'react';

const EventDetails = ({ event }) => {
  if (!event) {
    return <div>No event selected</div>;
  }

  return (
    <div>
      <h2>{event.name}</h2>
      <p>Date: {event.date}</p>
      <p>Location: {event.location}</p>
    </div>
  );
};

export default EventDetails;
