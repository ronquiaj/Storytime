import { useContext, useState, useEffect } from "react";
import { AuthenticatedContext } from "../contexts/AuthenticatedContext";
import { UpdatedUserContext } from "../contexts/UpdatedUserContext";
import { withStyles } from "@material-ui/core";
import { db } from "../firebase/Firebase";
import { Link } from "react-router-dom";
import styles from "../styles/appNavStyles";
import "../styles/bg.css";

function AppNav(props) {
  const { user } = useContext(AuthenticatedContext);
  const { updated } = useContext(UpdatedUserContext);
  const { classes } = props;
  const [, changeDisplayName] = useState("");
  const [photoURLRef, changePhotoURL] = useState("");

  useEffect(() => {
    const setNav = async () => {
      if (user && user.displayName) {
        const userDataRef = await db.collection("users").doc(user.displayName).get();
        const { displayName, photoURL } = userDataRef.data();
        changeDisplayName(displayName);
      }
    };
    setNav();
  }, [user, updated]);

  return (
    <div className={classes.container}>
      <img
        className={classes.logo}
        src='https://firebasestorage.googleapis.com/v0/b/storytime-7f96d.appspot.com/o/logo.png?alt=media&token=14f37c87-6341-4933-acca-d3bcab8912a4'
      />
      <div className={classes.navbar}>
        <Link to='/' className={`${classes.stories} ${classes.link} `}>
          Stories
        </Link>
        <Link to='/archive' className={`${classes.archive} ${classes.link}`}>
          Archive
        </Link>

        {!user ? (
          <div className={classes.authentication}>
            <Link to='/signup' className={`${classes.signup} ${classes.link}`}>
              Sign Up
            </Link>
            <Link to='/login' className={`${classes.login} ${classes.link}`}>
              Log in
            </Link>
          </div>
        ) : (
          <div className={classes.user}>
            <Link to={`/users/${user.displayName}/edit`}>
              <img
                alt='profile'
                className={`${classes.profilePicture} ${classes.link}`}
                src={photoURLRef}
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
export default withStyles(styles)(AppNav);
