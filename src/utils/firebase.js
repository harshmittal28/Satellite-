// src/utils/firebase.js (or src/firebase.js depending on your structure)

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCU4vrf451nq73kc38SiFIyYUM2ORVMvwc",
  authDomain: "buildyourownsatellite.firebaseapp.com",
  projectId: "buildyourownsatellite",
  storageBucket: "buildyourownsatellite.firebasestorage.app",
  messagingSenderId: "846566556406",
  appId: "1:846566556406:web:bedc644921a271fe8ba2d7",
  measurementId: "G-VHFEPQDPG4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firestore instance
export const db = getFirestore(app);