import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { AttendeeHome } from './components/AttendeesHome';
import { Link, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoginComp } from './components/Logincomp';
import { HomeComp } from './components/HomeComp';
import { ProfileComp } from './components/ProfileComp';
import { UserHome } from './components/UserHomeComp';
import { LogoutComp } from './components/LogoutComp';
import { UpdatePassComp } from './components/UpdatePassComp';
import { OrganizerHome } from './components/OrgsniserHome';
import AttendeeRegComp from './components/AttendeeRegComponent';
import OrganiserRegComp from './components/OrganiserRegComponent';
import AddEventsComp from './components/organiser/addEventsComp';
import EditOrganiserComp from './components/organiser/editOrganiserComp';
import ViewEvent from './components/organiser/viewEvent';
import { AdminHomeComp } from './components/admin/adminHomeComp';
import Revoke from './components/admin/revoke';
import ViewEventComp from './components/admin/viewallEvent';
function App() {
  const myState = useSelector(state => state.logged);
  return (
    <div >
      
      <div style={{display: myState.loggedIn?"none":"block"}}>
      <ul className='nav navbar' style={{backgroundColor:"GrayText"}}>
          <li className='nav-item'>
            <Link to='/AttendeeRegister' className='nav-link' id='link'>Register as Attendee</Link>
          </li>
          <li className='nav-item'>
            <Link to='/OrganiserRegister' className='nav-link' id='link'>Register As Organiser</Link>
          </li>
          <li className='nav-item'>
            <Link to='/' className='nav-link' id='link'>HOME</Link>
          </li>
          <li className='nav-item'>
            <Link to='/login' className='nav-link' id='link'>login</Link>
          </li>
        </ul> 
        </div>
        <div style={{display: myState.loggedIn?"block":"none"}}>
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
        <Routes>
          <Route path='/' element={<HomeComp/>}/>
          <Route path='/login' element={<LoginComp/>}/>
          <Route path='/OrganiserRegister' element={<OrganiserRegComp/>}/>
          <Route path='/AttendeeRegister' element={<AttendeeRegComp/>}/>
          <Route path='/userhome' element={<UserHome/>}/>
          <Route path='/logout' element={<LogoutComp/>}/>
          <Route path='/profile' element={<ProfileComp/>}/>
          <Route path='/edit' element={<EditOrganiserComp/>}/>
          <Route path='/event' element={<ViewEvent/>}/>
          <Route path='/updatepass' element={<UpdatePassComp/>}/>
          <Route path='/admin' element={<AdminHomeComp/>}/>
          <Route path='/revoke' element={<Revoke/>}/>
          <Route path='/viewEvent' element={<ViewEventComp/>}/>
          <Route path='/attendee' element={<AttendeeHome/>}/>
          <Route path='/organizer' element={<OrganizerHome/>}/>
            <Route path='/addevent' element={<AddEventsComp/>}/>
          <Route/>

          <Route path='*' element={<h1>dummy info</h1>}/>
        </Routes>
    </div>
  );
}

export default App;
