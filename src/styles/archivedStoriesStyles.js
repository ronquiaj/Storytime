const archiveStyles = {
  storyCard: {
    margin: "3rem 0",
    opacity: "0.8",
    borderRadius: "30px",
    backgroundColor: "white",
    padding: 0,
    marginBottom: "2rem",
    width: "30vw",
    webkitBoxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
    mozBoxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset"
  },
  titleLink: {
    color: "white"
  },
  submit: {
    width: "100%"
  },
  container: {
    display: "flex",
    justifyContent: "center"
  },
  noArchivedPosts: {
    marginTop: "3rem"
  },
  emoji: {
    display: "flex",
    fontSize: "1.80rem",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    cursor: "pointer"
  },
  archiveContainer: {
    display: "flex",
    alignItems: "center",
    flexFlow: "row wrap",
    marginLeft: "3.8rem"
  },
  "@media (min-width: 768px)": {
    storyCard: {
      width: "22rem",
      margin: "3rem 0"
    },
    button: {
      height: "3rem",
      padding: "0.2rem",
      width: "10rem"
    }
  },
  "@media (max-width: 820px)": {
    archiveContainer: {
      marginLeft: "1.6rem"
    },
    storyCard: {
      width: "80vw",
      margin: "3rem 0",
      padding: "0.7rem"
    },
    button: {
      height: "3rem",
      padding: "0.2rem",
      width: "10rem"
    }
  }
};

export default archiveStyles;
