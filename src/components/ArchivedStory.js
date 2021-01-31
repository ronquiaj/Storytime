import React, { useState, useCallback, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import { Container } from "react-bootstrap";
import { db } from "../firebase/Firebase";

const styles = {
   container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    margin: "2rem 0",
    textAlign: "center",
    fontWeight: 400
  },
  "@global": {
    ".effect7": {
      display: "flex",
      width: "100vh",
      height: "20rem",
      position: "relative",
      webkitBoxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
      mozBoxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
      boxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
      padding: "1rem"
    }
  },
  text: {
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0)",
    border: "none",
    resize: "none",
    color: "black",
    fontWeight: 100,
    fontSize: "1.105rem"
  }
};

function ArchivedStories(props) {
  const { classes } = props;
  const [archiveText, changeArchiveText] = useState("");
  const { title } = props.match.params;

  // fetches archive data
  const fetchArchive = useCallback(async () => {
    const archiveRef = await db.collection("archive").doc(title).get();
    return archiveRef.data();
  }, [title]);


  useEffect(() => {
    const displayArchivedPost = async () => {
      const archiveData = await fetchArchive();
      const {text} = archiveData;
      console.log(text);
      changeArchiveText(text);
    }
    displayArchivedPost();
  }, [fetchArchive]);

  return (
    <Container className={classes.container}>
      <div>
        <h1 className={classes.title}>{title}</h1>
        <div className='box effect7'>
          <textarea disabled='yes' className={classes.text} value={archiveText} />
        </div>
      </div>
    </Container>
  );
}

export default withStyles(styles)(ArchivedStories);
