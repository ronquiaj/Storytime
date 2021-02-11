import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useForm from "../hooks/useForm";
import { AuthenticatedContext } from "../contexts/AuthenticatedContext";
import { db, storage, auth } from "../firebase/Firebase";
import { withStyles } from "@material-ui/core";
import SignupForm from "./SignupForm";
import styles from "../styles/signupStyles";
import { AlertContext } from "../contexts/AlertContext";

function Signin(props) {
  const { classes } = props;
  const [emailRef, changeEmailRef] = useForm("");
  const [passwordRef, changePasswordRef] = useForm("");
  const [passwordConfirmationRef, changePasswordConfirmationRef] = useForm("");
  const [displayNameRef, changeDisplayNameRef] = useForm("");
  const [profilePictureRef, changeProfilePictureRef] = useState(
    "https://i.stack.imgur.com/l60Hf.png"
  );
  const { user, updateUser } = useContext(AuthenticatedContext);
  const { openSnackbar, setAlert, SnackbarAlert, setAlertColor } = useContext(AlertContext);
  const history = useHistory();

  // Used to prevent signed in user from accessing this page
  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  // Checks whether the password and password confirmation match
  const checkPassword = () => {
    if (passwordRef === passwordConfirmationRef) {
      return true;
    } else return false;
  };

  // Checks to see if the display name already exists within the database
  const checkName = async () => {
    const nameRef = db.collection("users").doc(displayNameRef);
    const doc = await nameRef.get();

    return doc.exists;
  };

  //Checks to see whether or not to include default image and then creates uesr profile and account
  const validatePictureAndAdd = async () => {
    // Add profile picture to google cloud storage
    if (profilePictureRef === "https://i.stack.imgur.com/l60Hf.png") {
      addUser(profilePictureRef);
    } else {
      await storage
        .ref(`/images/${displayNameRef}`)
        .put(profilePictureRef)
        .then(async () => {
          await storage
            .ref("images")
            .child(displayNameRef)
            .getDownloadURL()
            .then(async (url) => {
              addUser(url);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  const addUser = async (url) => {
    // Add to Firebase Authentication
    await auth
      .createUserWithEmailAndPassword(emailRef, passwordRef)
      .then(async () => {
        const currentUser = auth.currentUser;
        await currentUser
          .updateProfile({
            displayName: displayNameRef,
            photoURL: url
          })
          .catch((err) => {
            throw new Error(err);
          });
        const userData = {
          email: emailRef,
          displayName: displayNameRef,
          photoURL: url,
          password: passwordRef,
          bio: "This is where your bio would be!",
          winningPosts: 0,
          activePosts: 0
        };
        await db
          .collection("users")
          .doc(displayNameRef)
          .set(userData)
          .catch((err) => console.log(err));
        updateUser(userData); // Sets the Context of the user to the currently signed in user

        history.push("/");
        setAlert("Account successfully created!");
        setAlertColor("success");
        openSnackbar();
        console.log("Account successfully created!");
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/weak-password") {
          setAlert("Password must be at least 6 characters");
          setAlertColor("error");
          openSnackbar();
        } else {
          setAlert("That email has already been used");
          setAlertColor("error");
          openSnackbar();
        }
      });
  };

  // Checks to see if passwords match and if the display name hasn't already been taken
  const validateAndAdd = () => {
    if (checkPassword()) {
      checkName().then((val) => {
        if (!val) {
          // If the display name hasn't already been taken
          validatePictureAndAdd();
        } else {
          setAlert("That display name has been taken");
          setAlertColor("error");
          openSnackbar();
        }
      });
    } else {
      openSnackbar();
      setAlertColor("error");
      setAlert("Passwords don't match");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    validateAndAdd();
  };

  const handleChange = (e) => {
    changeProfilePictureRef(e.target.files[0]);
  };

  return (
    <>
      <SignupForm
        handleClick={handleClick}
        emailRef={emailRef}
        changeEmailRef={changeEmailRef}
        passwordRef={passwordRef}
        changePasswordRef={changePasswordRef}
        passwordConfirmationRef={passwordConfirmationRef}
        changePasswordConfirmationRef={changePasswordConfirmationRef}
        displayNameRef={displayNameRef}
        changeDisplayNameRef={changeDisplayNameRef}
        handleChange={handleChange}
        classes={classes}
      />
      <SnackbarAlert />
    </>
  );
}

export default withStyles(styles)(Signin);
