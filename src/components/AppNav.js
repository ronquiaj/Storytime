import { useContext } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AuthenticatedContext } from '../contexts/AuthenticatedContext';
import { withStyles } from '@material-ui/core';
import { auth } from '../firebase/Firebase';

const styles = {
    navLink: {
        margin: '1rem'
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
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Storytime</Navbar.Brand>
            <Navbar.Brand><img src={user && user.photoURL}/></Navbar.Brand>
            <Nav className="mr-auto">
                <NavLink className={classes.navLink} to="/">Home</NavLink>
                {
                    user ? <><Navbar.Brand>Welcome back, {user.displayName}</Navbar.Brand>  <Navbar.Brand onClick={handleSignout}>Sign Out</Navbar.Brand> </>: 
                    <>
                        <NavLink className={classes.navLink} to="/signup">Sign Up</NavLink> 
                        <NavLink className={classes.navLink} to="/login">Log in</NavLink>
                    </>
                }
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
            </Form>
        </Navbar>
    )
}
export default withStyles(styles)(AppNav);