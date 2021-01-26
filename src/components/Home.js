import { db } from '../firebase/Firebase';
import { useState, useEffect, useContext } from 'react';
import useForm from '../hooks/useForm'; 
import { withStyles } from '@material-ui/core';
import { Alert } from 'react-bootstrap'; 
import { useHistory } from 'react-router-dom';
import { AuthenticatedContext } from '../contexts/AuthenticatedContext';
import HomeForm from './HomeForm';
import MiniStory from './MiniStory';
import styles from '../styles/homeStyles';

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

  // Handler for when we add to story, checks our database to see if there is a story with that name already, and if there isn't adds to database
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

  // Use effect to fetch the storydata, and then renders a ministory component for each story found in the database
  useEffect(() => {
    const fetchData = async () => {
      const storyRef = db.collection('stories');
      const storyData = await storyRef.get();
      const newStories = [];
      // If the stories database has existing stories
      if (!storyData.empty) {
        storyData.forEach(story => {
          const {text, title} = story.data();
          newStories.push(<MiniStory title={title} classes={classes} text={text}/>)
        });
        changeStoryAdded(false);
        changeStories(newStories);
      } else { // If there are no existing stories
        changeStories(<h1 style={{margin: "4rem"}}>There are no stories yet!</h1>)
      }
     
      changeLoading(false);
    };
    fetchData();
  }, [storyAdded, classes]); // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <>
    {alert ? <Alert onClick={() => changeAlert("")} variant="danger"><Alert.Heading>{alert}</Alert.Heading></Alert> : null}
    <HomeForm alert={alert} classes={classes} loading={loading} stories={stories} handleSubmit={handleSubmit} titleRef={titleRef} changeTitleRef={changeTitleRef} textRef={textRef} changeTextRef={changeTextRef} />
  </>
  )
};

export default withStyles(styles)(Home);