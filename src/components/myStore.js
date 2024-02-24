


import { configureStore } from "@reduxjs/toolkit";
import loggedReducer from "./isLoggedSlice";
import eventDetail from "./eventsSlice";
import { addBooking } from "./bookingsSlice";

const store = configureStore({
  reducer: {
    logged: loggedReducer,
    events: eventDetail,
    bookings : addBooking,

  },
});

export default store;




