import { useContext } from 'react';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { AuthenticatedContext } from '../contexts/AuthenticatedContext';
import { withStyles } from '@material-ui/core';
import { auth } from '../firebase/Firebase';
import { Link } from 'react-router-dom';

const styles = {
    profilePicture: {
        width: "2.5rem",
        height: "3rem"
    },
    navbar: {
        display: "flex",
        justifyContent: "center",
    },
    userInfo: {
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "1rem"
    },
    navItem: {
        fontSize: "0.955rem",
    },
    collapse: {
        
    }

}

function AppNav(props) {
    const { user, updateUser } = useContext(AuthenticatedContext);
    const { classes } = props;

    const handleSignout = () => {
        auth.signOut().then(() => {
            updateUser(null);
            console.log("Successfully signed out...");
        }).catch(err => {
            console.log(`There was an error logging you out, ${err}`)
        })
    };

    return (
            <Navbar collapseOnSelect className={classes.navbar} bg="dark" variant="dark" expand="sm">
                <Navbar.Brand style={{marginLeft: "1rem"}} as={Link} to="/">Storytime</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className={classes.collapse}>
                    <Nav style={{width: "100%"}}>
                        {
                            
                            user ? 
                                <div className={classes.userInfo}>
                                    <Navbar.Brand eventKey="1" className={classes.navItem} onClick={handleSignout}><Button>Sign Out</Button></Navbar.Brand> 
                                    <Navbar.Brand className={classes.navItem}>Welcome back, {user.displayName}</Navbar.Brand>  
                                    <img alt="profile" className={classes.profilePicture} src={user.photoURL}/>
                                </div>
                            : 
                                <>
                                    <Nav.Link eventKey="2" as={Link} to="/signup">Sign Up</Nav.Link> 
                                    <Nav.Link eventKey="3" as={Link} to="/login">Log in</Nav.Link>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
    )
}
export default withStyles(styles)(AppNav);