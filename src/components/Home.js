import { db } from "../firebase/Firebase";
import firebase from "firebase/app";
import { useState, useEffect, useContext } from "react";
import useForm from "../hooks/useForm";
import { withStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AuthenticatedContext } from "../contexts/AuthenticatedContext";
import { AlertContext } from "../contexts/AlertContext";
import HomeForm from "./HomeForm";
import MiniStory from "./MiniStory";
import styles from "../styles/homeStyles";
import { partitionRounds, calculateTimeDifference, getCurrentTime } from "../functions/timer";
import { archiveStory } from "../functions/storyFunctions";
import randomEmoji from "../functions/getEmoji";

function Home(props) {
  const history = useHistory();
  const { classes } = props;
  const [titleRef, changeTitleRef] = useForm("");
  const [textRef, changeTextRef] = useForm("");
  const [timeIntervalRef, changeTimeIntervalRef] = useState(30);
  const [roundsRef, changeRoundsRef] = useState(5);
  const [stories, changeStories] = useState([]);
  const [loading, changeLoading] = useState(true);
  const { user } = useContext(AuthenticatedContext);
  const [chosenEmoji, changeChosenEmoji] = useState(randomEmoji);
  const { openSnackbar, setAlert, SnackbarAlert, setAlertColor } = useContext(AlertContext);

  useEffect(() => {
    updateHomePage();
    const interval = setInterval(() => {
      updateHomePage();
    }, 3000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Use effect to fetch the storydata, and then renders a ministory component for each story found in the database
  // Every 10 seconds update the home page and delete/archive stories if time interval is up
  const updateHomePage = async () => {
    const storyRef = db.collection("stories");
    const storyData = await storyRef.get();
    const newStories = [];
    // If the stories database has existing stories
    if (!storyData.empty) {
      storyData.forEach(async (story) => {
        const { text, title, emoji, timeInformation, createdBy } = story.data();
        //see whether this story is expired or not (past due)
        if (
          timeInformation.timeInterval +
            calculateTimeDifference(
              getCurrentTime(),
              timeInformation.roundEnd[timeInformation.totalRounds - 1]
            ) <
          0
        ) {
          await archiveStory(title, text, emoji, createdBy);
          console.log("cleaning");
        } else {
          newStories.push(
            <MiniStory key={title} title={title} classes={classes} text={text} emoji={emoji} />
          );
        }
      });
      changeStories(newStories);
    } else {
      // If there are no existing stories
      changeStories(
        <h1 style={{ margin: "4rem", textAlign: "center" }}>There are no stories yet!</h1>
      );
    }
    changeLoading(false);
  }; // eslint-disable-next-line react-hooks/exhaustive-deps

  // Handler for when we add to story, checks our database to see if there is a story with that name already, and if there isn't adds to database
  const handleSubmit = async (e) => {
    if (user) {
      e.preventDefault();
      const storiesRef = await db.collection("stories").doc(titleRef).get(); // Fetch the data for storiesref
      const archiveRef = await db.collection("archive").doc(titleRef).get(); // Fetch the data for storiesref
      const userRef = await db.collection("users").doc(user.displayName).get();
      if (userRef.data().activePosts < 3) {
        if (userRef.data().activePosts < 0) {
          await db.collection("users").doc(user.displayName).update({ activePosts: 0 });
        }
        if (!storiesRef.exists && !archiveRef.exists) {
          // Below object represents the time information for this story, such as what round we are currently on, and the end of each round
          const timeInformation = {
            totalRounds: parseInt(roundsRef),
            currentRound: 1,
            timeInterval: parseInt(timeIntervalRef),
            roundEnd: partitionRounds(parseInt(timeIntervalRef), parseInt(roundsRef))
          };
          await db
            .collection("users")
            .doc(user.displayName)
            .update({ activePosts: firebase.firestore.FieldValue.increment(1) });
          await db
            .collection("stories")
            .doc(titleRef)
            .set({
              title: titleRef,
              lastPost: "$$$",
              text: `${textRef} `,
              posts: [],
              emoji: chosenEmoji,
              timeInformation,
              createdBy: user.displayName,
              canPost: true
            });
          console.log("Add successful!");
          await updateHomePage();
        } else {
          // If there is an existing story with the same name or archive with the same name
          setAlert("There is already a story or archive with that title");
          setAlertColor("error");
          openSnackbar();
        }
      } else {
        setAlert(
          "You've already posted 3 or more times, wait for the other posts to run out of time."
        );
        setAlertColor("error");
        openSnackbar();
      }
    } else history.push("/signup");
  };

  return (
    <>
      <HomeForm
        classes={classes}
        loading={loading}
        stories={stories}
        handleSubmit={handleSubmit}
        titleRef={titleRef}
        changeTitleRef={changeTitleRef}
        textRef={textRef}
        changeTextRef={changeTextRef}
        timeIntervalRef={timeIntervalRef}
        changeTimeIntervalRef={changeTimeIntervalRef}
        roundsRef={roundsRef}
        changeRoundsRef={changeRoundsRef}
        chosenEmoji={chosenEmoji}
        changeChosenEmoji={changeChosenEmoji}
      />
      <SnackbarAlert />
    </>
  );
}

export default withStyles(styles)(Home);
