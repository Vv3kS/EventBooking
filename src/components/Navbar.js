import { React } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


const Nav = () => {
    const myState = useSelector(state => state.logged)
    return (
        
        <div style={{display: myState.loggedIn?"block":""}}>
        <ul className='nav navbar' style={{backgroundColor:"black"}}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li className="nav-item">
        <Link to='/event' className='nav-link' id='link' style={{fontSize:"small"}}>View Events</Link> 
        </li>
        <li className="nav-item">
        <Link to='/addevent' className='nav-link' id='link' style={{fontSize:"small"}}>Add Events</Link>
        </li>
        <li className="nav-item">
        <Link to='/edit' className='nav-link' id='link' style={{fontSize:"small"}}>Update Profile</Link>
        </li>
        <li className='nav-item'>
            <Link to='/logout' className='nav-link' id='link'>logout</Link>
        </li>
    </ul></div>
    );
  };
  
export default Nav;
  