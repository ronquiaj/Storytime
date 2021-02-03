import { withStyles } from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import { db } from "../firebase/Firebase";
import { Container, Row } from "react-bootstrap";
import MiniStory from "./MiniStory";
import styles from "../styles/archivedStoriesStyles";
import Spinner from "./Spinner";

function ArchivedStories(props) {
  const [archivedPosts, setArchivedPosts] = useState([]);
  const [loading, changeLoading] = useState(true);
  const { classes } = props;

  // method to fetch data from the database and be used in the use effect to display archived posts
  const fetchData = useCallback(async () => {
    const archiveRef = db.collection("archive");
    const archiveData = await archiveRef.get();
    const archive = [];
    archiveData.forEach((story) => {
      const { title, text, emoji, dateCreated } = story.data();
      archive.push(
        <MiniStory
          title={title}
          text={text}
          emoji={emoji}
          classes={classes}
          dateCreated={dateCreated}
          key={title}
        />
      );
    });
    setArchivedPosts(archive);
    changeLoading(false);
  }, [classes]);

  //useeffect to fetch arhive data from the database
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Container className={classes.container}>
      <Row>
        {loading ? (
          <Spinner />
        ) : archivedPosts.length === 0 ? (
          <h1 className={classes.noArchivedPosts}>There are no archived posts yet!</h1>
        ) : (
          archivedPosts
        )}
      </Row>
    </Container>
  );
}

export default withStyles(styles)(ArchivedStories);
