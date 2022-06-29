import React, { useContext, useState } from "react";
import "./login.css";
import axios from 'axios'
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async(e) => {
    e.preventDefault();
    const res =await axios.post("http://localhost:3001/admin/login", { email, password });
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);
    console.log(res.data);
    if(res.data.token){
      history.push("/");
      // console.log("here");
    }
  };

  return (
    <div className="login">
      <form className="loginForm">
        <input
          type="text"
          placeholder="email"
          className="loginInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="loginButton"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
}
