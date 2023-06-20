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
    <form onSubmit={handleSubmit} className="mt-4">
    <input
      type="text"
      placeholder="Event Name"
      value={name}
      onChange={e => setName(e.target.value)}
      className="border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:border-blue-500"
    />
    <input
      type="date"
      placeholder="Event Date"
      value={date}
      onChange={e => setDate(e.target.value)}
      className="border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:border-blue-500"
    />
    <input
      type="text"
      placeholder="Event Location"
      value={location}
      onChange={e => setLocation(e.target.value)}
      className="border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:border-blue-500"
    />
    <button
      type="submit"
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Create Event
    </button>
  </form>
  
  );
};

export default EventForm;
