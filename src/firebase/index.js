// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSsk4CAc2HARGrraguuYW8FlH8Lt2rtys",
  authDomain: "kong-18.firebaseapp.com",
  databaseURL: "https://kong-18-default-rtdb.firebaseio.com",
  projectId: "kong-18",
  storageBucket: "kong-18.firebasestorage.app",
  messagingSenderId: "350028286535",
  appId: "1:350028286535:web:7c4d55a9fd7450dc85ff62",
  measurementId: "G-YBXE9YMTJV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();