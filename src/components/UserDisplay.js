import { withStyles } from '@material-ui/core';
import { Container } from 'react-bootstrap';

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "2rem",
        width: "100vw"
    },
    profilePicture: {
        width: "50%",
        margin: "auto"
    }
};

function UserDisplay(props) {
    const { classes, displayName, photoURL, bio} = props;
    
    return (
        <Container className={classes.container}>
            <h1>{displayName}</h1>
            <img className={classes.profilePicture} src={photoURL}/>
            {bio}
        </Container>
    )
}

export default withStyles(styles)(UserDisplay);