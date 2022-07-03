import React from "react";
import "./topbar.css";
import { useHistory } from "react-router-dom";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import logoImage from '../../assets/LOGO-User-navBar.svg'

export default function Topbar() {
  const user =JSON.parse(localStorage.getItem('user'))
  console.log(user);
  const history =useHistory()
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo"> <img src={logoImage} alt="logo"/> </span>
        </div>
        <div className="topRight">
        {/* <span >{user.userName}</span> */}

          <button onClick={()=>{
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            // history.push("/");
            window.location.assign("/")
            }}>Logout</button>
        </div>
      </div>
    </div>
  );
}
