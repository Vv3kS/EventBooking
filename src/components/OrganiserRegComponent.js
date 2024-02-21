import { useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function OrganiserRegComp() {
  let navigate = useNavigate();
  // const [info , setInfo] = useState("");
  


  const init = {
    fname: { value: "", error: "", touched: false, valid: false },
    lname: { value: "", error: "", touched: false, valid: false },
    //role: { value: "", error: "", touched: false, valid: false },
    email: { value: "", error: "", touched: false, valid: false },
    contact: { value: "", error: "", touched: false, valid: false },
    address: { value: "", error: "", touched: false, valid: false },
    username: { value: "", error: "", touched: false, valid: false },
    password: { value: "", error: "", touched: false, valid: false },
    repassword: { value: "", error: "", touched: false, valid: false },
    aadhar: { value: "", error: "", touched: false, valid: false },

    formValid: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        const { key, val, touched, valid, error, formValid } = action.data;
        return { ...state, [key]: { value: val, error, touched, valid }, formValid };
      case "reset":
        return init;
      default:
        break;
    }
  };

  const [organiser, dispatch] = useReducer(reducer, init);

  const validate1 = (key,val)=>{
    let valid = true;
    let error = "";
    switch(key){
        case 'fname':
            var pattern = /^[A-Z]{1}[a-z]+/;
            if(!pattern.test(val)){
                valid = false;
                error = "First Name not valid!!!"
            }
            break;               
        case 'lname':
            pattern = /^[A-Z]{1}[a-z]+/;
            if(!pattern.test(val)){
                valid = false;
                error = "Last Name not valid!!!"
            }
            break;          
        case 'username':
            pattern = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
            if(!pattern.test(val)){
                valid = false;
                error = "username not valid!!!"
            }
            break;
        case 'email':
            pattern = /^[\w.]{4,}@[a-z]{4,}\.[a-z]{2,}/;
            if(!pattern.test(val)){
                valid = false;
                error = "email not valid!!!"
            }
            break;            
        case 'contact':
            pattern = /^[0-9]{10}$/;
            if(!pattern.test(val)){
                valid = false;
                error = "Contact not valid!!!"
            }
            break;
      
        case 'password':
            let weakPass = /^[a-zA-z]+$/;
            let avgPass = /(?=.[0-9!@#$%^&*]{1})[a-zA-z]+$/
            let strongPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{4,15}$/;
    
            if(!strongPass.test(val)){
                if(!avgPass.test(val)){
                    if(val === ""){
                        valid = false;
                        error = "Plz Enter PassWord!!!"
                    }else if(!weakPass.test(val)){
                        valid = false;
                        error = "Average PassWord!!!"
                    }else{
                        valid = false;
                        error = "Weak PassWord!!!"
                        
                    }
                }
            }else{
                error = "Strong PassWord!!!";
            }
            break;
        case 'repassword':
            {
            if(val !== organiser.password.value){
                valid = false;
                error = "Both Password Dont Match. Re-Enter Pass!!!";    
            }
            break;
        }
        case 'aadhar':
          pattern = /^[0-9]{12}$/;
          if (!pattern.test(val)) {
              valid = false;
              error = "Aadhar not valid!!!";
          }
          break;
      
      
        default:
            break;
    }
    return {valid: valid,error: error};
}

const handleChange = (key, val) => {
  setMsg("");
  const { valid, error } = validate1(key, val);
  let formValid = true;

  for (let v in organiser) {
      if (v !== "formValid" && organiser[v].valid === false) {
          formValid = false;
          break;
      }
  }

  dispatch({ type: "update", data: { key, val, touched: true, valid, error, formValid } });
};

  const [msg, setMsg] = useState("");

  const checkEmail = (val) => {
  };

  const submitData = (e) => {
    e.preventDefault();
    const reqOption = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body : JSON.stringify({
        login:
                {
                    username: organiser.username.value,
                    role_id:3,
                    password:organiser.password.value,
                    flag:false
                },
                organiser: 
                {
                  first_name : organiser.fname.value,
                  last_name : organiser.lname.value,
                  email : organiser.email.value,
                  contact:organiser.contact.value,
                  dob : date,
                  gender:gender,
                  username : organiser.username.value,
                  password : organiser.password.value,
                  aadharno: organiser.aadhar.value,
                  
                }
    })
    };

    alert(reqOption.body);

    fetch("http://localhost:8080/organiser", reqOption)
      .then((res) => res.json())
      .then((msg) => {
        
        console.log("Data Inserted Successfully!!!");
        navigate("/login");
      })// }).catch(error => {
      //   console.error("Error fecting data" , error);
      //   setInfo("Page Not Found");
        
      // })

    
  };

  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");

  return (
    <div>
      <div className="container-fluid custom-bg" style={{ height: "40vh" }}>
        <h1 style={{ fontFamily: "Antic Didone", color: "black", backgroundColor: "white" }}>ORGANISER REGISTRATION</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-4 mt-5">
          <form>
          <label className="form-label" for="fname">Enter First Name</label>
          <input type="text" className="form-control" id="fname" name="fname" value={organiser.fname.val} onChange={(e)=>{handleChange("fname",e.target.value)}} onBlur={(e)=>{handleChange("fname",e.target.value)}}/><br/>
          <div style={{display: (!organiser.fname.valid && organiser.fname.touched)?"block":"none"}}><p className="text-danger">{organiser.fname.error}</p></div>


          
          <label className="form-label" for="lname">Enter Last Name</label>
          <input type="text" className="form-control" id="lname" name="lname" value={organiser.fname.val} onChange={(e)=>{handleChange("lname",e.target.value)}} onBlur={(e)=>{handleChange("lname",e.target.value)}}/><br/>
          <div style={{display: (!organiser.lname.valid && organiser.lname.touched)?"block":"none"}}><p className="text-danger">{organiser.lname.error}</p></div>
          
          <label className="form-label" htmlFor="role">
          Select Your Role
      </label>
          <label className="form-label" for="email">Enter Your Email</label>
          <input type="email" className="form-control" id="email" name="email" onChange={(e)=>{handleChange("email",e.target.value)}} onBlur={(e)=>{handleChange("email",e.target.value); checkEmail(e.target.value)}}/><br/>
          <div style={{display: (!organiser.email.valid && organiser.email.touched)?"block":"none"}}><p className="text-danger">{organiser.email.error}</p></div>
          <div style={{display: (true)?"block":"none"}}><p className="text-danger">{msg}</p></div>

          <label className="form-label" for="contact">Enter Contact Number</label>
          <input type="text" className="form-control" id="contact" name="contact" value={organiser.contact.val} onChange={(e)=>{handleChange("contact",e.target.value)}} onBlur={(e)=>{handleChange("contact",e.target.value)}}/><br/>
          <div style={{display: (!organiser.contact.valid && organiser.contact.touched)?"block":"none"}}><p className="text-danger">{organiser.contact.error}</p></div>

          <label className="form-label" for="add">Enter Date of Birth</label>
          <input type="date" className="form-control" id="dob" name="dob" onChange={(e)=>{setDate(e.target.value)}}/><br/>
          <label className="form-check">Select Your Gender</label>
          <input type="radio" name="gen" value={"m"} className="form-check-input" onChange={(e)=>{setGender(e.target.value)}} />Male  &nbsp;
          <input type="radio" name="gen" value={"f"} className="form-check-input" onChange={(e)=>{setGender(e.target.value)}}/>Female  &nbsp;
          <input type="radio" name="gen" value={"o"} className="form-check-input" onChange={(e)=>{setGender(e.target.value)}}/>Other <br/><br/>

          <label className="form-label" for="uname">Enter Username</label>
          <input type="text" className="form-control" id="uname" name="username" value={organiser.username.val} onChange={(e)=>{handleChange("username",e.target.value)}} onBlur={(e)=>{handleChange("username",e.target.value)}}/><br/>
          <div style={{display: (!organiser.username.valid && organiser.username.touched)?"block":"none"}}><p className="text-danger">{organiser.username.error}</p></div>

          <label className="form-label" for="pass">Enter Your Password</label>
          <input type="password" className="form-control" id="pass" name="pass" onChange={(e)=>{handleChange("password",e.target.value)}} onBlur={(e)=>{handleChange("password",e.target.value)}}/><br/>
          <div style={{display: (!organiser.password.valid && organiser.password.touched)?"block":"none"}}><p className="text-danger">{organiser.password.error}</p></div>
          <p className="text-success" style={{display:(organiser.password.valid)?"block":"none"}}>{organiser.password.error}</p>

          <label className="form-label" for="rpass">Re-Enter Your Password</label>
          <input type="password" className="form-control" id="rpass" onChange={(e)=>{handleChange("repassword",e.target.value)}} onBlur={(e)=>{handleChange("repassword",e.target.value)}}/><br/>
          <div style={{display: (!organiser.repassword.valid && organiser.repassword.touched)?"block":"none"}}><p className="text-danger">{organiser.repassword.error}</p></div>

          <label className="form-label" for="aadhar">Enter Aadhar Number</label>
<input type="text" className="form-control" id="aadhar" name="aadhar" value={organiser.aadhar.value} onChange={(e) => { handleChange("aadhar", e.target.value) }} onBlur={(e) => { handleChange("aadhar", e.target.value) }} /><br/>
<div style={{ display: (!organiser.aadhar.valid && organiser.aadhar.touched) ? "block" : "none" }}><p className="text-danger">{organiser.aadhar.error}</p></div>



          <p style={{float:"right"}}>already have an account? <Link to='/login'>login</Link></p><br/>
            <input
              type="button"
              value="Register"
              className="btn btn-primary"
              onClick={(e) => {
                submitData(e);
              }}
              disabled={organiser.formValid}
            />
            <input type="reset" value="Reset" className="btn btn-danger" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrganiserRegComp;
 