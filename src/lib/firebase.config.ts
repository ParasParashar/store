import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBRhsDBHdAJQb93EPaeCJWoxtGFyrHa3WE",
  authDomain: "store-6136c.firebaseapp.com",
  projectId: "store-6136c",
  storageBucket: "store-6136c.firebasestorage.app",
  messagingSenderId: "158139612616",
  appId: "1:158139612616:web:cf5754d2dc438505a994fd",
  measurementId: "G-XJJEJ60FZK"
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();
export { auth };