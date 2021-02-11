import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/Firebase";
import useForm from "../hooks/useForm";
import { AuthenticatedContext } from "../contexts/AuthenticatedContext";
import LoginForm from "./LoginForm";
import styles from "../styles/loginStyles";
import { withStyles } from "@material-ui/core";
import { AlertContext } from "../contexts/AlertContext";

function Signin(props) {
  const { classes } = props;
  const [emailRef, changeEmailRef] = useForm("");
  const [passwordRef, changePasswordRef] = useForm("");
  const { user, updateUser } = useContext(AuthenticatedContext);
  const { openSnackbar, SnackbarAlert, setAlert, setAlertColor } = useContext(AlertContext);
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(emailRef, passwordRef)
      .then(() => {
        const currentUser = auth.currentUser;
        updateUser(currentUser);
        history.push("/");
        setAlertColor("success");
        setAlert(`Welcome back, ${currentUser.displayName}`);
        openSnackbar();
        console.log("Successfully signed back in");
      })
      .catch(() => {
        openSnackbar();
        setAlertColor("error");
        setAlert("Invalid password");
      });
  };

  // Used to prevent signed in user from accessing this page
  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <>
      <LoginForm
        classes={classes}
        handleClick={handleClick}
        emailRef={emailRef}
        changeEmailRef={changeEmailRef}
        passwordRef={passwordRef}
        changePasswordRef={changePasswordRef}
      />
      <SnackbarAlert />
    </>
  );
}

export default withStyles(styles)(Signin);
