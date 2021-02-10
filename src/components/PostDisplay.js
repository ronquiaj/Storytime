import React from "react";
import { Link } from "react-router-dom";

export default function PostDisplay(props) {
  const { classes, photoURL, username, text, handleVote, votes } = props;
  return (
    <div className={classes.container}>
      <div className={classes.user}>
        <img alt='user profile pic' className={classes.image} src={photoURL} />
        <Link to={`/users/${username}`}>
          <h4 className={classes.username} style={{ fontSize: "0.7rem" }}>
            {username}
          </h4>
        </Link>
      </div>
      <h4 className={classes.text}>{text}</h4>
      <div className={classes.arrowContainer}>
        <i
          onClick={() => handleVote(1)}
          className={`fas fa-arrow-up ${classes.arrow} ${classes.arrowUp}`}></i>
        {votes}
        <i
          onClick={() => handleVote(-1)}
          className={`fas fa-arrow-down ${classes.arrow} ${classes.arrowDown}`}></i>
      </div>
    </div>
  );
}
