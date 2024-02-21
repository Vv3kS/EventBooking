import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
export const AdminHomeComp=()=>{
    const myState = useSelector(state => state.logged)
    return(
        <div>
            <ul className='nav navbar' style={{backgroundColor:"black"}}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li className="nav-item">
                <Link to='/revoke' className='nav-link' id='link' style={{fontSize:"small"}}>Revoke Attendee And Organiser</Link>
                </li>
                <li className="nav-item">
                <Link to='/viewEvent' className='nav-link' id='link' style={{fontSize:"small"}}>View Booking Event </Link>
                </li>
                <li className="nav-item">
                <Link to='/edit' className='nav-link' id='link' style={{fontSize:"small"}}>View Payment Of All </Link>
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
