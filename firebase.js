// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI10ZZW-8m8o2YqTGfUHi1ynILxmf1umE",
  authDomain: "projetrecette-f1b83.firebaseapp.com",
  projectId: "projetrecette-f1b83",
  storageBucket: "projetrecette-f1b83.appspot.com",
  messagingSenderId: "1032160445433",
  appId: "1:1032160445433:web:abc6536c9d3cf13ebeb328",
  measurementId: "G-EQK7WNBT88"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);