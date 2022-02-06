import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDAWPxWiI-tu31vgkIONPlzdqwe3W9TdnM",
  authDomain: "femmes-app.firebaseapp.com",
  projectId: "femmes-app",
  storageBucket: "femmes-app.appspot.com",
  messagingSenderId: "682696353141",
  appId: "1:682696353141:web:93a5cfb56fff10adb51f3c"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const auth = getAuth();


export { db, auth };