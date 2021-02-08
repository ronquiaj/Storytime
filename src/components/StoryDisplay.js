import React from "react";
import "firebase/firestore";
import { Container, Form, Button } from "react-bootstrap";
import Spinner from "./Spinner";

export default function StoryDisplay(props) {
  const {
    classes,
    handleClick,
    loading,
    title,
    displayText,
    posts,
    newPost,
    changeNewPost,
    currentRound,
    totalRounds,
    secondsLeft,
    gameOver,
    emoji
  } = props;
  return (
    <Container className={classes.container}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div>
            <h1 className={classes.title}>
              {title} {emoji}
            </h1>
            <div className={classes.roundContainer}>
              {gameOver ? (
                <h1 className={classes.rounds}>Story is over</h1>
              ) : (
                <>
                  <h1 className={classes.rounds}>
                    Round: {currentRound}/{totalRounds}
                  </h1>
                  <h1 className={classes.seconds}>Seconds left: {secondsLeft}</h1>
                </>
              )}
            </div>

            <div className='box effect7'>
              <textarea disabled='yes' className={classes.text} value={displayText} />
            </div>
          </div>

          {gameOver ? (
            <h1 className={classes.archive}>
              This post will now be archived... Redirecting to the archive page...
            </h1>
          ) : (
            <div>
              <ul className={classes.postContainer}>{posts}</ul>
              <Form onSubmit={handleClick} className={classes.post}>
                <Form.Group>
                  <Form.Label>New post</Form.Label>
                  <Form.Control
                    maxLength='90'
                    value={newPost}
                    onChange={changeNewPost}
                    type='text'
                    required
                  />
                </Form.Group>
                <Button className='w-100' type='submit'>
                  Post
                </Button>
              </Form>{" "}
            </div>
          )}
        </>
      )}
    </Container>
  );
}
