// import firebase from "firebase";

// const firebaseConfig = {
//   apiKey: process.env.APP_KEY,
//   authDomain: "netflix-151df.firebaseapp.com",
//   projectId: "netflix-151df",
//   storageBucket: "netflix-151df.appspot.com",
//   messagingSenderId: "316700975498",
//   appId: "1:316700975498:web:15063159b205c1a349a873",
//   measurementId: "G-2ZGE63ES9F",
// };

// firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage();
// export default storage;


import firebase from 'firebase';
// import {initializeApp} from 'firebase/app'
// import {getStorage}from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyCdNLTW1Oevvso-HvNYKqwc2HqQoZ2BAzU",
  authDomain: "netflix-8ce13.firebaseapp.com",
  projectId: "netflix-8ce13",
  storageBucket: "netflix-8ce13.appspot.com",
  messagingSenderId: "189832198174",
  appId: "1:189832198174:web:e26cff89e0adc9b50e960f",
  measurementId: "G-WKT9JMMSW0"
};

  firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
// export const app =initializeApp(firebaseConfig);
// const storage =getStorage()
// export default storage