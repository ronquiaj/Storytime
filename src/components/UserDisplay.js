import { withStyles } from '@material-ui/core';
import { Container } from 'react-bootstrap';

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "2rem",
    width: "100vw",
  },
  profilePicture: {
    width: "50%",
    margin: "auto",
  },
  bio: {
      margin: "2rem"
  },
};

function UserDisplay(props) {
    const { classes, displayName, photoURL, bio} = props;
    
    return (
      <Container className={classes.container}>
        <h1>{displayName}</h1>
        <img alt="profile pic" className={classes.profilePicture} src={photoURL} />
        <h4 className={classes.bio}>{bio}</h4>
      </Container>
    );
}

export default withStyles(styles)(UserDisplay);