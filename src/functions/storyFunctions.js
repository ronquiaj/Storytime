import { db } from "../firebase/Firebase";
import firebase from "firebase/app";

// Check to see if there is already a post with the username, returns false if there is no post made by the user yet
const checkPosted = async (title, user) => {
  const storyRef = await db.collection("stories").doc(title).get();
  return storyRef.data().posts.some((post) => post.owner.username === user.displayName);
};

// Method to get story data from the database
const fetchStoryData = async (title) => {
  const storiesRef = await db.collection("stories").doc(title).get();
  return storiesRef.data();
};

// Takes in postdata (basically all the documents posts) from state, look at which has the highest vote, and then updates the text and resets the posts
const addToStory = async (title, text, postData, changePosts, setDisplayText) => {
  const winner = { votes: -9999, text: "" };
  if (postData.length > 2 || postData.length === 1) {
    for (let post of postData) {
      if (post.props.votes > winner.votes) {
        winner["votes"] = post.props.votes;
        winner["text"] = post.props.text;
        winner["username"] = post.props.owner.username;
      }
    }
  } else if (postData.length === 2) {
    if (postData[0].props.votes < postData[1].props.votes) {
      winner["text"] = postData[1].props.text;
      winner["username"] = postData[1].props.owner.props.username;
    } else if (postData[1].props.votes < postData[0].props.votes) {
      winner["text"] = postData[0].props.text;
      winner["username"] = postData[0].props.owner.props.username;
    } else {
      winner["text"] = postData[Math.floor(Math.random() * 2)].props.text;
    }
  }

  //If the text did change, meaning there was at least one post on the story
  if (winner.text) {
    const updatedText = `${text + winner.text} `;
    console.log(winner.text);
    await db.collection("stories").doc(title).update({
      posts: [],
      text: updatedText
    });
    await db
      .collection("users")
      .doc(winner.username)
      .update({
        winningPosts: firebase.firestore.FieldValue.increment(1)
      });
    changePosts([]);
    setDisplayText(updatedText);
  }
};

export { checkPosted, fetchStoryData, addToStory };
