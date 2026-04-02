// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0WIIIXZxM1u98HWh_m7KJZ9fQ1e5LK4c",
  authDomain: "netflixgpt-1b8f1.firebaseapp.com",
  projectId: "netflixgpt-1b8f1",
  storageBucket: "netflixgpt-1b8f1.firebasestorage.app",
  messagingSenderId: "877651459513",
  appId: "1:877651459513:web:a2cc289b42ac2a03ee4a68",
  measurementId: "G-GL8KYKJNHF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();