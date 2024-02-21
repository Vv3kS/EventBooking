import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {login} from "../isLoggedSlice";
import { useState , useEffect } from "react";

export const LoginComp = () =>{
    const dispatch = useDispatch();
    const myState = useSelector((state)=> state.logged);
    const navigate = useNavigate();
    const [info , setInfo] = useState("");

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedOrganiser"));
        if (loggedUser) {
          if (loggedUser.role_id === 1) navigate('/admin');
          else if (loggedUser.role_id === 2) navigate('/attendee');
          else if (loggedUser.role_id === 3) navigate('/organizer');
        }
      }, [navigate]);

    const handleClick=()=>{
        fetch("http://localhost:8080/login?username="+username+"&password="+password)
        .then(resp => resp.json())
        .then(data=>{
            localStorage.setItem("loggedOrganiser" , JSON.stringify(data));
            console.log(JSON.stringify(data))
            console.log(data);
            console.log(password);
            if(data!=null)
            {
            let str= data.password
                if(str===password)
                {
                dispatch(login());
                localStorage.setItem("data",JSON.stringify(data));
                console.log("this is data "+JSON.stringify(data));
                if(data.role_id===1)
                navigate('/admin');
                else if(data.role_id===2)
                navigate('/attendee')
            else if(data.role_id===3)
            navigate('/organizer')
                }
                else{
                    setMsg2("Wrong password!");
                }
            }
            else{

            }
            
        })
    }

    const[msg1, setMsg1]=useState("");
    const[msg2, setMsg2]=useState("");
    const[username,setUname]=useState("");
    const[password,setPwd]=useState("");
    const[flag,setFlag]=useState(true);

    const getUserName=()=>{
            fetch("http://localhost:8080/login?username="+username+"&password="+password)
            .then(resp => {
                 console.log(resp.status)
                 return resp.json();
            })

           .then(data=>{
                console.log("hello");
                console.log(data)
                if(data.length===0)
                {
                    setMsg1("Username not found!");
                    setFlag(true);
                }
                else{
                    setMsg1("");
                    setFlag(false);
                }
            })
            .catch(error => {
                console.error("Error fecting data" , error);
                setInfo("Page Not Found");
                
              })
        
        
        };
    return(
        <div>
            <div className="container-fluid custom-bg" style={{ height: "40vh"}}>
            <h1 style={{fontFamily:"Antic Didone"}}>LOGIN</h1>
            </div>

            <div className="row justify-content-center">
            <div className="col-md-4 mt-5">
                <form >
                    <div className="row">
                        <div className="col-md-12 form-group">
                        <label for="name">UserName</label>
                        <input type="text" id="name" className="form-control" onChange={(e)=>{setUname(e.target.value)}} onBlur={getUserName}/>
                        <div className="text-danger">{msg1}</div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-12 form-group">
                        <label for="pwd">Password</label>
                        <input type="password" id="pwd" className="form-control" onChange={(e)=>{setPwd(e.target.value)}}/>
                        <div className="text-danger">{msg2}</div>
                        </div>
                    </div>
                    <p style={{float:"right"}}>don't have an account? <Link to='/'>register</Link></p>
                    <div className="row">
                        <div className="col-md-5 form-group">
                        <input type="button" value="Login" className="btn btn-primary" onClick={handleClick}/>
                        </div>
                    </div>
                </form>
          </div>
        </div>
        </div>
    )
}