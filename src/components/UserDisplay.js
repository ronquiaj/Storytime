import { Form, Button } from "react-bootstrap";

function UserDisplay(props) {
  const {
    classes,
    displayNameRef,
    displayImageRef,
    bioRef,
    winningPostsRef,
    canEdit,
    handleSubmit,
    changeBioRef,
    handleSignout,
    handleImageChange
  } = props;

  return (
    <div className={classes.container}>
      <div className={classes.paper}>
        <div className={classes.name}>{displayNameRef}</div>
        <img alt='profile pic' className={classes.profilePicture} src={displayImageRef} />
        <div className={classes.bio}>{bioRef}</div>
        <div className={classes.footer}>
          <div className={classes.winningPosts}>
            Winning posts: <span className={classes.winningPostNum}>{winningPostsRef}</span>
          </div>
        </div>
      </div>

      {canEdit ? (
        <Form onSubmit={handleSubmit} className={classes.editUserForm}>
          <div className={classes.changers}>
            <Form.Group className={classes.imageSubmit}>
              <Form.Label>Change profile picture</Form.Label>
              <Form.Control
                onChange={handleImageChange}
                type='file'
                accept='image/png, image/jpeg, image/jpg'
              />
            </Form.Group>
            <Form.Group className={classes.bioSubmit}>
              <Form.Label>Change bio</Form.Label>
              <textarea value={bioRef} onChange={changeBioRef} type='text' maxLength='75' />
            </Form.Group>
          </div>
          <div className={classes.buttons}>
            <Button variant='secondary' className={classes.signoutButton} onClick={handleSignout}>
              Signout
            </Button>
            <Button className={classes.submitButton} type='submit'>
              Update profile
            </Button>
          </div>
        </Form>
      ) : null}
    </div>
  );
}

export default UserDisplay;
