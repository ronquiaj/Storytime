import { withStyles } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
        boxShadow: "7px 7px 63px -28px rgba(0,0,0,0.37)"
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
    },
    arrowContainer: {
        marginLeft: "8rem",
        display: "flex"
    },
    '@media (max-width: 1024px)': {
        text: {
            fontSize: "0.84rem"
        },
        arrowContainer: {
            marginLeft: "0"
        }
}
}

function Post(props) {
    const { classes, text, votes } = props;
    const { photoURL, username } = props.owner;

    return (
        <Row className={classes.container}>
            <Col>
                <div className={classes.user}>
                    <img className={classes.image} src={photoURL}/>
                    <Link to={`/users/${username}`}><h4 style={{fontSize: "0.7rem"}}>{username}</h4></Link>
                </div>
            </Col>
            <Col>
                <h4 className={classes.text}>{text}</h4>
            </Col>
            <Col>
                <div className={classes.arrowContainer}> 
                    <i className={`fas fa-arrow-up ${classes.arrow}`}></i>
                    {votes}
                    <i className={`fas fa-arrow-down ${classes.arrow}`}></i>
                </div>
            </Col>
        </Row>
    )
}

export default withStyles(styles)(Post);