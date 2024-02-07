// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
// Your web app's Firebase configuration

//エンブファイルで見えないように
const firebaseConfig = {
  apiKey: "AIzaSyDV58eTuVcfgroTfpLquT4LylqQTEWVxUk",
  authDomain: "chatapplication-63973.firebaseapp.com",
  projectId: "chatapplication-63973",
  storageBucket: "chatapplication-63973.appspot.com",
  messagingSenderId: "1014717116822",
  appId: "1:1014717116822:web:b2ed98b773cc094f2e2db7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db =getFirestore(app);
export const auth =getAuth(app);