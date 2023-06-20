import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import 'tailwindcss/tailwind.css';
import EventForm from './components/EventForm';
import EventDetails from './components/EventDetails';
import GuestList from './components/GuestList';
import EventList from './components/EventList';

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showEventList, setShowEventList] = useState(false);
  const [formError, setFormError] = useState('');
  const [guests, setGuests] = useState([]);
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    fetchEvents();
    restoreGuestList();
  }, []);

  useEffect(() => {
    saveGuestList();
  }, [guests]);

  const deleteEvent = async (eventId) => {
    try {
      // Schicke eine DELETE-Anfrage an die API, um das Event aus der Datenbank zu löschen
      await axios.delete(`http://localhost:3001/events/${eventId}`);

      // Aktualisiere die Eventliste, um das gelöschte Event zu entfernen
      setEvents(events.filter((event) => event.id !== eventId));

      // Überprüfe, ob das gelöschte Event das ausgewählte Event war, und setze es auf null, falls ja
      if (selectedEvent && selectedEvent.id === eventId) {
        setSelectedEvent(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/events`);
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createEvent = async (event) => {
    if (!event.name || !event.date || !event.location) {
      setFormError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3001/events`, event);
      console.log(response.data);
      fetchEvents();
      setFormError('');
    } catch (error) {
      console.error(error);
    }
  };

  const selectEvent = (event) => {
    setSelectedEvent(event);
  };

  const addSelectedEvent = (event) => {
    setSelectedEvents([...selectedEvents, event]);
  };

  const removeSelectedEvent = (id) => {
    setSelectedEvents(selectedEvents.filter((event) => event.id !== id));
  };

  const handleShowEvents = () => {
    setShowEventList(true);
  };

  const handleInputChange = (e) => {
    setGuestName(e.target.value);
  };

  const addGuest = () => {
    if (guestName.trim() !== '') {
      setGuests([...guests, guestName]);
      setGuestName('');
    }
  };

  const saveGuestList = () => {
    localStorage.setItem('guests', JSON.stringify(guests));
  };

  const restoreGuestList = () => {
    const savedGuests = localStorage.getItem('guests');
    if (savedGuests) {
      setGuests(JSON.parse(savedGuests));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-green py-4 shadow">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Event Planning App</h1>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded transition-colors duration-300 hover:bg-blue-600"
            onClick={handleShowEvents}
          >
            Events
          </button>
        </div>
      </header>
      <div className="container mx-auto py-8">
        <EventForm onCreate={createEvent} />
        {formError && <p className="text-red-500">{formError}</p>}
        {showEventList && (
          <div className="mt-8">
            <EventList
              events={events}
              onSelect={selectEvent}
              onAddEvent={addSelectedEvent}
              onDeleteEvent={deleteEvent} // Hier wird die deleteEvent-Funktion verwendet
            />
            <p className="mt-4">Select an event to view details</p>
          </div>
        )}
        {selectedEvent && (
          <div className="mt-8">
            <EventDetails event={selectedEvent} />
            <div>
              <h2>Guest List for {selectedEvent.name}</h2>
              <input type="text" value={guestName} onChange={handleInputChange} />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded transition-colors duration-300 hover:bg-blue-600"
                onClick={addGuest}
              >
                Add Guest
              </button>
              <ul className="mt-4">
                {guests.map((guest, index) => (
                  <li key={index} className="py-2">
                    {guest}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
