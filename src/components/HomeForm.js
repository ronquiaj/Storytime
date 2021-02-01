import React, { useState } from "react";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import Spinner from "./Spinner";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import ReactSlider from "./ReactSlider";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import Picker from 'emoji-picker-react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function HomeForm(props) {
  const {
    classes,
    loading,
    stories,
    handleSubmit,
    titleRef,
    changeTitleRef,
    textRef,
    changeTextRef,
    timeIntervalRef,
    changeTimeIntervalRef,
    roundsRef,
    changeRoundsRef,
    chosenEmoji,
    changeChosenEmoji
  } = props;
  const [open, setOpen] = useState(false);
  const [openEmoji, changeOpenEmoji] = useState(false);
  const [alertMessage, changeAlertMessage] = useState("");

  const openOpen = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  // used to ensure that title and beginning text are not empty
  const validate = () => {
    if (!textRef || !titleRef) {
      changeAlertMessage("Fill in both the title input and the text input.");
    } else {
      close();
    }
  };

  const closeEmoji = () => {
    changeOpenEmoji(false);
  }

  const triggerEmoji = () => {
    changeOpenEmoji(true);
  }

  const onEmojiClick = (event, emojiObject) => {
    changeChosenEmoji(emojiObject.emoji);
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={close}
        fullWidth
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle className={classes.dialog}>{"Add new story"}</DialogTitle>
        <Card >
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control value={titleRef} onChange={changeTitleRef} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Beginning text</Form.Label>
                <Form.Control value={textRef} onChange={changeTextRef} required />
              </Form.Group>
              <ReactSlider
                sliderVal={timeIntervalRef}
                changeSliderVal={changeTimeIntervalRef}
                sliderDescription={"Time interval (in seconds)"}
                classes={classes}
                start={30}
                min={10}
                max={300}
                step={10}
              />
              <ReactSlider
                sliderVal={roundsRef}
                changeSliderVal={changeRoundsRef}
                sliderDescription={"Number of rounds"}
                classes={classes}
                start={5}
                min={2}
                max={20}
                step={1}
              />
              <Row className={classes.formSubmit}>
                <Col>
                  <Button type='submit' onClick={validate} className={classes.submitButton}>
                    Add story
                  </Button>
                </Col>
                <Col className={classes.emoji}>
                  <div onClick={triggerEmoji}><span className={classes.emojiText}>Selected emoji: </span>{chosenEmoji}</div>
                </Col>
              </Row>
                <Collapse in={alertMessage}>
                  <Col>
                    <Alert
                      className={classes.alert}
                      severity='error'
                      action={
                        <IconButton onClick={() => changeAlertMessage("")}>
                          <CloseIcon />
                        </IconButton>
                      }>
                      {alertMessage}
                    </Alert>
                  </Col>
                </Collapse>
             
            </Form>
          </Card.Body>
        </Card>
      </Dialog>

      <Dialog
        open={openEmoji}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeEmoji}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'>

        <DialogTitle className={classes.emojiDialog}>{"Choose an emoji!"}</DialogTitle>
        <Card >
          <Card.Body>
            <Picker onEmojiClick={onEmojiClick}/>
          </Card.Body>
        </Card>
      </Dialog>

      <Container className={classes.container} fluid>
        <Row>{loading ? <Spinner /> : stories}</Row>
      </Container>
                      
      <Button onClick={openOpen} className={classes.addButton}>
        Add new story
      </Button>
    </>
  );
}
