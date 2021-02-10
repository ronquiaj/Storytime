import React, { useState, useCallback, useEffect, useContext } from "react";
import { withStyles } from "@material-ui/core";
import { Container } from "react-bootstrap";
import { db } from "../firebase/Firebase";
import styles from "../styles/archivedStoryStyles";
import Spinner from "./Spinner";
import { AlertContext } from "../contexts/AlertContext";

function ArchivedStories(props) {
  const { classes } = props;
  const { openSnackbar, SnackbarAlert } = useContext(AlertContext);
  const [archiveText, changeArchiveText] = useState("");
  const { title } = props.match.params;
  const [emoji, changeEmoji] = useState("😂");
  const [loading, changeLoading] = useState(true);

  // fetches archive data
  const fetchArchive = useCallback(async () => {
    const archiveRef = await db.collection("archive").doc(title).get();
    return archiveRef.data();
  }, [title]);

  useEffect(() => {
    const displayArchivedPost = async () => {
      const archiveData = await fetchArchive();
      const { text, emoji } = archiveData;
      changeEmoji(emoji);
      changeArchiveText(text);
    };
    displayArchivedPost();
    setTimeout(() => changeLoading(false), 1000);
  }, [fetchArchive]);

  return (
    <Container className={classes.container}>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className={classes.title}>
            {title} {emoji}
          </h1>
          <div className='box effect7'>
            <textarea disabled='yes' className={classes.text} value={archiveText} />
          </div>
        </div>
      )}
      <SnackbarAlert color='success' />
    </Container>
  );
}

export default withStyles(styles)(ArchivedStories);
