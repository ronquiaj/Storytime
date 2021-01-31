import React, { useState, useEffect, useCallback } from "react";
import { db } from "../firebase/Firebase";
import { Link } from 'react-router-dom';

export default function ArchivedStories() {
  const [archivedPosts, setArchivedPosts] = useState([]);

  // method to fetch data from the database and be used in the use effect to display archived posts
  const fetchData = useCallback(async () => {
    const archiveRef = db.collection("archive");
    const archiveData = await archiveRef.get();
    const archive = [];
    archiveData.forEach((story) => archive.push(<Link to={`/archive/${story.data().title}`}>{story.data().title}</Link>));
    setArchivedPosts(archive);
  }, []);

  //useeffect to fetch arhive data from the database
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <div>{archivedPosts}</div>;
}
