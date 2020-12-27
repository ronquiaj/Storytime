import firebase from 'firebase/app';
import 'firebase/firestore';
import { useEffect, useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { db } from '../firebase/Firebase';
import { AuthenticatedContext } from '../contexts/AuthenticatedContext';
import useForm from '../hooks/useForm';
import Post from './Post';
import Spinner from './Spinner';


const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        margin: "2rem 0",
        textAlign: "center",
    },
    '@global': {
        '.effect7': {
            display: "flex",
            width: "100vh",
            height: "20rem",
            position: 'relative',
            webkitBoxShadow: '0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset',
            mozBoxShadow: '0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset',
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
    },  
    post: {
        margin: "2.5rem 0"
    },
    postContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        marginTop: "2rem"
    },
    '@media (max-width: 748px)': {
        '@global': {
            '.effect7': {
                display: "flex",
                width: "48vh",
                }
    }
}
}



function Story(props) {
    const history = useHistory();
    const { title } = props.match.params;
    const { classes } = props;
    const { user } = useContext(AuthenticatedContext);
    const [ loading, changeLoading ] = useState(true);
    const [ displayText, changeText ] = useState("");
    const [ posts, changePosts ] = useState([]);
    const [ postAdded, changePostAdded ] = useState(false);
    const [ newPost, changeNewPost ] = useForm("");

    // Click handler for adding a new post to the story
    const handleClick = async e => {
        if (user) {
            e.preventDefault();
            const storyRef = db.collection('stories').doc(title);
            const post = {
                owner: {
                    photoURL: user.photoURL,   
                    username: user.displayName
                },
                text: newPost,
                votes: 0
            }
            await storyRef.update({
                posts: firebase.firestore.FieldValue.arrayUnion(post)
            }).then(() => {console.log("Post successfully added!"); changePostAdded(true)}).catch(err => console.log(err));
        } else history.push('/signup')
       
    }


    // Useeffect for fetching story and post data
    useEffect(() => {
        const fetchData = async () => {
            const storyRef = db.collection('stories').doc(title);
            const storyData = await storyRef.get();
            if (storyData.exists) {
                const { posts, text } = storyData.data();
                changeLoading(false);
                // Get all the posts from the database for this particular story
                if (posts.length > 0) {
                    const newPosts = posts.map(post => <Post {...post} />);
                    changePosts(newPosts);
                }
                changeText(text);
                changePostAdded(false);
            } else history.push("/error");
        };
        fetchData();
    }, [postAdded]);

    return (
        <>
             <Container className={classes.container}>
            {loading ? 
            <Spinner />
            :
                <>
                <div>
                    <h1 className={classes.title}>{title}</h1>
                    
                    <div className="box effect7">
                        <textarea disabled="yes" className={classes.text} value={displayText}/>
                    </div>
                </div>
                
                <ul className={classes.postContainer}>
                    {posts}
                </ul>

                <Form onSubmit={handleClick} className={classes.post}>
                            <Form.Group>
                                <Form.Label>New post</Form.Label>
                                <Form.Control maxLength="90" value={newPost} onChange={changeNewPost} type="text" required />
                            </Form.Group>
                            <Button className="w-100" type="submit">Post</Button>
                </Form>
                </>
            }
             </Container>
        
        </>
    )
}

export default withStyles(styles)(Story);
