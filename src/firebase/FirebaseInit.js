// src/firebase/FirebaseInit.js

import fb from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseApp = fb.initializeApp({
  apiKey: "AIzaSyA8wb5RBRgjIdS83-Q3AoL0BcLGSSZYygc",
  authDomain: "my-instagram-id.firebaseapp.com",
  projectId: "my-instagram-id",
  storageBucket: "my-instagram-id.appspot.com",
  messagingSenderId: "1067068891000",
  appId: "1:1067068891000:web:9e128203413bd6755ef28d",
  measurementId: "G-BPC0MYMB0B",
});

const db = firebaseApp.firestore();
const auth = fb.auth();
const storage = fb.storage();

export { db, auth, storage, fb };