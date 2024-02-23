import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addEvent } from './actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from '../Navbar';

const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${(now.getMonth() + 1)}`.padStart(2, '0');
  const day = `${now.getDate()}`.padStart(2, '0');
  const hours = `${now.getHours()}`.padStart(2, '0');
  const minutes = `${now.getMinutes()}`.padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const AddEventsComp = ({ addEvent }) => {
  const [formData, setFormData] = useState({
    availableTickets: '',
    description: '',
    eventName: '',
    startDate: getCurrentDateTime(),
    ticketPrice: '',
    endDate: getCurrentDateTime(),
    location: '',
    venue: '',
    organiser: {},
    categoryId: '', // new field
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/getallcat');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'eventName') {
      const selectedCategory = categories.find((cat) => cat.catName === value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        eventName: value,
        categoryId: selectedCategory ? selectedCategory.catId : '',
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loggedOrganiser = JSON.parse(localStorage.getItem('loggedOrganiser'));
      if (!loggedOrganiser || !loggedOrganiser.organiser_id) {
        throw new Error('Organiser ID not found in localStorage');
      }

      const formDataWithFullObjects = {
        ...formData,
        organiser: loggedOrganiser,
        eventName : formData.eventName
      };

      const requestBody = {
        ...formDataWithFullObjects,
        organiser_id: loggedOrganiser.organiser_id,
        categoryId: formDataWithFullObjects.categoryId, // new field
      };

      const response = await fetch('http://localhost:8080/saveevent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      addEvent(formDataWithFullObjects);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <>
      <Nav />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="text-center mb-4">Add Event</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Available Tickets:</label>
                <input
                  type="text"
                  className="form-control"
                  name="availableTickets"
                  value={formData.availableTickets}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description:</label>
                <textarea
                  rows="4"
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Event Name:</label>
                <select
                  className="form-select"
                  name="eventName"

                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.catName} value={FormData.eventName}>
                      {category.catName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Start Date:</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  min={getCurrentDateTime()}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Ticket Price:</label>
                <input
                  type="text"
                  className="form-control"
                  name="ticketPrice"
                  value={formData.ticketPrice}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Location:</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">End Date:</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={getCurrentDateTime()}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Venue:</label>
                <input
                  type="text"
                  className="form-control"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Event
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { addEvent })(AddEventsComp);
