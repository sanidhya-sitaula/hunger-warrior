// Import the functions you need from the SDKs you need
import firebase from 'firebase'; 
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2LyJPjaZDcGW05ZJDRdI1MP91QvhORx0",
  authDomain: "hunger-warrior-a9839.firebaseapp.com",
  projectId: "hunger-warrior-a9839",
  storageBucket: "hunger-warrior-a9839.appspot.com",
  messagingSenderId: "473158672655",
  appId: "1:473158672655:web:d49b12ad8d4fab269e5e7a"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire; 