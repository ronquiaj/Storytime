import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MiniStory(props) {
  const { title, classes, text, emoji, dateCreated } = props;
  return (
    <div key={title}>
      <Card className={classes.storyCard}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text.length < 165 ? text : `${text.slice(0, 165)}...`}</Card.Text>
          <div className={classes.submit}>
            <div className={classes.visit}>
              <Button variant='primary' className={classes.button}>
                <Link
                  className={classes.titleLink}
                  to={dateCreated ? `archive/${title}` : `/stories/${title}`}>
                  Visit this story
                </Link>
              </Button>
            </div>
            <div className={classes.emoji}>{emoji}</div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
