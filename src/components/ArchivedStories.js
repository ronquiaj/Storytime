import { withStyles } from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import { db } from "../firebase/Firebase";
import MiniStory from "./MiniStory";
import styles from "../styles/archivedStoriesStyles";
import Spinner from "./Spinner";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function ArchivedStories(props) {
  const [archivedPosts, setArchivedPosts] = useState([]);
  const [loading, changeLoading] = useState(true);
  const { classes } = props;
  const bigScreen = useMediaQuery("(min-width:1025px)");
  // method to fetch data from the database and be used in the use effect to display archived posts
  const fetchData = useCallback(async () => {
    const archiveRef = db.collection("archive");
    const archiveData = await archiveRef.get();
    const archive = [];
    let row = [];
    if (bigScreen)
      archiveData.forEach((story) => {
        const { title, text, emoji, dateCreated } = story.data();
        if (row.length === 3) {
          archive.push(<div className={classes.archiveRow}>{row}</div>);
          row = [];
        } else
          row.push(
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
    else
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
    if (row.length > 0) archive.push(row);
    setArchivedPosts(archive);
    changeLoading(false);
  }, [classes, bigScreen]);

  //useeffect to fetch arhive data from the database
  useEffect(() => {
    fetchData();
  }, [fetchData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.container}>
      {loading ? (
        <Spinner />
      ) : archivedPosts.length === 0 ? (
        <h1 className={classes.noArchivedPosts}>
          There are no archived posts yet!
        </h1>
      ) : (
        <div className={classes.archiveContainer}>{archivedPosts}</div>
      )}
    </div>
  );
}

export default withStyles(styles)(ArchivedStories);
