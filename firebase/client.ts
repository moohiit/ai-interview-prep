// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAZ0WMab7dK-VmCCinuR-zhWn_mo22F25k",
  authDomain: "prepai-26da9.firebaseapp.com",
  projectId: "prepai-26da9",
  storageBucket: "prepai-26da9.firebasestorage.app",
  messagingSenderId: "947648056873",
  appId: "1:947648056873:web:123f5d74637bf286f4d638",
  measurementId: "G-SL7LJM16XK",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig): getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);