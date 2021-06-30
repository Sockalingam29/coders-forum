import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDgLwMnlUUFHR__CvXrw80R7b0RJL3fyZg",
    authDomain: "coders-forum.firebaseapp.com",
    projectId: "coders-forum",
    storageBucket: "coders-forum.appspot.com",
    messagingSenderId: "581287918482",
    appId: "1:581287918482:web:e29ffab77beeac20e25f4b"
  };

  firebase.initializeApp(firebaseConfig);

  const db=firebase.firestore();
  export {db};