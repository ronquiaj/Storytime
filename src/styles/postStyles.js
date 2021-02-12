const styles = {
  container: {
    display: "flex",
    width: "75vw",
    height: "8rem",
    webkitBoxShadow: "7px 7px 63px -28px rgba(0,0,0,0.37)",
    mozBoxShadow: "7px 7px 63px -28px rgba(0,0,0,0.37)",
    boxShadow: "7px 7px 63px -28px rgba(0,0,0,0.37)",
    backgroundColor: "white",
    borderRadius: "20px",
    marginTop: "2rem",
    alignItems: "center",
    justifyContent: "space-around",
    textAlign: "center",
    marginRight: "3rem",
    animation: "fade-in 0.7s"
  },
  "@global": {
    "@keyframes fade-in": {
      "0%": {
        position: "absolute",
        transform: "translateX(-20vw)",
        opacity: "0"
      },
      "100%": {
        opacity: "1"
      }
    }
  },
  image: {
    width: "5.5rem",
    height: "5rem",
    marginTop: "1rem"
  },
  text: {
    fontSize: "1.5rem",
    width: "50vw",
    marginLeft: "1rem"
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
    display: "flex"
  },
  "@media (max-width: 1025px)": {
    container: {
      width: "95vw"
    },
    text: {
      fontSize: "0.9rem"
    },
    image: {
      marginLeft: "0.2rem"
    }
  }
};

export default styles;
