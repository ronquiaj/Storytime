const archiveStyles = {
  storyCard: {
    opacity: "0.8",
    borderRadius: "30px",
    backgroundColor: "white",
    padding: 0,
    width: "30vw",
    webkitBoxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
    mozBoxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
    animation: "fade-in .7s"
  },
  "@global": {
    "@keyframes fade-in": {
      "0%": {
        opacity: "0"
      },
      "100%": {
        opacity: "1"
      }
    }
  },
  titleLink: {
    color: "white"
  },
  button: {
    transition: "0.6s all",
    "&:hover a": {
      textDecoration: "none",
      color: "white",
      margin: 0
    },
    "&:hover": {
      width: "11rem",
      height: "3.3rem",
      margin: 0
    }
  },
  submit: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
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
    justifyContent: "space-around",
    margin: "2rem",
    flexFlow: "row wrap"
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
