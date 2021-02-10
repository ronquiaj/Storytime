import firebase from "firebase/app";
import "firebase/firestore";
import { useEffect, useState, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { db } from "../firebase/Firebase";
import { AuthenticatedContext } from "../contexts/AuthenticatedContext";
import useForm from "../hooks/useForm";
import Post from "./Post";
import styles from "../styles/storyStyles.js";
import StoryDisplay from "./StoryDisplay";
import { compareTime, getCurrentTime, calculateTimeDifference } from "../functions/timer";
import { fetchStoryData, checkPosted, addToStory, archiveStory } from "../functions/storyFunctions";
import { AlertContext } from "../contexts/AlertContext";

function Story(props) {
  const history = useHistory();
  const { title } = props.match.params;
  const { classes } = props;
  const { user } = useContext(AuthenticatedContext);
  const [loading, changeLoading] = useState(true);
  const [displayText, changeText] = useState("");
  const [displayPosts, changeDisplayPosts] = useState([]);
  const [newPost, changeNewPost, reset] = useForm("");
  const [timeObject, changeTimeObject] = useState({});
  const [secondsRemaining, changeSecondsRemaining] = useState(0);
  const [totalRounds, changeTotalRounds] = useState();
  const [currentRound, changeCurrentRound] = useState();
  const [newCurrentRound, changeNewCurrentRound] = useState();
  const [checkAllChanged, setCheckAllChanged] = useState({ currentRound, timeObject, totalRounds });
  const [storyCreatedBy, changeStoryCreatedBy] = useState();
  const [storyEmoji, changeEmoji] = useState("😂");
  const [gameOver, changeGameOver] = useState(false);
  const { openSnackbar, setAlert, SnackbarAlert } = useContext(AlertContext);

  // Click handler for adding a new post to the story
  const handleClick = async (e) => {
    if (user) {
      e.preventDefault();
      if (!(await checkPosted(title, user))) {
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
          .catch((err) => err);
      } else {
        setAlert("You've already posted, wait for the time to run out.");
        openSnackbar();
      }
    } else history.push("/signup");
  };

  // Method that fetches story data and time data from the database and displays it on the page, this includes post data
  const updateStory = useCallback(async () => {
    const storyData = await fetchStoryData(title);
    const { posts, text, emoji } = storyData;
    // Get all the posts from the database for this particular story
    if (posts.length > 0) {
      const newPosts = posts.map((post) => (
        <Post key={post.owner.username} {...post} title={title} emoji={emoji} />
      ));
      changeDisplayPosts(newPosts);
    }
    changeText(text);
  }, [title]);

  //function to loop through round end and then update current round
  const updateTime = () => {
    let newCurrentRound = 1;
    timeObject.roundEnd.forEach((round, index) => {
      if (compareTime(getCurrentTime(), round)) {
        // compare this round time and our current time, if our time is later than we are past that round
        newCurrentRound = index + 1;
      }
    });
    changeSecondsRemaining(
      timeObject.timeInterval +
        calculateTimeDifference(getCurrentTime(), timeObject.roundEnd[newCurrentRound - 1])
    );
    changeNewCurrentRound(newCurrentRound);
  };

  // This is activated when we go to a new round, changes current round and sets the database current round to the newcurrentround
  useEffect(() => {
    if (newCurrentRound) {
      const updateCurrentRoundInDatabase = async () => {
        await db.collection("stories").doc(title).update({
          "timeInformation.currentRound": newCurrentRound
        });
        changeCurrentRound(newCurrentRound);
      };
      updateCurrentRoundInDatabase();
      addToStory(title, displayText, displayPosts, changeDisplayPosts, changeText);
      if (newCurrentRound === totalRounds) {
        setTimeout(async () => {
          changeGameOver(true);
        }, timeObject.timeInterval * 1000);
      }
    }
  }, [newCurrentRound]); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect which gets the initial time information from the database, starts first
  useEffect(() => {
    const fetchInitialTimeInformation = async () => {
      const storyData = await fetchStoryData(title);
      const { timeInformation, emoji, text, createdBy } = storyData;
      changeEmoji(emoji);
      changeTimeObject(timeInformation);
      changeText(text);
      changeStoryCreatedBy(createdBy);
      changeCurrentRound(timeInformation.currentRound);
      changeTotalRounds(timeInformation.totalRounds);
    };
    fetchInitialTimeInformation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect for making sure that dependencies are all changed at once
  useEffect(() => {
    setCheckAllChanged((prev) => {
      return currentRound !== prev.currentRound &&
        timeObject !== prev.timeObject &&
        totalRounds !== prev.totalRounds
        ? { currentRound, timeObject, totalRounds }
        : prev; // do nothing
    });
  }, [currentRound, totalRounds, timeObject]); // eslint-disable-line react-hooks/exhaustive-deps

  // In response to the above useeffect, sets up the time interval
  useEffect(() => {
    if (totalRounds && currentRound && "currentRound" in timeObject) {
      if (
        timeObject.timeInterval +
          calculateTimeDifference(getCurrentTime(), timeObject.roundEnd[totalRounds - 1]) <
        0
      ) {
        changeCurrentRound(totalRounds);
        changeGameOver(true);
      } else {
        const interval = setInterval(() => {
          if (!gameOver) {
            updateStory();
            updateTime();
          }
        }, 1000);
        return () => clearInterval(interval);
      }
    }
    setTimeout(() => changeLoading(false), 1500);
  }, [checkAllChanged, newCurrentRound, gameOver]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const processGameOver = async () => {
      const updatedText = await addToStory(
        title,
        displayText,
        displayPosts,
        changeDisplayPosts,
        changeText
      );
      setTimeout(async () => {
        if (await archiveStory(title, updatedText, storyEmoji, storyCreatedBy)) {
          setAlert("Story successfully added to archive");
          openSnackbar();
          history.push(`/archive/${title}`);
        } else {
          setAlert("Story must be more than 160 characters to be added to the archive :(");
          openSnackbar();
          history.push("/");
        }
      }, 1750);
    };
    if (gameOver) {
      processGameOver();
    }
  }, [gameOver]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <StoryDisplay
        classes={classes}
        loading={loading}
        title={title}
        displayText={displayText}
        posts={displayPosts}
        newPost={newPost}
        changeNewPost={changeNewPost}
        handleClick={handleClick}
        secondsLeft={secondsRemaining}
        totalRounds={totalRounds}
        currentRound={currentRound}
        gameOver={gameOver}
        emoji={storyEmoji}
      />
      <SnackbarAlert />
    </>
  );
}

export default withStyles(styles)(Story);
