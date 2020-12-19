import firebase from 'firebase/app';
import 'firebase/firestore'; 

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDAmGcnf3GeT5kW0U2VM7tA5Trx68OQ0v0",
    authDomain: "storytime-7f96d.firebaseapp.com",
    projectId: "storytime-7f96d",
    storageBucket: "storytime-7f96d.appspot.com",
    messagingSenderId: "273374825930",
    appId: "1:273374825930:web:495c0bc9b48d054a87d333"
  });
  
  const db = firebase.firestore();

  export default db;