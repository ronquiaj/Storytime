import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Card, Button, Form, Alert, Container } from 'react-bootstrap';
import useForm from '../hooks/useForm';
import { AuthenticatedContext } from '../contexts/AuthenticatedContext';
import { db, storage, auth } from '../firebase/Firebase';

export default function Signin() {
    const [ emailRef, changeEmailRef ] = useForm("");
    const [ passwordRef, changePasswordRef ] = useForm("");
    const [ passwordConfirmationRef, changePasswordConfirmationRef ] = useForm("");
    const [ displayNameRef, changeDisplayNameRef ] = useForm("");
    const [ profilePictureRef, changeProfilePictureRef ] = useState("");
    const { user, updateUser } = useContext(AuthenticatedContext);
    const [ alert, changeAlert ] = useState("");
    const history = useHistory();

       // Used to prevent signed in user from accessing this page
       useEffect(() => {
        if (user) {
            history.push('/');
        }
    }, [user]);

    // Checks whether the password and password confirmation match
    const checkPassword = () => {
        if (passwordRef === passwordConfirmationRef) {
            return true;
        } else return false;
    }

    // Checks to see if the display name already exists within the database
    const checkName = async () => {
        const nameRef = db.collection('users').doc(displayNameRef);
        const doc = await nameRef.get();
            
        return doc.exists;
    }

    const addUser = async () => {
        // Add profile picture to google cloud storage
        await storage.ref(`/images/${displayNameRef}`).put(profilePictureRef).then(async () => {
            await storage.ref('images').child(displayNameRef).getDownloadURL().then(async (url) => {
                   // Add to Firebase Authentication
                    await auth.createUserWithEmailAndPassword(emailRef, passwordRef).then(async () => {
                        const currentUser = auth.currentUser;
                        await currentUser.updateProfile({
                            displayName: displayNameRef,
                            photoURL: url
                        }).catch(err => {throw new Error(err)});
                        const userData = {
                          email: emailRef,
                          displayName: displayNameRef,
                          photoURL: url,
                          password: passwordRef,
                          bio: "This is where your bio would be!",
                          winningPosts: 0,
                        };     
                        await db.collection('users').doc(displayNameRef).set(userData).catch(err => console.log(err));
                        updateUser(userData); // Sets the Context of the user to the currently signed in user

                        history.push('/');
                        console.log("Account successfully created!");
                    }).catch(() => changeAlert("That email is already being used"));
                        }).catch(err => console.log(err));
        }).catch(err => console.log(err));
     
    }

    const validateAndAdd = () => {
        if (checkPassword()) {
            checkName().then(val => {
                if (!val) { // If the display name hasn't already been taken
                    addUser();
                } else changeAlert("That display name has been taken")
            });
        } else {
            changeAlert("Passwords don't match");
        } 
    }

    const handleClick = e => {
        e.preventDefault();
        validateAndAdd();
    };

    const handleChange = e => {
        changeProfilePictureRef(e.target.files[0]);
    };

    return (
        <Container style={{maxWidth: "70vh", marginTop: "4rem"}}>
        {alert ? <Alert onClick={() => changeAlert("")} variant="danger"><Alert.Heading>{alert}</Alert.Heading></Alert> : null}
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <Form onSubmit={handleClick}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={emailRef} onChange={changeEmailRef} type="email" required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={passwordRef} onChange={changePasswordRef} type="password" required />
                        </Form.Group>
                        <Form.Group id="passwordConfirm">
                            <Form.Label>Password confirmation</Form.Label>
                            <Form.Control value={passwordConfirmationRef} onChange={changePasswordConfirmationRef} type="password" required />
                        </Form.Group>
                        <Form.Group id="displayName">
                            <Form.Label>Display Name</Form.Label>
                            <Form.Control maxLength="12" value={displayNameRef} onChange={changeDisplayNameRef} type="text" required />
                        </Form.Group>
                        <Form.Group id="profilePictureRef">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control onChange={handleChange} type="file" accept="image/png, image/jpeg, image/jpg" required />
                        </Form.Group>
                        <Button className="w-100" type="submit">Sign Up</Button>
                        <Form.Group style={{marginTop: "2rem", textAlign: "center" }}>
                            <Form.Label>Already have an account? <Link to="/login">Log in</Link></Form.Label>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
            </div>
        </Container>
    )
}
