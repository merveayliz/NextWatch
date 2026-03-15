import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

export { 
    db, 
    collection, 
    onSnapshot, 
    query, 
    orderBy, 
    doc, 
    updateDoc, 
    getDoc 
};
