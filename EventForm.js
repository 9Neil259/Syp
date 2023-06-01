import React, { useState } from 'react';

const EventForm = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const newEvent = { name, date, location };
    onCreate(newEvent);
    setName('');
    setDate('');
    setLocation('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Event Date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Event Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
      />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;