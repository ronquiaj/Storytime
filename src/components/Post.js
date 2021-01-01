import firebase from "firebase/app";
import "firebase/firestore";
import { useContext } from "react";
import { withStyles } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase/Firebase";
import { AuthenticatedContext } from "../contexts/AuthenticatedContext";

const styles = {
    container: {
        display: "flex",
        width: "100%",
        height: "8rem",
        margin: "0.7rem 0",
        alignItems: "center",
        justifyContent: "space-around",
        webkitBoxShadow: "7px 7px 63px -28px rgba(0,0,0,0.37)",
        mozBoxShadow: "7px 7px 63px -28px rgba(0,0,0,0.37)",
        boxShadow: "7px 7px 63px -28px rgba(0,0,0,0.37)"
    },
    user: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "25%",
        margin: "1rem auto 0 0"
    },
    image: {
        width: "5.5rem", 
        height: "5rem"
    },
    text: {
        fontSize: "1.5rem",
        width: "100%"
    },
    arrow: {
        display: "flex",
        margin: "0 0.5rem",
        fontSize: "1.5rem",
    },
    arrowContainer: {
        marginLeft: "8rem",
        display: "flex"
    },
    '@media (max-width: 1024px)': {
        text: {
            fontSize: "0.84rem"
        },
        arrowContainer: {
            marginLeft: "0"
        }
}
}

function Post(props) {
    const { classes, text, votes, title } = props;
    const { photoURL, username } = props.owner;
    const { user } = useContext(AuthenticatedContext);
    const history = useHistory();

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
        const newVoter = {
          name: user.displayName,
          voted: voteValue, // Is either positive or negative
        };
        const postIndex = storyData.data().posts.findIndex((post) => {
          //Returns the index of the post that is being voted on
          return post.owner.username === username;
        });

        if (
          votePost.voters.length === 0 ||
          votePost.voters.find((voter) => voter.name === user.displayName) // If voters array is empty or if the current user hasn't voted yet
        ) {
          // Update voter array
          console.log(storyData.data().posts[postIndex].voters);
        //   await storyTitle.update({
        //     "posts[].voters": firebase.firestore.FieldValue.arrayUnion(newVoter), // Append the new voter to the post
        //   });

        //   // Update vote amount
        //   await storyTitle.update({
        //     "posts[].votes": firebase.firestore.FieldValue.increment(voteValue),
        //   });

        //   console.log("Vote successful!");
        // } else {
        //   if (voteValue > 0) {
        //       console.log("Positive");
        //   } else {
        //       console.log("Negative");
        //   }
        }
      }
    };

    return (
      <Row className={classes.container}>
        <Col>
          <div className={classes.user}>
            <img className={classes.image} src={photoURL} />
            <Link to={`/users/${username}`}>
              <h4 style={{ fontSize: "0.7rem" }}>{username}</h4>
            </Link>
          </div>
        </Col>
        <Col>
          <h4 className={classes.text}>{text}</h4>
        </Col>
        <Col>
          <div className={classes.arrowContainer}>
            <i
                onClick={() => handleVote(1)}
                className={`fas fa-arrow-up ${classes.arrow}`}
            ></i>
            {votes}
            <i
              onClick={() => handleVote(-1)}
              className={`fas fa-arrow-down ${classes.arrow}`}
            ></i>
          </div>
        </Col>
      </Row>
    );
}

export default withStyles(styles)(Post);