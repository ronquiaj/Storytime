import "firebase/firestore";
import { useContext, useState } from "react";
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
    const { classes, text, votes, title, toggleVotes, changeAlert } = props;
    const { photoURL, username } = props.owner;
    const { user } = useContext(AuthenticatedContext);
    const { voteColor, changeVoteColor } = useState('gray');
    const history = useHistory();

    // Function to handle a user that has already voted, returns an object with voted and addToVote values
    const handleExistingVoter = (currentVoter, voteValue) => {
        if (currentVoter.voted === 1) { // 
            if (voteValue === 1) {  // voteValue represents the user clicking either up or down
                changeAlert("You can't vote more than once");
                return {voted: 1, addToVote: 0}
            } else if (voteValue === -1) { // Negative vote
                return {voted: 0, addToVote: -1};
            }
        } else if (currentVoter.voted === -1) {
            if (voteValue === -1 ) {
                changeAlert("You can't vote more than once");
                return { voted: -1, addToVote: 0 };
            } else if (voteValue === 1) {
                return {voted: 0, addToVote: 1};
            }
        } else {
            return {voted: voteValue, addToVote: voteValue}
        }
    }

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
          voted: voteValue, // Is either positive or negative
        };

           const updatedPosts = [];
            storyData.data().posts.forEach((post) => {
              // Cycle through the data returned from the stories posts, and modify the post being voted on
              if (post.owner.username === votePost.owner.username) {
                
                const currentVoter = post.voters.find(voter => { // Get the voter information of the currently logged in user, returns 
                    return voter.name === user.displayName; // an object representing the voters existing vote info and undefined otherwise
                })
                
                if (currentVoter) {
                    const addToVote = handleExistingVoter(currentVoter, voteValue);
                    let postWithUpdatedUserVotes = post.voters.map(voter => {
                      if (voter.name === newVoter.name) {
                        voter.voted = addToVote.voted;
                      }
                      return voter;
                    })

                     updatedPosts.push({
                    ...votePost, // Returns the existing information of the post being voted on, such as text
                    voters: postWithUpdatedUserVotes, // Returns the updated voters array
                    votes: addToVote.addToVote + post.votes, // Returns the updated votes
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
              posts: updatedPosts,
            };

            await storyTitle.set(updatedStory);
            
            toggleVotes();
        }
      
    };

    return (
      <Row className={classes.container}>
        <Col>
          <div className={classes.user}>
            <img alt="user profile pic" className={classes.image} src={photoURL} />
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