import React, { useState } from "react";
import { Card, Button, Form, Container, Row } from 'react-bootstrap'; 
import Spinner from './Spinner';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function HomeForm(props) {
    const { classes, loading, stories, handleSubmit, titleRef, changeTitleRef, textRef, changeTextRef, timeIntervalRef, changeTimeIntervalRef, roundsRef, changeRoundsRef } = props;
    const [open, setOpen] = useState(false);

    return (
      <>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpen(false)}
          fullWidth
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Add new story"}</DialogTitle>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    value={titleRef}
                    onChange={changeTitleRef}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Beginning text</Form.Label>
                  <Form.Control
                    value={textRef}
                    onChange={changeTextRef}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Time interval</Form.Label>
                  <Form.Control
                    value={timeIntervalRef}
                    onChange={changeTimeIntervalRef}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Number of rounds</Form.Label>
                  <Form.Control
                    value={roundsRef}
                    onChange={changeRoundsRef}
                    required
                  />
                </Form.Group>
                <Button








                                                                                                                                                          className="w-100"
                 
                 
                 
                 
                 
                 
                 
                 
                  type="submit"
                 
                 
                 
                 
                 
                 
                 
                 
                  onClick={() => setOpen(false)}
                
                
                
                
                
                
                
                
                >
                  Add story
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Dialog>

        <Container className={classes.container} fluid>
          <Row>{loading ? <Spinner /> : stories}</Row>
        </Container>

        <Button onClick={setOpen} className={classes.addButton}>
          Add new story
        </Button>
      </>
    );
}
