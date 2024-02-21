import { configureStore } from "@reduxjs/toolkit";
import loggedReducer from "./isLoggedSlice";

export default configureStore({
        reducer:{
            logged: loggedReducer
        }
});