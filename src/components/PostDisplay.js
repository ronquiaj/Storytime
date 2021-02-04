import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PostDisplay(props) {
  const { classes, photoURL, username, text, handleVote, votes } = props;
  return (
    <Row className={classes.container}>
      <Col>
        <div className={classes.user}>
          <img alt='user profile pic' className={classes.image} src={photoURL} />
          <Link to={`/users/${username}`}>
            <h4 style={{ fontSize: "0.7rem" }}>{username}</h4>
          </Link>
        </div>
      </Col>
      <Col>
        <h4 className={classes.text}>{text}</h4>
      </Col>
      <Col>
        <div className={classes.arrowContainer}>
          <i
            onClick={() => handleVote(1)}
            className={`fas fa-arrow-up ${classes.arrow} ${classes.arrowUp}`}></i>
          {votes}
          <i
            onClick={() => handleVote(-1)}
            className={`fas fa-arrow-down ${classes.arrow} ${classes.arrowDown}`}></i>
        </div>
      </Col>
    </Row>
  );
}
