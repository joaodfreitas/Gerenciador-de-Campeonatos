import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJzELHiYcd7lJ0mke5Z796iAqQUG38rbg",
  authDomain: "gerenciador-de-campeonat-9ca4c.firebaseapp.com",
  projectId: "gerenciador-de-campeonat-9ca4c",
  storageBucket: "gerenciador-de-campeonat-9ca4c.firebasestorage.app",
  messagingSenderId: "7169925174",
  appId: "1:7169925174:web:f396d8aeea59a73b8cb897"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
