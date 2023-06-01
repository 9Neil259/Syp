import React from 'react';

const GuestList = ({ event }) => {
  if (!event) {
    return null;
  }

  return (
    <div>
      <h3>Guest List</h3>
      <ul>
        {event.guests.map(guest => (
          <li key={guest.id}>{guest.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GuestList;
