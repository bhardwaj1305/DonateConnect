import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDKXLM...",
  authDomain: "donateconnect-8a824.firebaseapp.com",
  projectId: "donateconnect-8a824",
  storageBucket: "donateconnect-8a824.firebasestorage.app",
  messagingSenderId: "524177715291",
  appId: "1:524177715291:web:fd0e8cc7b7202c6766cf7e",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);