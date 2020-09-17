import firebase from 'firebase/app'
import "firebase/firestore";
import "firebase/auth"

var firebaseConfig = {
    apiKey: "AIzaSyBTXTgk_vZ2vLkB07HImYLn2-kBPTFOquk",
    authDomain: "hockeypool-1430b.firebaseapp.com",
    databaseURL: "https://hockeypool-1430b.firebaseio.com",
    projectId: "hockeypool-1430b",
    storageBucket: "hockeypool-1430b.appspot.com",
    messagingSenderId: "29178990467",
    appId: "1:29178990467:web:1a467e79874bbcc55370b6",
    measurementId: "G-SQDWDVHD24"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();
  // firebase.firestore().settings({ timestampsInSnapshots: true });
  export default firebase;