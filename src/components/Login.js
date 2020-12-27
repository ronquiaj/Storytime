import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase/Firebase';
import { Card, Button, Form, Alert, Container } from 'react-bootstrap';
import useForm from '../hooks/useForm';
import { AuthenticatedContext } from '../contexts/AuthenticatedContext';

export default function Signin() {
    const [emailRef, changeEmailRef] = useForm("");
    const [passwordRef, changePasswordRef] = useForm("");
    const {user, updateUser} = useContext(AuthenticatedContext);
    const [alert, changeAlert] = useState("");
    const history = useHistory();
    const handleClick = e => {
        e.preventDefault();
            auth.signInWithEmailAndPassword(emailRef, passwordRef).then(() => {
                const currentUser = auth.currentUser;
                updateUser(currentUser);
                history.push('/');
                console.log("Successfully signed back in");
            }).catch(() => {
                changeAlert("Invalid password")
            });   

    };

    // Used to prevent signed in user from accessing this page
    useEffect(() => {
        if (user) {
            history.push('/');
        }
    }, [user]);

    return (
        <Container style={{maxWidth: "70vh", marginTop: "4rem"}}>
         {alert ? <Alert onClick={() => changeAlert("")} variant="danger"><Alert.Heading>{alert}</Alert.Heading></Alert> : null}
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log in</h2>
                    <Form onSubmit={handleClick}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={emailRef} onChange={changeEmailRef} type="email" required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={passwordRef} onChange={changePasswordRef} type="password" required />
                        </Form.Group>
                        <Button className="w-100" type="submit">Log in</Button>
                        <Form.Group style={{marginTop: "2rem", textAlign: "center" }}>
                            <Form.Label>Don't have an account? <Link to="/signup">Sign up</Link></Form.Label>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
            </div>
        </Container>
    )
}
