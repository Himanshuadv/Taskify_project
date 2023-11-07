// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/analytics"; // import { getAnalytics } from "firebase/analytics"; 
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfzKxncrqwhowMAdIsuM5DgIO549DF7JI",
  authDomain: "taskify-4b9b9.firebaseapp.com",
  projectId: "taskify-4b9b9",
  storageBucket: "taskify-4b9b9.appspot.com",
  messagingSenderId: "869553708870",
  appId: "1:869553708870:web:17000017b1d6348292cf47",
  measurementId: "G-WRT3Y7WYLP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();

export {auth,googleAuthProvider,githubAuthProvider};
