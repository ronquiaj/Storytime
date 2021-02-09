const styles = {
  spinner: {
    display: "flex",
    justifyContent: "center"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    margin: "2rem auto"
  },
  paper: {
    webkitBoxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
    mozBoxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
    backgroundColor: "white",
    width: "50vw",
    height: "80vh",
    margin: "0 auto",
    borderRadius: "20px"
  },
  profilePicture: {
    width: "45%",
    margin: "0 auto",
    height: "45%"
  },
  name: {
    marginBottom: "1rem",
    marginTop: "1rem",
    fontWeight: "400",
    fontSize: "3rem"
  },
  bio: {
    margin: "3rem",
    fontSize: "1.8rem",
    height: "10%",
    width: "90%"
  },
  winningPosts: {
    fontSize: "2rem"
  },
  winningPostNum: {
    fontWeight: "400",
    height: "10%"
  },
  editUserForm: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    webkitBoxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
    mozBoxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
    backgroundColor: "white",
    marginTop: "2rem",
    borderRadius: "20px",
    padding: "1rem"
  },
  imageSubmit: {
    margin: "1rem auto"
  },
  signoutButton: {
    backgroundColor: "red",
    color: "white",
    width: "50%"
  },
  submitButton: {
    width: "50%"
  },
  changers: {
    display: "flex"
  },
  bioSubmit: {
    marginTop: "1rem",
    marginRight: "3rem",
    display: "flex",
    flexDirection: "column"
  },
  "@media (max-width: 1000px)": {
    paper: {
      width: "80vw"
    },
    bio: {
      width: "100%",
      fontSize: "1.3rem",
      margin: "2rem auto"
    },
    profilePicture: {
      width: "60%"
    },
    bioSubmit: {
      marginLeft: "1rem"
    }
  }
};

export default styles;
