import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2syfjWg5TQVAoKkWJTYaNRD-hUOKVUFs",
  authDomain: "my-project-9580-1699272110875.firebaseapp.com",
  projectId: "my-project-9580-1699272110875",
  storageBucket: "my-project-9580-1699272110875.firebasestorage.app",
  messagingSenderId: "679710613497",
  appId: "1:679710613497:web:6bf38f9253f159e64a6728",
  measurementId: "G-ZSNC8WS612"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
