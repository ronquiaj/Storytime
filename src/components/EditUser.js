import { useState, useEffect, useContext } from 'react';
import { db, storage } from '../firebase/Firebase';
import { withStyles } from '@material-ui/core';
import { Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { AuthenticatedContext } from '../contexts/AuthenticatedContext';
import { UpdatedUserContext } from "../contexts/UpdatedUserContext";
import styles from '../styles/editUserStyles';
import EditUserForm from './EditUserForn';

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
    const { userUpdated } = useContext(UpdatedUserContext);
    const [ alert, changeAlert ] = useState("");

    const handleChange = e => {
        const image = e.target.files[0];
        changeProfilePictureRef(image);
        changeDisplayImageRef(URL.createObjectURL(image));
    };

    useEffect(() => {
      const fetchData = async () => {
        const userData = await db.collection("users").doc(pageUser).get();
        const { displayName, photoURL, bio } = userData.data();
        changeDisplayImageRef(photoURL);
        changeDisplayNameRef(displayName);
        initialBioRef(bio);
        if (!user || user.displayName !== displayName) {
          history.push("/error");
        } else {
          changePageLoaded(true);
        }
      };
      fetchData();
    }, []);

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
                    userUpdated();
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
        <EditUserForm classes={classes} pageLoaded={pageLoaded} handleSubmit={handleSubmit} displayNameRef={displayNameRef} displayImageRef={displayImageRef} handleChange={handleChange} bioRef={bioRef} changeBioRef={changeBioRef}/>
      </>
    );
}

export default withStyles(styles)(EditUser);