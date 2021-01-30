import { useContext, useState, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { AuthenticatedContext } from "../contexts/AuthenticatedContext";
import { UpdatedUserContext } from "../contexts/UpdatedUserContext";
import { withStyles } from "@material-ui/core";
import { auth, db } from "../firebase/Firebase";
import { Link, useHistory } from "react-router-dom";

const styles = {
  profilePicture: {
    width: "2.5rem",
    height: "3rem"
  },
  navbar: {
    display: "flex",
    justifyContent: "center"
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "1rem"
  },
  navItem: {
    fontSize: "0.955rem"
  }
};

function AppNav(props) {
  const { user, updateUser } = useContext(AuthenticatedContext);
  const { updated } = useContext(UpdatedUserContext);
  const { classes } = props;
  const history = useHistory();
  const [displayNameRef, changeDisplayName] = useState("");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, updated]);

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

  return (
    <Navbar collapseOnSelect className={classes.navbar} bg='dark' variant='dark' expand='sm'>
      <Navbar.Brand style={{ marginLeft: "1rem" }} as={Link} to='/'>
        Storytime
      </Navbar.Brand>
      <Navbar.Brand style={{ marginLeft: "1rem" }} as={Link} to='/archive'>
        Archive
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className={classes.collapse}>
        <Nav style={{ width: "100%" }}>
          {user ? (
            <div className={classes.userInfo}>
              <Navbar.Brand className={classes.navItem} onClick={handleSignout}>
                <Button>Sign Out</Button>
              </Navbar.Brand>
              <Navbar.Brand className={classes.navItem}>
                Welcome back, {displayNameRef}
              </Navbar.Brand>
              <Link to={`/users/${displayNameRef}/edit`}>
                <img alt='profile' className={classes.profilePicture} src={photoURLRef} />
              </Link>
            </div>
          ) : (
            <>
              <Nav.Link as={Link} to='/signup'>
                Sign Up
              </Nav.Link>
              <Nav.Link as={Link} to='/login'>
                Log in
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default withStyles(styles)(AppNav);
