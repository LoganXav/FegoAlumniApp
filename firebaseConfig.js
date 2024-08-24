// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHPxZ6m3iIAj3JU5BODeWXBtEQvhMsr6Q",
  authDomain: "fego-alumni-app.firebaseapp.com",
  projectId: "fego-alumni-app",
  storageBucket: "fego-alumni-app.appspot.com",
  messagingSenderId: "377056159337",
  appId: "1:377056159337:web:d39b4f99df9c899b3ca4f8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
