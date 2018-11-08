import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCNwU2xAW8ApbtYsMq-0lEW-wHWG1-dCGY",
    authDomain: "udemy-geo-ninjas-623f1.firebaseapp.com",
    databaseURL: "https://udemy-geo-ninjas-623f1.firebaseio.com",
    projectId: "udemy-geo-ninjas-623f1",
    storageBucket: "udemy-geo-ninjas-623f1.appspot.com",
    messagingSenderId: "551600978724"
  };

  const firebaseApp = firebase.initializeApp(config);
  firebaseApp.firestore().settings({ timestampsInSnapshots: true })
  
  export default firebaseApp.firestore()