// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(process.env.FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: "AIzaSyAn4-Qm6SWtVWnmRTiXcuvmkYyGDWQ3psc",
  authDomain: "volunteer-app-218ac.firebaseapp.com",
  projectId: "volunteer-app-218ac",
  storageBucket: "volunteer-app-218ac.appspot.com",
  messagingSenderId: "1067725673313",
  appId: "1:1067725673313:web:cda283587cbca4b271eb20",
  measurementId: "G-2TZHJDZNCY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);