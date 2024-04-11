import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8e6fNs0JL31IHAu3jyipgjBRh82O2_oI",
  authDomain: "dvdrobby-company-profile.firebaseapp.com",
  projectId: "dvdrobby-company-profile",
  storageBucket: "dvdrobby-company-profile.appspot.com",
  messagingSenderId: "280005077451",
  appId: "1:280005077451:web:1ca36bd8743ee9d363ee4e"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;