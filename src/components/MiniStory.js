import React from 'react';
import { Card, Button, Col } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';

export default function MiniStory(props) {
    const { title, classes, text } = props;
    return (
        <Col key={title}>
              <Card className={classes.storyCard}>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                  {text.length < 165 ? text : `${text.slice(0, 165)}...`}
                </Card.Text>
                <Button variant="primary"><Link className={classes.titleLink} to={`/stories/${title}`}>Visit this story</Link></Button>
              </Card.Body>
              </Card>
          </Col>
    )
}
