const styles = {
  container: {
    display: "flex",
    width: "100%",
    height: "8rem",
    margin: "0.7rem 0",
    alignItems: "center",
    justifyContent: "space-around",
    webkitBoxShadow: "7px 7px 63px -28px rgba(0,0,0,0.37)",
    mozBoxShadow: "7px 7px 63px -28px rgba(0,0,0,0.37)",
    boxShadow: "7px 7px 63px -28px rgba(0,0,0,0.37)",
    backgroundColor: "white",
    borderRadius: "20px"
  },
  user: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    margin: "1rem auto 0 0"
  },
  image: {
    width: "5.5rem",
    height: "5rem"
  },
  text: {
    fontSize: "1.5rem",
    width: "100%"
  },
  arrow: {
    display: "flex",
    margin: "0 0.5rem",
    fontSize: "1.5rem",
    cursor: "pointer",
    transition: ".5s all"
  },
  arrowDown: {
    "&:hover": {
      color: "red"
    }
  },
  arrowUp: {
    "&:hover": {
      color: "lightgreen"
    }
  },
  arrowContainer: {
    marginLeft: "8rem",
    display: "flex"
  },
  "@media (max-width: 1024px)": {
    text: {
      fontSize: "0.84rem"
    },
    arrowContainer: {
      marginLeft: "0"
    }
  }
};

export default styles;
