import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';

export default function MiniStory(props) {
    const { title, classes, text, emoji, dateCreated } = props;
    console.log(text);
    return (
        <Col key={title}>
              <Card className={classes.storyCard}>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                  {text.length < 165 ? text : `${text.slice(0, 165)}...`}
                </Card.Text>
                <Row className={classes.submit}>
                  <Col className={classes.visit}><Button variant="primary"><Link className={classes.titleLink} to={dateCreated ? `archive/${title}` : `/stories/${title}`}>Visit this story</Link></Button></Col>
                  <Col className={classes.emoji}>{emoji}</Col>
                </Row>
              </Card.Body>
              </Card>
          </Col>
    )
}
