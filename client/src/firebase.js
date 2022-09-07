import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNvOn_owyuR-d43pLIT0YSKzqowxJtSXc",
  authDomain: "clone-d183b.firebaseapp.com",
  projectId: "clone-d183b",
  storageBucket: "clone-d183b.appspot.com",
  messagingSenderId: "70223514302",
  appId: "1:70223514302:web:8cd82759b5e870e529acef",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
