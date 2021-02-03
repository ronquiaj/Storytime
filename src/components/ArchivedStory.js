import React, { useState, useCallback, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import { Container } from "react-bootstrap";
import { db } from "../firebase/Firebase";
import styles from "../styles/archivedStoryStyles";

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
      const { text } = archiveData;
      console.log(text);
      changeArchiveText(text);
    };
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
