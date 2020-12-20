import { db } from '../firebase/Firebase';
import { useState, useEffect } from 'react';

function Home() {
    const [val, changeVal] = useState(0);
    const [posts, changePosts] = useState([]);
  
    const handleClick = async e => {
      let newVal = val + 1;
      changeVal(newVal);
      const usersRef = await db.collection('users').add({ // Pause the function and wait for data to be appended to the database
        test: newVal
      });
      return usersRef;
    };
  
    useEffect(() => {
      async function fetchData() {
        const docRef = await db.collection('users').get();
        const docs = docRef.docs.map(item => {
          return `${item.data().test}`;
        });
        changePosts(docs);
      }
      fetchData();
    }, [val]); // Second parameter specifies that this useeffect will only happen after the val changes
  
    return (
      <div className="Home">
        <h1>{val}</h1>
        <button onClick={handleClick}>Click me!</button>
        {posts}
      </div>
    );
};

export default Home;