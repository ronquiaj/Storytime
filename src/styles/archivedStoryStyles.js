const archiveStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto"
  },
  title: {
    margin: "2rem 0",
    textAlign: "center",
    fontWeight: 400
  },
  "@global": {
    ".effect7": {
      backgroundColor: "white",
      display: "flex",
      width: "60vw",
      height: "20rem",
      position: "relative",
      webkitBoxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
      mozBoxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
      boxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
      padding: "1rem"
    }
  },
  text: {
    width: "100vw",
    height: "100%",
    background: "rgba(0, 0, 0, 0)",
    border: "none",
    resize: "none",
    color: "black",
    fontWeight: 400,
    fontSize: "1.105rem",
    overflowY: "scroll"
  },
  "@media (max-width: 1000px)": {
    "@global": {
      ".effect7": {
        width: "90vw"
      }
    },
    container: {
      margin: "1rem auto"
    }
  }
};

export default archiveStyles;
