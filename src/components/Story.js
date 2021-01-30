import firebase from "firebase/app";
import "firebase/firestore";
import { useEffect, useState, useContext, useCallback } from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { db } from "../firebase/Firebase";
import { AuthenticatedContext } from "../contexts/AuthenticatedContext";
import useForm from "../hooks/useForm";
import Post from "./Post";
import styles from "../styles/storyStyles.js";
import StoryDisplay from "./StoryDisplay";
import { compareTime, getCurrentTime, calculateTimeDifference } from "./timer";

function Story(props) {
  const history = useHistory();
  const { title } = props.match.params;
  const { classes } = props;
  const { user } = useContext(AuthenticatedContext);
  const [loading, changeLoading] = useState(true);
  const [displayText, changeText] = useState("");
  const [displayPosts, changeDisplayPosts] = useState([]);
  const [newPost, changeNewPost, reset] = useForm("");
  const [alert, changeAlert] = useState("");
  const [currentRound, changeCurrentRound] = useState(1);
  const [totalRounds, changeTotalRounds] = useState(10);
  const [timeObject, changeTimeObject] = useState({});
  const [secondsLeft, changeSecondsLeft] = useState(0);
  const [intervalID, changeIntervalID] = useState();
  const [gameOver, changeGameOver] = useState(false);

  // Method that looks at all of the posts, gets the highest voted post and adds it to the existing story text. The posts are all deleted afterwards
  const addToStory = useCallback(async () => {
    console.log("in here");
    const storyRef = db.collection("stories").doc(title);
    const storyData = await storyRef.get();
    let winner;
    let highestVote = { votes: -9999 }; // Represents the object to be returned
    let tieVotes = []; // Represents an array that is pushed values that tie with the highest vote count, is rewritten when a new high vote is encountered
    // This loop will return an object representing the text to be added to the story, and the user who won
    const { posts } = storyData.data();
    if (posts.length > 0) {
      posts.forEach((post) => {
        if (post.votes > highestVote.votes) {
          tieVotes = []; // Reset the tievotes array
          highestVote = post;
          tieVotes.push(highestVote);
        } else if (post.votes === highestVote.votes) {
          tieVotes.push(post);
        }
      });

      if (tieVotes.length > 1 || highestVote.votes === 0) {
        // Get a random winner from the posts that have tied
        winner = tieVotes[Math.floor(Math.random() * tieVotes.length)];
      } else {
        winner = highestVote;
      }
      const updatedText = `${storyData.data().text} ${winner.text}`;
      storyRef.set({
        text: updatedText,
        posts: [],
        title: title
      });

      const userRef = db.collection("users").doc(winner.owner.username);
      const userData = await userRef.get();

      userRef.set(
        {
          winningPosts: userData.data().winningPosts + 1
        },
        { merge: true }
      );
      changeDisplayPosts([]);
    }
  }, [title]);

  // Click handler for adding a new post to the story
  const handleClick = async (e) => {
    if (user) {
      e.preventDefault();
      if (!(await checkPosted())) {
        // Check to see if this user has already posted
        const storyRef = db.collection("stories").doc(title);
        const post = {
          owner: {
            photoURL: user.photoURL,
            username: user.displayName
          },
          text: newPost,
          votes: 0,
          voters: []
        };
        await storyRef
          .update({
            posts: firebase.firestore.FieldValue.arrayUnion(post) // Appending a new post to the story
          })
          .then(() => {
            reset();
          })
          .catch((err) => console.log(err));
      } else {
        changeAlert("You've already posted, wait for the time to run out.");
      }
    } else history.push("/signup");
  };

  // Check to see if there is already a post with the username, returns false if there is no post made by the user yet
  const checkPosted = async () => {
    const storyRef = await db.collection("stories").doc(title).get();
    return storyRef.data().posts.some((post) => post.owner.username === user.displayName);
  };

  // Method to get story data from the database
  const fetchData = useCallback(async () => {
    const storyRef = db.collection("stories").doc(title);
    const storyData = await storyRef.get();
    return storyData;
  }, [title]);

  const fetchStoryData = useCallback(async () => {
    const storyData = await fetchData();
    if (storyData.exists) {
      const { posts, text } = storyData.data();
      // Get all the posts from the database for this particular story
      if (posts.length > 0) {
        const newPosts = posts.map((post) => (
          <Post changeAlert={changeAlert} key={post.owner.username} {...post} title={title} />
        ));
        changeDisplayPosts(newPosts);
      }
      changeText(text);
    } else history.push("/error");
  }, [fetchData, history, title]);

  // Used to iterate through roundsend object and calculate the time
  const updateTimeInDatabase = useCallback(async () => {
    if (!gameOver) {
      const currentTime = getCurrentTime();
      let newCurrentRound = timeObject.currentRound;
      // iterate through the roundend list, comparing currentround and currenttime to each round end time

      timeObject.roundEnd.forEach((roundEnd, index) => {
        if (timeObject.currentRound < index + 1 && compareTime(currentTime, roundEnd)) {
          // if our current time is greater than this time, and our current round is less than this round
          newCurrentRound = index + 1;
        }
      });

      changeSecondsLeft(
        timeObject.timeInterval +
          calculateTimeDifference(currentTime, timeObject.roundEnd[newCurrentRound - 1])
      );
      changeCurrentRound(newCurrentRound);
    }
  }, [timeObject, gameOver]);

  const updateDatabase = useCallback(async () => {
    if (timeObject.roundEnd) {
      // Rounds have changed, update time in database and add to story
      await addToStory();
      const updatedTimeInformation = {
        roundEnd: timeObject.roundEnd,
        currentRound,
        totalRounds: timeObject.totalRounds,
        timeInterval: timeObject.timeInterval
      };
      await db.collection("stories").doc(title).update({
        timeInformation: updatedTimeInformation
      });
    }
  }, [addToStory, currentRound, timeObject, title]);

  // Method that deletes this story and adds its contents to the archive page
  const archivePosts = useCallback(async () => {
    const newArchivedStory = {
      dateCreated: getCurrentTime(),
      title,
      text: displayText
    };
    db.collection("archive").doc(title).set(newArchivedStory);
    db.collection("stories")
      .doc(title)
      .delete()
      .then(() => {
        history.push(`/archive/${title}`);
      });
  }, [displayText, history, title]);

  // After currentRound is changed, this use effect is triggered and updates the database
  useEffect(() => {
    updateDatabase();
    // This if statement is used when we are at the last round
    if (currentRound === timeObject.totalRounds) {
      setTimeout(async () => {
        clearInterval(intervalID);
        changeGameOver(true);
        archivePosts();
      }, timeObject.timeInterval * 1000);
    }
  }, [currentRound, updateDatabase, intervalID, timeObject, archivePosts]);

  // useEffect for setting the time object by getting time data from database
  useEffect(() => {
    const fetchTimeData = async () => {
      const storyData = await fetchData();
      let { timeInformation } = storyData.data();
      changeTimeObject(timeInformation);
      changeTotalRounds(timeInformation.totalRounds);
      changeCurrentRound(timeInformation.currentRound);
    };
    fetchTimeData();
  }, [fetchData]);

  // this useeffect sets an interval that runs every second, fetching data from the database
  useEffect(() => {
    if (timeObject.totalRounds !== timeObject.currentRound) {
      const time = setInterval(async () => {
        await updateTimeInDatabase();
        await fetchStoryData();
      }, 1000);
      changeIntervalID(time);
      return () => clearInterval(time);
    }
    setTimeout(() => changeLoading(false), 1750);
  }, [timeObject, updateTimeInDatabase, fetchStoryData]);

  return (
    <>
      {alert ? (
        <Alert onClick={() => changeAlert("")} variant='danger'>
          <Alert.Heading>{alert}</Alert.Heading>
        </Alert>
      ) : null}
      <StoryDisplay
        secondsLeft={secondsLeft}
        classes={classes}
        handleClick={handleClick}
        loading={loading}
        title={title}
        displayText={displayText}
        posts={displayPosts}
        newPost={newPost}
        changeNewPost={changeNewPost}
        currentRound={currentRound}
        totalRounds={totalRounds}
        gameOver={gameOver}
      />
    </>
  );
}

export default withStyles(styles)(Story);
