import firebase from 'firebase/app';
import 'firebase/firestore';
import { useEffect, useState, useContext } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { db } from '../firebase/Firebase';
import { AuthenticatedContext } from '../contexts/AuthenticatedContext';
import { UpdatedUserContext } from "../contexts/UpdatedUserContext";
import useForm from '../hooks/useForm';
import Post from './Post';
import Spinner from './Spinner';


const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        margin: "2rem 0",
        textAlign: "center",
    },
    '@global': {
        '.effect7': {
            display: "flex",
            width: "100vh",
            height: "20rem",
            position: 'relative',
            webkitBoxShadow: '0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset',
            mozBoxShadow: '0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset',
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
    },  
    post: {
        margin: "2.5rem 0"
    },
    postContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        marginTop: "2rem"
    },
    '@media (max-width: 748px)': {
        '@global': {
            '.effect7': {
                display: "flex",
                width: "48vh",
                }
    }
}
}



function Story(props) {
  const history = useHistory();
  const { title } = props.match.params;
  const { classes } = props;
  const { user } = useContext(AuthenticatedContext);
  const { updated } = useContext(UpdatedUserContext);
  const [loading, changeLoading] = useState(true);
  const [displayText, changeText] = useState("");
  const [posts, changePosts] = useState([]);
  const [postAdded, changePostAdded] = useState(false);
  const [newPost, changeNewPost] = useForm("");
  const [alert, changeAlert] = useState("");
  const [voted, changedVoted] = useState(false);

  const toggleVotes = () => {
    changedVoted(true);
    changedVoted(false);
  };

  // Method that looks at all of the posts, gets the highest voted post and adds it to the existing story text. The posts are all deleted afterwards
  const addToStory = async () => {
    const storyRef = db.collection("stories").doc(title);
    const storyData = await storyRef.get();
    let winner;
    let highestVote = { votes: 0 }; // Represents the object to be returned
    let tieVotes = []; // Represents an array that is pushed values that tie with the highest vote count, is rewritten when a new high vote is encountered
    // This loop will return an object representing the text to be added to the story, and the user who won
    storyData.data().posts.forEach((post) => {
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
    console.log(winner);
    console.log(storyData.data().text);
    console.log(winner.text);
    const updatedText = `${storyData.data().text} ${winner.text}`;
    storyRef.set({
      text: updatedText,
      posts: [],
      title: title,
    });

    const userRef = db.collection("users").doc(winner.owner.username);
    const userData = await userRef.get();

    userRef.set(
      {
        winningPosts: userData.data().winningPosts + 1,
      },
      { merge: true }
    );
    console.log("Post elimination successful");
  };

  // Click handler for adding a new post to the story
  const handleClick = async (e) => {
    if (user) {
      e.preventDefault();
      if (!await checkPosted()) { // Check to see if this user has already posted
        const storyRef = db.collection("stories").doc(title);
        const post = {
          owner: {
            photoURL: user.photoURL,
            username: user.displayName,
          },
          text: newPost,
          votes: 0,
          voters: [],
        };
        await storyRef
          .update({
            posts: firebase.firestore.FieldValue.arrayUnion(post), // Appending a new post to the story
          })
          .then(() => {
            console.log("Post successfully added!");
            changePostAdded(true);
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

  // Useeffect for fetching story and post data
  useEffect(() => {
    const fetchData = async () => {
      const storyRef = db.collection("stories").doc(title);
      const storyData = await storyRef.get();
      if (storyData.exists) {
        const { posts, text } = storyData.data();
        changeLoading(false);
        // Get all the posts from the database for this particular story
        if (posts.length > 0) {
          const newPosts = posts.map((post) => (
            <Post
              changeAlert={changeAlert}
              key={post.owner.username}
              {...post}
              title={title}
              toggleVotes={toggleVotes}
            />
          ));
          changePosts(newPosts);
        }
        changeText(text);
        changePostAdded(false);
      } else history.push("/error");
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postAdded, voted, updated]);

  return (
    <>
      {alert ? (
        <Alert onClick={() => changeAlert("")} variant="danger">
          <Alert.Heading>{alert}</Alert.Heading>
        </Alert>
      ) : null}
      <Container className={classes.container}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div>
              <h1 className={classes.title}>{title}</h1>

              <div className="box effect7">
                <textarea
                  disabled="yes"
                  className={classes.text}
                  value={displayText}
                />
              </div>
            </div>

            <ul className={classes.postContainer}>{posts}</ul>

            <Form onSubmit={handleClick} className={classes.post}>
              <Form.Group>
                <Form.Label>New post</Form.Label>
                <Form.Control
                  maxLength="90"
                  value={newPost}
                  onChange={changeNewPost}
                  type="text"
                  required
                />
              </Form.Group>
              <Button className="w-100" type="submit">
                Post
              </Button>
            </Form>
            <Button onClick={addToStory}>Click Me</Button>
          </>
        )}
      </Container>
    </>
  );
}

export default withStyles(styles)(Story);
