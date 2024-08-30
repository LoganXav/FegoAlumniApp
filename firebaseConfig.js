import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHPxZ6m3iIAj3JU5BODeWXBtEQvhMsr6Q",
  authDomain: "fego-alumni-app.firebaseapp.com",
  projectId: "fego-alumni-app",
  storageBucket: "fego-alumni-app.appspot.com",
  messagingSenderId: "377056159337",
  appId: "1:377056159337:web:d39b4f99df9c899b3ca4f8",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app, "gs://fego-alumni-app.appspot.com");

export { auth, db, storage };
