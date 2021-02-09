import archiveStyles from "./archivedStoriesStyles";

const styles = {
  dialog: {
    display: "flex",
    width: "50vw"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  titleLink: {
    color: "white"
  },
  formSubmit: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  emojiContainer: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "row"
  },
  emojiPicker: {
    transition: ".6s all",
    marginLeft: "0.5rem",
    fontSize: "1.5rem",
    "&:hover": {
      fontSize: "1.8rem"
    }
  },
  emojiText: {
    fontSize: "1.2rem"
  },
  addButton: {
    display: "flex",
    margin: "0 auto"
  },
  submitButton: {
    display: "flex",
    justifyContent: "center"
  },
  alert: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem"
  },
  miniStoryEmoji: {
    fontSize: "1.8rem",
    marginLeft: "20rem"
  },
  submit: {
    width: "100%"
  },
  form: {
    overflowY: "none",
    border: "5px solid green"
  },
  ...archiveStyles
};

export default styles;
