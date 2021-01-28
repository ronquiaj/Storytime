import React from 'react';
import 'firebase/firestore';
import { Container, Form, Button } from 'react-bootstrap';
import Spinner from './Spinner';

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
      addToStory,
      currentRound,
      totalRounds,
      secondsLeft,
    } = props;
    return (
      <Container className={classes.container}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div>
              <h1 className={classes.title}>{title}</h1>
              <h1>
                Round: {currentRound}/{totalRounds}
              </h1>
              <h1>Seconds left: {secondsLeft}</h1>
              <div className="box effect7">
                <textarea
                  disabled="yes"
                  className={classes.text}
                  value={displayText}
                />
              </div>
            </div>

            <ul className={classes.postContainer}>{posts}</ul>
            <Form onSubmit={handleClick} className={classes.post}>
              <Form.Group>
                <Form.Label>New post</Form.Label>
                <Form.Control
                  maxLength="90"
                  value={newPost}
                  onChange={changeNewPost}
                  type="text"
                  required
                />
              </Form.Group>
              <Button className="w-100" type="submit">
                Post
              </Button>
            </Form>
            <Button onClick={addToStory}>Click Me</Button>
          </>
        )}
      </Container>
    );
}
