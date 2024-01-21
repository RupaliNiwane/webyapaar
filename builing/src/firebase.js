// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdxbkPi_jhFsxKr1lHxB755vODyfQ6ZHc",
  authDomain: "realtime-33796.firebaseapp.com",
  projectId: "realtime-33796",
  storageBucket: "realtime-33796.appspot.com",
  messagingSenderId: "244388303212",
  appId: "1:244388303212:web:e2b4c1898f8ff3ab1f2349"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  
  export const auth = getAuth();
  export const db = getDatabase(app);