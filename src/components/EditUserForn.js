import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Container, Button, Row } from "react-bootstrap";
import { auth } from "../firebase/Firebase";
import { AuthenticatedContext } from "../contexts/AuthenticatedContext";
import Spinner from "./Spinner";

export default function EditUserForn(props) {
  const {
    classes,
    pageLoaded,
    handleSubmit,
    displayNameRef,
    displayImageRef,
    handleChange,
    bioRef,
    changeBioRef
  } = props;

  const { user, updateUser } = useContext(AuthenticatedContext);
  const history = useHistory();

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
    <Container className={classes.container}>
      {!pageLoaded ? (
        <Row className={classes.row}>
          <Spinner className={classes.spinner} />
        </Row>
      ) : (
        <Form onSubmit={handleSubmit}>
          <h1 onClick={handleSignout}>Signout</h1>
          <h1>{displayNameRef}</h1>
          <img alt='profile' className={classes.profilePicture} src={displayImageRef} />
          <Form.Group>
            <Row>
              <Form.Control
                className={classes.imageSubmit}
                onChange={handleChange}
                type='file'
                accept='image/png, image/jpeg, image/jpg'
              />
            </Row>
          </Form.Group>
          <Form.Group className={classes.bio}>
            <Form.Label>Bio</Form.Label>
            <textarea value={bioRef} onChange={changeBioRef} type='text' />
          </Form.Group>
          <Button type='submit'>Submit</Button>
        </Form>
      )}
    </Container>
  );
}
