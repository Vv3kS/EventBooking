import React from "react";
import { UseSelector, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Route , Routes } from "react-router-dom";
import ViewAllEvents from "./viewallevents";
import BookingInfo from "./viewBooking";

const NavA =() =>{
    const myState = useSelector(state => state.logged)
    return (
        <div>
            <ul className='nav navbar' style={{ backgroundColor: "black" }}>
                <li className='nav-item'><Link to='/profile' className='nav-link' id='link'>{myState.username}</Link></li>
                <li className='nav-item'><Link to='/viewallevents' className='nav-link' id='link' style={{ fontSize: "small" }}>View All Events</Link></li>
                <li className='nav-item'><Link to='/viewBooking/:attendeeId' className='nav-link' id='link' style={{ fontSize: "small" }}>view Bookings</Link></li>
                <li className='nav-item'><Link to='/edit' className='nav-link' id='link' style={{ fontSize: "small" }}>Edit Profile</Link></li>
                <li className='nav-item'><Link to='/logout' className='nav-link' id='link'>logout</Link></li>
            </ul>

            <div className="container-fluid">
                <Routes>
                    <Route path='/viewallevents' element={<ViewAllEvents />} />
                    <Route path='/viewBooking/:attendeeId' element={<BookingInfo/>} />
                </Routes>
            </div>
        </div>


    )

}
export default NavA ;