const styles = {
   container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    margin: "2rem 0",
    textAlign: "center",
    fontWeight: 400
  },
  "@global": {
    ".effect7": {
      display: "flex",
      width: "100vh",
      height: "20rem",
      position: "relative",
      webkitBoxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
      mozBoxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
      boxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
      padding: "1rem"
    }
  },
  text: {
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0)",
    border: "none",
    resize: "none",
    color: "black",
    fontWeight: 100,
    fontSize: "1.105rem"
  }
};

export default styles;