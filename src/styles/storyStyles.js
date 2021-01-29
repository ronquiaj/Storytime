const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: "2rem 0",
    textAlign: "center",
    fontWeight: 400,
  },
  "@global": {
    ".effect7": {
      display: "flex",
      width: "100vh",
      height: "20rem",
      position: "relative",
      webkitBoxShadow:
        "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
      mozBoxShadow:
        "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
      boxShadow:
        "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
      padding: "1rem",
    },
  },
  text: {
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0)",
    border: "none",
    resize: "none",
    color: "black",
    fontWeight: 100,
    fontSize: "1.105rem",
  },
  post: {
    margin: "2.5rem 0",
  },
  postContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  roundContainer: {
    padding: 0,
    marginBottom: "2rem",
    width: "50vh",
    margin: "0 auto",
    webkitBoxShadow:
      "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
    mozBoxShadow:
      "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
    boxShadow:
      "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
  },
  rounds: {
    textAlign: "center",
  },
  seconds: {
    textAlign: "center",
  },
  archive: {
    marginTop: "3rem",
  },
  "@media (max-width: 748px)": {
    "@global": {
      ".effect7": {
        display: "flex",
        width: "48vh",
      },
    },
  },
};

export default styles;