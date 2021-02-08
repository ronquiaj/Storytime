const archiveStyles = {
  storyCard: {
    width: "25rem",
    margin: "3rem 0"
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
      marginLeft: "2rem"
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
