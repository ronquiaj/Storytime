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
  let updatedText = text;
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
      winner["username"] = postData[1].props.owner.username;
    } else if (postData[1].props.votes < postData[0].props.votes) {
      winner["text"] = postData[0].props.text;
      winner["username"] = postData[0].props.owner.username;
    } else {
      winner["text"] = postData[Math.floor(Math.random() * 2)].props.text;
      winner["username"] = postData[Math.floor(Math.random() * 2)].props.owner.username;
    }
  }

  //If the text did change, meaning there was at least one post on the story
  if (winner.text) {
    updatedText = `${text + winner.text} `;
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
  return updatedText;
};

// Archives the story and deletes it, only accepts stories with characters with more than
const archiveStory = async (title, text, emoji, createdBy) => {
  if (text) {
    if (text.length >= 60) {
      await db.collection("archive").doc(title).set({
        dateCreated: new Date(),
        emoji,
        text,
        title,
        createdBy
      });
      await db
        .collection("users")
        .doc(createdBy)
        .update({
          activePosts: firebase.firestore.FieldValue.increment(-1)
        });
      db.collection("stories").doc(title).delete();
      return true;
    }
  }
  db.collection("stories").doc(title).delete();
  await db
    .collection("users")
    .doc(createdBy)
    .update({
      activePosts: firebase.firestore.FieldValue.increment(-1)
    });
  return false;
};

export { checkPosted, fetchStoryData, addToStory, archiveStory };
