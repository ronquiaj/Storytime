import React from "react";
import "../styles/landingStyles.css";
import { useHistory } from "react-router-dom";

export default function Landing() {
  const history = useHistory();
  return (
    <div className='animation-container'>
      <div className='animation-logo'></div>
      <div className='animation-pencil'>hello</div>
      <div className='animation-button'>Start making stories!</div>
    </div>
  );
}
