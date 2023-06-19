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

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/events`);
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createEvent = async (event) => {
    try {
      const response = await axios.post(`http://localhost:3001/events`, event);
      console.log(response.data);
      fetchEvents();
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

  return (
  <div>
      <header className="bg-green">
  <div >
    <h1 >Event Planning App</h1>
    <button onClick={handleShowEvents}>
      Events
    </button>
  </div>
      <EventForm onCreate={createEvent} />
      </header>
      {showEventList && (
        <div>
          <EventList events={events} onSelect={selectEvent} onAddEvent={addSelectedEvent} />
          <p>Select an event to view details</p>
        </div>  
      )}
      {selectedEvent && (
        <div className='a'>
          <EventDetails event={selectedEvent} />
          <GuestList event={selectedEvent} />
        </div>
      )}
    </div>
  );
};

export default App;
