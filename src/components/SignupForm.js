import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Form, Alert, Container } from "react-bootstrap";

export default function SignupForm(props) {
  const {
    changeAlert,
    handleClick,
    emailRef,
    changeEmailRef,
    passwordRef,
    changePasswordRef,
    passwordConfirmationRef,
    changePasswordConfirmationRef,
    displayNameRef,
    changeDisplayNameRef,
    handleChange,
    alert,
    classes
  } = props;
  return (
    <Container style={{ maxWidth: "70vh", marginTop: "4rem" }}>
      {alert ? (
        <Alert onClick={() => changeAlert("")} variant='danger'>
          <Alert.Heading>{alert}</Alert.Heading>
        </Alert>
      ) : null}
      <Card className={classes.signupForm}>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          <Form onSubmit={handleClick}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control value={emailRef} onChange={changeEmailRef} type='email' required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={passwordRef}
                onChange={changePasswordRef}
                type='password'
                required
              />
            </Form.Group>
            <Form.Group id='passwordConfirm'>
              <Form.Label>Password confirmation</Form.Label>
              <Form.Control
                value={passwordConfirmationRef}
                onChange={changePasswordConfirmationRef}
                type='password'
                required
              />
            </Form.Group>
            <Form.Group id='displayName'>
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                maxLength='12'
                value={displayNameRef}
                onChange={changeDisplayNameRef}
                type='text'
                required
              />
            </Form.Group>
            <Form.Group id='profilePictureRef'>
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                onChange={handleChange}
                type='file'
                accept='image/png, image/jpeg, image/jpg'
                required
              />
            </Form.Group>
            <Button className='w-100' type='submit'>
              Sign Up
            </Button>
            <Form.Group style={{ marginTop: "2rem", textAlign: "center" }}>
              <Form.Label>
                Already have an account? <Link to='/login'>Log in</Link>
              </Form.Label>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'></div>
    </Container>
  );
}
