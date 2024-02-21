import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
export const AttendeeHome=()=>{
    const myState = useSelector(state => state.logged)
    return(
        <div>
            <ul className='nav navbar' style={{backgroundColor:"black"}}>
                <li className='nav-item'>
                    <Link to='/profile' className='nav-link' id='link'>profile</Link>
                </li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li className="nav-item">
                <Link to='/event' className='nav-link' id='link' style={{fontSize:"small"}}>View All Events</Link> 
                </li>
                <li className="nav-item">
                <Link to='/booking' className='nav-link' id='link' style={{fontSize:"small"}}>Register Event</Link>
                </li>
                <li className="nav-item">
                <Link to='/edit' className='nav-link' id='link' style={{fontSize:"small"}}>Edit Profile</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/logout' className='nav-link' id='link'>logout</Link>
                </li>
            </ul>

            <div className="container-fluid">

                
                
                <div className="ArtworkForSale" style={{ left: 535, top: 1057, position: 'absolute', color: 'black', fontSize: 36, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>ARTWORK FOR SALE</div>
                
            </div>
        
            
        </div>
        

        
    )
}
