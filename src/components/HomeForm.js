import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import Spinner from "./Spinner";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import ReactSlider from "./ReactSlider";
import Picker from "emoji-picker-react";

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
    changeChosenEmoji,
    changeAlert,
    setOpen: setOpenAlert
  } = props;
  const [open, setOpen] = useState(false);
  const [openEmoji, changeOpenEmoji] = useState(false);

  const openOpen = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  // used to ensure that title and beginning text are not empty
  const validate = () => {
    if (!textRef || !titleRef) {
      setOpenAlert(true);
      changeAlert("Fill in both the title input and the text input.");
    } else {
      if (titleRef.length < 2) {
        setOpenAlert(true);
        changeAlert("Title length must be more than 2 characters.");
      } else if (textRef.length < 9) {
        setOpenAlert(true);
        changeAlert("Text length must be 10 characters or more.");
      } else close();
    }
  };

  const closeEmoji = () => {
    changeOpenEmoji(false);
  };

  const triggerEmoji = () => {
    changeOpenEmoji(true);
  };

  const onEmojiClick = (event, emojiObject) => {
    changeChosenEmoji(emojiObject.emoji);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={close}
        fullWidth
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle className={classes.dialog}>{"Add new story"}</DialogTitle>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={titleRef}
                  onChange={changeTitleRef}
                  minLength='2'
                  maxLength='33'
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Beginning text</Form.Label>
                <Form.Control
                  value={textRef}
                  onChange={changeTextRef}
                  minLength='10'
                  maxLength='120'
                  required
                />
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
              <div className={`${classes.formSubmit}`}>
                <Button type='submit' onClick={validate} className={classes.submitButton}>
                  Add story
                </Button>
                <div className={classes.emojiContainer} onClick={triggerEmoji}>
                  <span className={classes.emojiText}>Selected emoji:</span>{" "}
                  <span className={classes.emoji}>{chosenEmoji}</span>
                </div>
              </div>
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
        <Card>
          <Card.Body>
            <Picker onEmojiClick={onEmojiClick} />
          </Card.Body>
        </Card>
      </Dialog>

      <div className={classes.container}>
        {loading ? <Spinner /> : <div className={classes.archiveContainer}>{stories}</div>}
      </div>

      <Button onClick={openOpen} className={classes.addButton}>
        Add new story
      </Button>
    </div>
  );
}
