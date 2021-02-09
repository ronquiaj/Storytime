const styles = {
  navbar: {
    display: "flex",
    borderBottom: "0.01rem solid rgba(0, 0, 0, .3)",
    width: "50vw",
    height: "10vh",
    margin: "0 auto",
    justifyContent: "space-around",
    alignItems: "center"
  },
  logo: {
    display: "flex",
    width: "15rem",
    height: "10rem",
    marginLeft: "2rem"
  },
  stories: {
    color: "gray"
  },
  profilePicture: {
    width: "4rem",
    height: "4rem",
    borderRadius: "100px",
    transition: ".6s all",
    "&:hover": {
      width: "4.72rem",
      height: "4.72rem"
    }
  },
  link: {
    fontSize: "1.5rem",
    transition: ".6s all",
    marginBottom: "1rem",
    color: "black",
    "&:hover": {
      color: "black",
      fontSize: "2rem",
      textDecoration: "none"
    },
    fontWeight: "400"
  },
  authentication: {
    display: "flex",
    justifyContent: "space-between",
    width: "16vw"
  },
  "@media (max-width: 1000px)": {
    link: {
      fontSize: "1rem",
      "&:hover": {
        color: "black",
        fontSize: "1.2rem",
        textDecoration: "none"
      }
    },
    logo: {
      margin: "2rem auto"
    },
    navbar: {
      width: "80vw"
    },
    profilePicture: {
      width: "3rem",
      height: "3rem",
      "&:hover": {
        width: "3.7rem",
        height: "3.7rem"
      }
    },
    authentication: {
      width: "31vw",
      justifyContent: "space-between"
    }
  }
};

export default styles;
