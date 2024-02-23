import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../isLoggedSlice";
import { useState } from "react";

export const LoginComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [msg1, setMsg1] = useState("");
  const [msg2, setMsg2] = useState("");
  const [username, setUname] = useState("");
  const [password, setPwd] = useState("");

  const handleClick = () => {
    if (!username.trim() || !password.trim()) {
      setMsg1("Please fill in both username and password.");
      return;
    }

    fetch("http://localhost:8080/login?username=" + username + "&password=" + password)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        return resp.json();
      })
      .then((data) => {
        localStorage.setItem("loggedOrganiser", JSON.stringify(data));
        console.log(JSON.stringify(data));

        if (data != null) {
          let str = data.password;

          if (str === password) {
            dispatch(login());
            localStorage.setItem("data", JSON.stringify(data));
            console.log("this is data " + JSON.stringify(data));

            if (data.role_id === 1) navigate("/admin");
            else if (data.role_id === 2) navigate("/attendee");
            else if (data.role_id === 3) navigate("/organizer");
          } else {
            setMsg2("Wrong password!");
          }
        } else {
          setMsg1("Username not found!");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setMsg2("Wrong username or password. Please try again.");
      });
  };

  return (
    <div>
      <div className="container-fluid custom-bg" style={{ height: "40vh" }}>
        <h1 style={{ fontFamily: "Antic Didone" }}>LOGIN</h1>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-4 mt-5">
          <form>
            <div className="row">
              <div className="col-md-12 form-group">
                <label htmlFor="name">UserName</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  onChange={(e) => {
                    setUname(e.target.value);
                    setMsg1("");
                  }}
                  required
                />
                <div className="text-danger">{msg1}</div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-12 form-group">
                <label htmlFor="pwd">Password</label>
                <input
                  type="password"
                  id="pwd"
                  className="form-control"
                  onChange={(e) => {
                    setPwd(e.target.value);
                    setMsg2(""); 
                  }}
                  required
                />
                <div className="text-danger">{msg2}</div>
              </div>
            </div>
            <p style={{ float: "right" }}>
              don't have an account? <Link to="/">register</Link>
            </p>
            <div className="row">
              <div className="col-md-5 form-group">
                <input
                  type="button"
                  value="Login"
                  className="btn btn-primary"
                  onClick={handleClick}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
