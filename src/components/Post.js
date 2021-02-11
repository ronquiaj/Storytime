import "firebase/firestore";
import { useContext } from "react";
import { withStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { db } from "../firebase/Firebase";
import { AuthenticatedContext } from "../contexts/AuthenticatedContext";
import { AlertContext } from "../contexts/AlertContext";
import styles from "../styles/postStyles";
import PostDisplay from "./PostDisplay";

function Post(props) {
  const { classes, text, title, votes } = props;
  const { photoURL, username } = props.owner;
  const { user } = useContext(AuthenticatedContext);
  const { openSnackbar, setAlert, SnackbarAlert, setAlertColor } = useContext(AlertContext);
  const history = useHistory();

  // Function to handle a user that has already voted, returns an object with voted and addToVote values
  const handleExistingVoter = (currentVoter, voteValue) => {
    if (currentVoter.voted === 1) {
      //
      if (voteValue === 1) {
        // voteValue represents the user clicking either up or down
        setAlert("You can't vote more than once");
        setAlertColor("error");
        openSnackbar();
        return { voted: 1, addToVote: 0 };
      } else if (voteValue === -1) {
        // Negative vote
        return { voted: 0, addToVote: -1 };
      }
    } else if (currentVoter.voted === -1) {
      if (voteValue === -1) {
        setAlert("You can't vote more than once");
        setAlertColor("error");
        openSnackbar();
        return { voted: -1, addToVote: 0 };
      } else if (voteValue === 1) {
        return { voted: 0, addToVote: 1 };
      }
    } else {
      return { voted: voteValue, addToVote: voteValue };
    }
  };

  const handleVote = async (voteValue) => {
    if (!user) {
      history.push("/signup");
    } else {
      const storyTitle = db.collection("stories").doc(title);

      const storyData = await storyTitle.get();

      const votePost = storyData.data().posts.find((post) => {
        //Returns the post that is being voted on
        return post.owner.username === username;
      });

      //This new variable will be added to the voters array for this particular post
      let newVoter = {
        name: user.displayName,
        voted: voteValue // Is either positive or negative
      };

      const updatedPosts = [];
      storyData.data().posts.forEach((post) => {
        // Cycle through the data returned from the stories posts, and modify the post being voted on
        if (post.owner.username === votePost.owner.username) {
          const currentVoter = post.voters.find((voter) => {
            // Get the voter information of the currently logged in user, returns
            return voter.name === user.displayName; // an object representing the voters existing vote info and undefined otherwise
          });

          if (currentVoter) {
            const addToVote = handleExistingVoter(currentVoter, voteValue);
            let postWithUpdatedUserVotes = post.voters.map((voter) => {
              if (voter.name === newVoter.name) {
                voter.voted = addToVote.voted;
              }
              return voter;
            });

            updatedPosts.push({
              ...votePost, // Returns the existing information of the post being voted on, such as text
              voters: postWithUpdatedUserVotes, // Returns the updated voters array
              votes: addToVote.addToVote + post.votes // Returns the updated votes
            });
          } else {
            updatedPosts.push({
              ...votePost, // Returns the existing information of the post being voted on, such as text
              voters: [...post.voters, newVoter], // Returns the updated voters array
              votes: newVoter.voted + post.votes // Returns the updated votes
            });
          }
        } else updatedPosts.push(post);
      });
      const updatedStory = {
        ...storyData.data(),
        posts: updatedPosts
      };

      await storyTitle.set(updatedStory);
    }
  };

  return (
    <>
      <PostDisplay
        classes={classes}
        photoURL={photoURL}
        username={username}
        text={text}
        handleVote={handleVote}
        votes={votes}
      />
      <SnackbarAlert />
    </>
  );
}

export default withStyles(styles)(Post);
