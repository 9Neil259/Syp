import React, { useState, useEffect } from 'react';

const GuestList = ({ event }) => {
  const [guestName, setGuestName] = useState('');
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    setGuests([]);
  }, [event]);

  const handleInputChange = (e) => {
    setGuestName(e.target.value);
  };

  const addGuest = () => {
    if (guestName.trim() !== '') {
      setGuests([...guests, guestName]);
      setGuestName('');
    }
  };

  return (
    <div>
      <h2>Guest List for {event.name}</h2>
      <input type="text" value={guestName} onChange={handleInputChange} />
      <button onClick={addGuest}>Add Guest</button>
      <ul>
        {guests.map((guest, index) => (
          <li key={index}>{guest}</li>
        ))}
      </ul>
    </div>
  );
};

export default GuestList;
