import { useState, useEffect, useContext } from "react";
import { AuthenticatedContext } from "../contexts/AuthenticatedContext";
import { UpdatedUserContext } from "../contexts/UpdatedUserContext";
import { useHistory } from "react-router-dom";
import { db, storage, auth } from "../firebase/Firebase";
import { withStyles } from "@material-ui/core";
import Spinner from "./Spinner";
import UserDisplay from "./UserDisplay";
import useForm from "../hooks/useForm";
import styles from "../styles/userDisplayStyles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function User(props) {
  const history = useHistory();
  const [userData, changeUserData] = useState(null);
  const { classes } = props;
  const { user: pageUser } = props.match.params;
  const [profilePictureRef, changeProfilePictureRef] = useState("");
  const [bioRef, changeBioRef, , initialBioRef] = useForm("");
  const [displayNameRef, changeDisplayNameRef] = useState("");
  const [displayImageRef, changeDisplayImageRef] = useState("");
  const [winningPostsRef, changeWinningPosts] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const [pageLoaded, changePageLoaded] = useState(false);
  const { user, updateUser } = useContext(AuthenticatedContext);
  const { userUpdated } = useContext(UpdatedUserContext);
  const [open, setOpen] = useState(false);
  const [alert, changeAlert] = useState("");

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignout = () => {
    auth
      .signOut()
      .then(() => {
        updateUser(null);
        history.push("/");
        console.log("Successfully signed out...");
      })
      .catch((err) => {
        console.log(`There was an error logging you out, ${err}`);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hello");
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
                        photoURL: url || user.photoURL
                      },
                      { merge: true }
                    );
                  userUpdated();
                });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log("Error deleting picture", err);
        });
    } else {
      db.collection("users").doc(user.displayName).set(
        {
          bio: bioRef
        },
        { merge: true }
      );
    }
    changeAlert("Successfully updated!");
    setOpen(true);
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    changeProfilePictureRef(image);
    changeDisplayImageRef(URL.createObjectURL(image));
    console.log(profilePictureRef);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userData = await db.collection("users").doc(pageUser).get();
        if (!userData) {
          history.push("/error");
        } else {
          const { displayName, photoURL, bio, winningPosts } = userData.data();
          changeDisplayImageRef(photoURL);
          changeDisplayNameRef(displayName);
          changeWinningPosts(winningPosts);
          initialBioRef(bio);
          if (user.displayName === displayName) setCanEdit(true); // if current user equal to this users page, can edit should be true
          changePageLoaded(true);
        }
      }
    };
    fetchData();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.spinner}>
      {pageLoaded ? (
        <UserDisplay
          {...userData}
          classes={classes}
          bioRef={bioRef}
          displayNameRef={displayNameRef}
          winningPostsRef={winningPostsRef}
          changeBioRef={changeBioRef}
          displayImageRef={displayImageRef}
          changeUserData={changeUserData}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
          canEdit={canEdit}
          handleSignout={handleSignout}
        />
      ) : (
        <Spinner />
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success'>
          {alert}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default withStyles(styles)(User);
