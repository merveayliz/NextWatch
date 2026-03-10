
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAAsVCcyKg33Zjx6zwNYfGRM42nCngnDmM",
  authDomain: "nextwatch-9bfb9.firebaseapp.com",
  projectId: "nextwatch-9bfb9",
  storageBucket: "nextwatch-9bfb9.firebasestorage.app",
  messagingSenderId: "156989228846",
  appId: "1:156989228846:web:c289ae5d838454661b9cbf",
  measurementId: "G-KFVL36BJFT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); 

export { db };
