import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuItE0bj4uYzuse2vk7aTYIHeKegppEEg",
  authDomain: "dvdrobby-notes.firebaseapp.com",
  databaseURL: "https://dvdrobby-notes-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dvdrobby-notes",
  storageBucket: "dvdrobby-notes.appspot.com",
  messagingSenderId: "156348777408",
  appId: "1:156348777408:web:4c7460485fa585c824fe25",
  measurementId: "G-8J0KZQMGZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export {app, auth, database};