import { useContext, useState, useEffect } from "react";
import { AuthenticatedContext } from "../contexts/AuthenticatedContext";
import { UpdatedUserContext } from "../contexts/UpdatedUserContext";
import { withStyles } from "@material-ui/core";
import { db } from "../firebase/Firebase";
import { Link } from "react-router-dom";

const styles = {
  navbar: {
    display: "flex",
    borderBottom: "0.01rem solid rgba(0, 0, 0, .3)",
    width: "50vw",
    height: "10vh",
    margin: "2rem auto",
    justifyContent: "space-around",
    alignItems: "center"
  },
  stories: {
    color: "gray"
  },
  profilePicture: {
    width: "4rem",
    height: "4rem",
    borderRadius: "100px",
    transition: ".6s all",
    "&:hover": {
      width: "4.72rem",
      height: "4.72rem"
    }
  },
  link: {
    fontSize: "1.5rem",
    transition: ".6s all",
    color: "black",
    "&:hover": {
      color: "black",
      fontSize: "2rem",
      textDecoration: "none"
    }
  },
  authentication: {
    display: "flex",
    justifyContent: "space-between",
    width: "16vw"
  },
  "@media (max-width: 1000px)": {
    link: {
      fontSize: "1rem",
      "&:hover": {
        color: "black",
        fontSize: "1.2rem",
        textDecoration: "none"
      }
    },
    navbar: {
      width: "80vw"
    },
    profilePicture: {
      width: "3rem",
      height: "3rem",
      "&:hover": {
        width: "3.7rem",
        height: "3.7rem"
      }
    },
    authentication: {
      width: "31vw",
      justifyContent: "space-between"
    }
  }
};

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
        changePhotoURL(photoURL);
        changeDisplayName(displayName);
      }
    };
    setNav();
  }, [user, updated]);

  return (
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
  );
}
export default withStyles(styles)(AppNav);
