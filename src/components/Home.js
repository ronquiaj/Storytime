import { db } from '../firebase/Firebase';
import { useState, useEffect, useContext } from 'react';
import useForm from '../hooks/useForm'; 
import { withStyles } from '@material-ui/core';
import { Card, Button, Form, Container, Row, Col, Alert } from 'react-bootstrap'; 
import { Link, useHistory } from 'react-router-dom';
import { AuthenticatedContext } from '../contexts/AuthenticatedContext';
import Spinner from './Spinner';

const styles = {
  storyCard: {
    width: "25rem",
    margin: "3rem 1rem"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  titleLink: {
    color: "white"
  }
}

function Home(props) {
  const history = useHistory();
  const { classes } = props;
  const [ titleRef, changeTitleRef ] = useForm("");
  const [ textRef, changeTextRef ] = useForm("");
  const [ alert, changeAlert ] = useState("");
  const [ stories, changeStories ] = useState([]);
  const [ storyAdded, changeStoryAdded ] = useState(false);
  const [ loading, changeLoading ] = useState(true);
  const { user } = useContext(AuthenticatedContext);

  const handleSubmit = async e => {
    if (user) {
      e.preventDefault();
      const storiesRef = await db.collection('stories').doc(titleRef).get(); // Fetch the data for storiesref
      if (!storiesRef.exists) { 
        await db.collection('stories').doc(titleRef).set({
          title: titleRef,
          text: textRef,
          posts: []
        });
        changeStoryAdded(true);
        console.log("Add successful!");
      } else { // If there is an existing story with the same name
        changeAlert("There is already a story with that title");
      }
    } else history.push('/signup');
  
  };

  useEffect(() => {
    const fetchData = async () => {
      const storyRef = db.collection('stories');
      const storyData = await storyRef.get();
      const newStories = [];
      storyData.forEach(story => {
        const {text, title} = story.data();
        newStories.push(
          <Col>
            <Card className={classes.storyCard}>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>
                {text.length < 165 ? text : `${text.slice(0, 165)}...`}
              </Card.Text>
              <Button variant="primary"><Link className={classes.titleLink} to={`/stories/${title}`}>Visit this story</Link></Button>
            </Card.Body>
            </Card>
        </Col>
        )
      })
      changeStoryAdded(false);
      changeStories(newStories);
      changeLoading(false);
    };
    fetchData();
  }, [storyAdded]);

  return (
    <>
    {alert ? <Alert onClick={() => changeAlert("")} variant="danger"><Alert.Heading>{alert}</Alert.Heading></Alert> : null}
    <Container className={classes.container} fluid>
      <Row>
      {loading ? 
        <Spinner/>
        :
        stories}
      </Row>
    </Container>
  
  
  <Card>
    <Card.Body>
        <h2 className="text-center mb-4">Add new story</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control value={titleRef} onChange={changeTitleRef} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Beginning text</Form.Label>
                <Form.Control value={textRef} onChange={changeTextRef} required />
            </Form.Group>
            <Button className="w-100" type="submit">Add story</Button>
        </Form>
    </Card.Body>
 </Card>
  </>
  )
};

export default withStyles(styles)(Home);