import React, { useState } from 'react'
import { auth } from '../firebase/Firebase';
import { Card, Button, Form } from 'react-bootstrap';
import useForm from '../hooks/useForm';

export default function Signin() {
    const [currentUser, changeCurrentUser] = useState();
    const [emailRef, changeEmailRef] = useForm("");
    const [passwordRef, changePasswordRef] = useForm("");
    const [passwordConfirmationRef, changePasswordConfirmationRef] = useForm("");

    const handleClick = e => {
        e.preventDefault();
        if (passwordRef === passwordConfirmationRef) {
            auth.createUserWithEmailAndPassword(emailRef, passwordRef).then(() => {
                const user = auth.currentUser;
                user.updateProfile({
                    displayName: user.email.slice(0, 3),
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                  }).then(() => {
                      changeCurrentUser(user.displayName);
                  });
            }).catch(err => {
                throw new Error(err);
            })
        }

    };

    return (
        <>
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
                        <Button className="w-100" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                {currentUser}
            </div>
        </>
    )
}
