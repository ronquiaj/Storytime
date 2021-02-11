import React from "react";
import "../styles/landingStyles.css";
import { useHistory } from "react-router-dom";

export default function Landing() {
  const history = useHistory();
  setTimeout(() => history.push("/"), 5400);
  return (
    <div className='animation-container'>
      <img
        alt='logo'
        src='https://firebasestorage.googleapis.com/v0/b/storytime-7f96d.appspot.com/o/pencil.png?alt=media&token=bd23d568-710d-4a18-aef6-3d433c923d88'
        className='animation-pencil'
      />
      <img
        alt='pencil'
        src='https://firebasestorage.googleapis.com/v0/b/storytime-7f96d.appspot.com/o/storytime.png?alt=media&token=ad8e8090-4ac8-4967-9b43-be1e96a417f9'
        className='animation-logo'
      />
    </div>
  );
}
