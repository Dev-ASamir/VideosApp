import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDmlup4ulWXEH-fSJI2Wxq58WZIB59pNN4",
  authDomain: "videos-app-a1592.firebaseapp.com",
  databaseURL: "https://videos-app-a1592.firebaseio.com",
  projectId: "videos-app-a1592",
  storageBucket: "videos-app-a1592.appspot.com",
  messagingSenderId: "29338328999"
};
firebase.initializeApp(config);

export default firebase;
