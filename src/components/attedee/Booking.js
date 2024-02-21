import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { saveBooking, resetBookings } from '../bookingsSlice';

function Booking() {
    
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.bookings);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const storedEvent = JSON.parse(localStorage.getItem('registeredFor'));
    // setEvent(storedEvent);
    console.log(storedEvent);
    if (storedEvent) {
      setEvent({
          ...storedEvent,
      });
  }

  }, []);

  const { eventId } = useParams();
  const [noOfTickets, setNoOfTickets] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!event) {
      console.log('Event not found');
      return;
    }

    const booking = {
      eventId: parseInt(event.eventId), 
      eventName: event.eventName, 
      bookingDate: new Date().toISOString(),
      noOfTickets,
      totalPrice: noOfTickets * event.ticketPrice,
    };

    
    await dispatch(saveBooking(booking));

    
    if (status === 'succeeded') {
      console.log('Booking added successfully:', error); 
      
      dispatch(resetBookings());
    } else {
      console.log('Error adding booking:', error);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Booking</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="eventName" className="form-label">Event Name:</label>
          <input type="text" id="eventName" className="form-control" value={event.eventName} readOnly />
        </div>
        <div className="mb-3">
          <label htmlFor="bookingDate" className="form-label">Booking Date:</label>
          <input type="date" id="bookingDate" className="form-control" value={new Date().toISOString().slice(0, 10)} readOnly />
        </div>
        <div className="mb-3">
          <label htmlFor="noOfTickets" className="form-label">Number of Tickets:</label>
          <input
            type="number"
            id="noOfTickets"
            className="form-control"
            min="1"
            value={noOfTickets}
            onChange={(e) => setNoOfTickets(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="totalPrice" className="form-label">Total Cost:</label>
          <input type="text" id="totalPrice" className="form-control" value={noOfTickets * event.ticketPrice} readOnly />
        </div>
        <button type="submit" className="btn btn-primary">Confirm Booking</button>
      </form>
    </div>
  );
}

export default Booking;