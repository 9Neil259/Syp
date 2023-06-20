import React, { useState, useEffect } from 'react';

const GuestList = ({ event }) => {
  const [guestName, setGuestName] = useState('');
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    setGuests(event.guests || []);
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
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">Guest List for {event.name}</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={guestName}
          onChange={handleInputChange}
          className="mr-2 px-4 py-2 border border-gray-300 rounded"
          placeholder="Enter guest name"
        />
        <button
          onClick={addGuest}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Guest
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {guests.map((guest, index) => (
          <li key={index} className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 fill-current text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M2 9H0V5h2V3C2 1.346 3.346 0 5 0h2v2H5v4h2v2H5v4H3V9H2V9zm6 2H8V5h3a1 1 0 0 1 0 2H9v2h2v2zm9-3h-1V7h1V6a1 1 0 0 0-1-1H6.828l1.586-1.586A.996.996 0 1 0 7.586 2.586L4.586 5.586A.996.996 0 0 0 4 6v8a1 1 0 0 0 1 1h1v3a1 1 0 0 0 1.707.707L12 16.414l2.293 2.293A.999.999 0 0 0 16 18h3a1 1 0 0 0 .707-1.707L17.414 15l2.293-2.293A.999.999 0 0 0 20 12v-1h-2a1 1 0 0 0 0-2h2V8h-2a1 1 0 0 0 0-2zm-7 7H2V5h3V3H2C.897 3 0 3.897 0 5v10c0 1.103.897 2 2 2h10a2 2 0 0 0 2-2v-3h-2v2zm3-3v-2h2V7h-2V5h2V3h-2V1h-2v2H9V1H7v2H5V1H3v2h2v2H3v2h2v2H3v2h2v-2h2v2h2v-2h-2z"
              />
            </svg>
            <span className="text-gray-900">{guest}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuestList;
