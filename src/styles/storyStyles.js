import archiveStyles from "./archivedStoryStyles";
const styles = {
  ...archiveStyles,
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    margin: "2rem 0",
    textAlign: "center",
    fontWeight: 400
  },
  post: {
    margin: "2.5rem 0"
  },
  postContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    marginTop: "1.5rem"
  },
  roundContainer: {
    padding: 0,
    marginBottom: "2rem",
    width: "50vw",
    margin: "0 auto",
    webkitBoxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
    mozBoxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset"
  },
  rounds: {
    textAlign: "center"
  },
  seconds: {
    textAlign: "center"
  },
  archive: {
    marginTop: "3rem"
  },
  "@media (max-width: 1000px)": {
    "@global": {
      ".effect7": {
        width: "85vw"
      }
    }
  }
};

export default styles;
