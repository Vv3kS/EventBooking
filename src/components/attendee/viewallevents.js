import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from './eventSlice';
import { useNavigate } from 'react-router-dom';
import BookingForm from './Booking';
import NavA from './NavbarAttendee';

const ViewAllEvents = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  const navigate = useNavigate();

  const handleRegister = (event1) => {
    localStorage.setItem('registeredFor', JSON.stringify({ event1 }));
    const selectedEvent = events.find((e) => e.eventId === event1.id);
    if (event1) {
      setSelectedEvent(selectedEvent);
      setIsBookingOpen(true);
      navigate(`/Booking/${event1}`, { state: {eventName: event1.eventName , eventId :event1.eventId} });
      console.log('You are registering for the following event:', event1.eventName, 'Event Id :', event1.eventId);
    }  else {
      console.log('Event not found:', event1.eventId);
    }
  };

  const handleBookingClose = () => {
    setIsBookingOpen(false);
  };

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <>
      <NavA/>
      <div>
        <table className="table table-striped table-bordered text-center" style={eventsStyles}>
          <thead>
            <tr style={eventsThTdStyles}>
              <th>Event Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>Venue</th>
              <th>Available Tickets</th>
              <th>Ticket Price</th>
              <th>Register</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.eventId}>
                <td>{event.eventName}</td>
                <td>{event.description}</td>
                <td>{event.startDate}</td>
                <td>{event.venue}</td>
                <td>{event.availableTickets}</td>
                <td>{event.ticketPrice}</td>
                <td>
                  <button onClick={() => handleRegister(event.eventId)}>
                    Register
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div>
      {content}
      {isBookingOpen && (
        <BookingForm
          event={selectedEvent}
          onClose={handleBookingClose}
          eventName={selectedEvent ? selectedEvent.eventName : ''}
        />
      )}
    </div>
  );
};

const eventsStyles = {
  borderCollapse: 'collapse',
  border: '2px solid #ccc',
};

const eventsThTdStyles = {
  border: '1px solid #ccc',
  padding: '10px',
};

export default ViewAllEvents;
