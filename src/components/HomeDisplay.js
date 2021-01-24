import React from 'react';
import { Card, Button, Form, Container, Row } from 'react-bootstrap'; 
import Spinner from './Spinner';
export default function HomeDisplay(props) {
    const { classes, loading, stories, handleSubmit, titleRef, changeTitleRef, textRef, changeTextRef, alert } = props;
    return (
        <>
        <Container className={classes.container} fluid>
      <Row>
      {loading ? 
        <Spinner/>
        :
        stories}
      </Row>
    </Container>
  
  
  <Card>
    <Card.Body>
        <h2 className="text-center mb-4">Add new story</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control value={titleRef} onChange={changeTitleRef} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Beginning text</Form.Label>
                <Form.Control value={textRef} onChange={changeTextRef} required />
            </Form.Group>
            <Button className="w-100" type="submit">Add story</Button>
        </Form>
    </Card.Body>
 </Card>
 </>
    )
}
