import FireBase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyA9YK868AqmkMnyzengqpjAD5C0KdwhW58",
  authDomain: "desk-fdcd0.firebaseapp.com",
  databaseURL: "https://desk-fdcd0.firebaseio.com",
  projectId: "desk-fdcd0",
  storageBucket: "desk-fdcd0.appspot.com",
  messagingSenderId: "627222503043",
  appId: "1:627222503043:web:c62a6ec2fc74850afb45b6",
  measurementId: "G-ZB16M0N4NG"
};

FireBase.initializeApp(firebaseConfig);

export default FireBase;