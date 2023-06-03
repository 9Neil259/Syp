import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventForm from './components/EventForm';
import EventDetails from './components/EventDetails';
import GuestList from './components/GuestList';
import EventList from './components/EventList';
import SelectedEvents from './components/SelectedEvents';

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/events');
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createEvent = async (event) => {
    try {
      const response = await axios.post('http://localhost:3001/events', event);
      console.log(response.data);
      fetchEvents();
    } catch (error) {
      console.error(error);
    }
  };

  const selectEvent = async (id) => {
    try {
      const response = await axios.get('http://localhost:3001/events/${id}');
      console.log(response.data);
      setSelectedEvent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addSelectedEvent = (event) => {
    setSelectedEvents([...selectedEvents, event]);
  };
  

  const removeSelectedEvent = (id) => {
    setSelectedEvents(selectedEvents.filter((event) => event.id !== id));
  };

  return (
    <div>
      <h1>Event Planning App</h1>
      <EventForm onCreate={createEvent} />
      <EventList events={events} onSelect={selectEvent} />
      <EventDetails event={selectedEvent} />
      <SelectedEvents
        selectedEvents={selectedEvents}
        onRemoveEvent={removeSelectedEvent}
      />
      <GuestList event={selectedEvent} />
    </div>
  );
};

export default App;
