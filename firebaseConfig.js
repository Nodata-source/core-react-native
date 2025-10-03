import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxAddnrSsc3PHFALj2d-_sz2DJt6P4RlQ",
  authDomain: "core-react-native-77f88.firebaseapp.com",
  projectId: "core-react-native-77f88",
  storageBucket: "core-react-native-77f88.appspot.com",
  messagingSenderId: "502492761767",
  appId: "1:502492761767:web:eac7533f59446dbb14d582",
  measurementId: "G-BLVBP4KBJE"
};

// Prevent duplicate initialization
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);