import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from '../Navbar';

const ViewEvent = () => {
  const [events, setEvents] = useState([]);
  const [organiserId, setOrganiserId] = useState(null);

  useEffect(() => {
    const organiser = localStorage.getItem("loggedOrganiser");
    const org = JSON.parse(organiser);
    const id = org.organiser_id;
    setOrganiserId(id);

    fetchEvents(id);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async (organiserId) => {
    try {
      const response = await fetch(`http://localhost:8080/eventsbyorganiser/${organiserId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${data.message}`);
      }

      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error.message);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:8080/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      
      fetchEvents(organiserId);
    } catch (error) {
      console.error('Error deleting event:', error.message);
    }
  };

  return (
    <>
    <Nav />
    <div className="container mt-5">
      <h2>View Events</h2>
      <ul className="list-group">
        {events.map((event) => (
          <li key={event.eventId} className="list-group-item">
            <div>
              <p>Event Name: {event.eventName}</p>
              <p>Description: {event.description}</p>
              <p>Start Date: {event.startDate}</p>
              <p>Venue: {event.venue}</p>
              <p>Available Ticket: {event.availableTickets}</p>
              <p>Ticket Price: {event.ticketPrice}</p>
              <button
                onClick={() => handleDelete(event.eventId)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default ViewEvent;