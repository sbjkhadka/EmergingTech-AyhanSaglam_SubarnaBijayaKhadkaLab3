import React, { useState, useEffect } from "react";
import axios from "axios";
import View from './View';

function Login() {
  const [screen, setScreen] = useState("auth");
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();

const [student, setStudent] = useState({
  email: "",
  password: "",
});
  const apiUrl = "http://localhost:3000/signin/";

   const onChange = (e) => {
     console.log(e.target.value);
     e.persist();
     setStudent({ ...student, [e.target.name]: e.target.value });
   };


const loginStudent = (e) => {
  console.log("sending_login");
  e.preventDefault();
  const data = {
    email: student.email,
    password: student.password,
  };
  console.log('sending', data);
  axios
    .post(apiUrl, data)
    .then((res) => {
      if (res.data.screen !== undefined) {
        console.log(res);
        localStorage.setItem("authKey", res.data.token);
        localStorage.setItem("loggedIn", res.data.studentId);
        localStorage.setItem("loggedInName", res.data.firstName + ' ' + res.data.lastName);
        setScreen(res.data.screen);
        localStorage.setItem("screen", res.data.screen);
      }
    })
    .catch((error) => {
      console.log('login: false')
    });
};


  const readCookie = async () => {
    try {
      console.log("--- in readCookie function ---");
      axios
        .post("http://localhost:5000/read_cookie", {
          authKey: localStorage.getItem("authKey"),
        })
        .then((res) => {
          if (res.data.screen !== undefined) {
            setScreen(res.data.screen);
            console.log(res.data.screen);
          }
        });
    } catch (e) {
      setScreen("auth");
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []); //only the first render

  return (
    <div className="d-flex justify-content-around">
      {screen === "auth" ? (
        <div className="border border-primary p-3 mt-3 w-25">
          <h1>Login</h1>
          <label>Email: </label>
          <br />
          <input
            className="form-control"
            name="email"
            type="text"
            onChange={onChange}
          />
          <br />
          <label>Password: </label>
          <br />
          <input
            className="form-control"
            name="password"
            type="password"
            onChange={onChange}
          />
          <br />
          <button className="form-control btn btn-primary" onClick={loginStudent}>
            Login
          </button>
        </div>
      ) : (
        <View screen={screen} setScreen={setScreen} />
      )}
    </div>
  );
}

export default Login;