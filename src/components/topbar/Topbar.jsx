import React from "react";
import "./topbar.css";
import { useHistory } from "react-router-dom";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export default function Topbar() {
  const user =JSON.parse(localStorage.getItem('user'))
  console.log(user);
  const history =useHistory()
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">STRIMIX</span>
        </div>
        <div className="topRight">
        <span >{user.userName}</span>

          <button onClick={()=>{
            localStorage.removeItem('user')
            localStorage.removeItem('token')
              
            }}>Logout</button>
        </div>
      </div>
    </div>
  );
}
