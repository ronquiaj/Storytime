import { withStyles } from '@material-ui/core';
import { Container } from 'react-bootstrap';
import styles from '../styles/userDisplayStyles';

function UserDisplay(props) {
    const { classes, displayName, photoURL, bio, winningPosts } = props;
    
    return (
      <Container className={classes.container}>
        <h1>{displayName}</h1>
        <img
          alt="profile pic"
          className={classes.profilePicture}
          src={photoURL}
        />
        <h4 className={classes.bio}>{bio}</h4>
        <h1>Winning posts: {winningPosts}</h1>
      </Container>
    );
}

export default withStyles(styles)(UserDisplay);