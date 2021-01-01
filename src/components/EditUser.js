import { useState, useEffect, useContext } from 'react';
import { db, storage } from '../firebase/Firebase';
import { withStyles } from '@material-ui/core';
import { Form, Container, Button, Alert, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Spinner from './Spinner';
import useForm from '../hooks/useForm';
import { AuthenticatedContext } from '../contexts/AuthenticatedContext';

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        textAlign: "center"
    },
    bio: {
        display: "flex",
        flexDirection: "column"
    },
    profilePicture: {
        width: "50%",
        height: "50%"
    },
    imageSubmit: {
        width: "25%",
        margin: "1rem auto"
    },
    spinner: {
        display: "flex",
        margin: "auto"
    },
    row: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        color: "white",
        textDecoration: "none"
    }
};

function EditUser(props) {
    const { classes } = props;
    const history = useHistory();
    const { user: pageUser } = props.match.params;
    const [ profilePictureRef, changeProfilePictureRef ] = useState("");
    const [ bioRef, changeBioRef, initialBioRef ] = useForm("");
    const [ displayNameRef, changeDisplayNameRef ] = useState("");
    const [ displayImageRef, changeDisplayImageRef ] = useState("");
    const [ pageLoaded, changePageLoaded ] = useState(false);
    const { user } = useContext(AuthenticatedContext);
    const [ alert, changeAlert ] = useState("");

    const handleChange = e => {
        const image = e.target.files[0];
        changeProfilePictureRef(image);
        changeDisplayImageRef(URL.createObjectURL(image));
    };

    useEffect(() => {
        const fetchData = async () => {
            const userData = await db.collection('users').doc(pageUser).get();
            const { displayName, photoURL, bio } = userData.data();
            changeDisplayImageRef(() => photoURL);
            changeDisplayNameRef(() => displayName);
            initialBioRef(() => bio);
            if (!user || user.displayName !== displayName) {
                history.push('/error');
            } else {
                changePageLoaded(true);
            }
            } 
        fetchData();
    }, [user]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (profilePictureRef) {
        // If profile picture is going to be changed
        storage
          .ref("images")
          .child(user.displayName)
          .delete()
          .then(() => {
            storage
              .ref(`/images/${user.displayName}`)
              .put(profilePictureRef)
              .then(() => {
                storage
                  .ref("images")
                  .child(user.displayName)
                  .getDownloadURL()
                  .then((url) => {
                    db.collection("users")
                      .doc(user.displayName)
                      .set(
                        {
                          bio: bioRef,
                          photoURL: url || user.photoURL,
                        },
                        { merge: true }
                      );
                    changeAlert("Successfully updated!");
                  });
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            console.log("Error deleting picture", err);
          });
      } else {
          db.collection("users")
            .doc(user.displayName)
            .set(
              {
                bio: bioRef,
              },
              { merge: true }
            );
          changeAlert("Successfully updated!");
      }
    };
        

    return (
      <>
        {alert ? (
          <Alert onClick={() => changeAlert("")} variant="success">
            <Alert.Heading>{alert}</Alert.Heading>
          </Alert>
        ) : null}
        <Container className={classes.container}>
          {!pageLoaded ? (
            <Row className={classes.row}>
              <Spinner className={classes.spinner} />
            </Row>
          ) : (
            <Form onSubmit={handleSubmit}>
              <h1>{displayNameRef}</h1>
              <img className={classes.profilePicture} src={displayImageRef} />
              <Form.Group>
                <Row>
                  <Form.Control
                    className={classes.imageSubmit}
                    onChange={handleChange}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </Row>
              </Form.Group>
              <Form.Group className={classes.bio}>
                <Form.Label>Bio</Form.Label>
                <textarea
                  value={bioRef}
                  onChange={changeBioRef}
                  type="text"
                />
              </Form.Group>
              <Button type="submit" >
                  Submit
              </Button>
            </Form>
          )}
        </Container>
      </>
    );
}

export default withStyles(styles)(EditUser);