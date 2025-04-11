import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import getAuth

export const firebaseConfig = {
  apiKey: "AIzaSyA7iY6cqO7_1-C26vBCK5HFYAxIK1-ikLg", // Note: Consider using environment variables for sensitive keys
  authDomain: "hp-task-management.firebaseapp.com",
  projectId: "hp-task-management",
  storageBucket: "hp-task-management.firebasestorage.app",
  messagingSenderId: "543124238615",
  appId: "1:543124238615:web:714c7f494d6b5adf108752",
  measurementId: "G-ZD0YS23S90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth instances
export const db = getFirestore(app);
export const auth = getAuth(app); // Initialize and export auth
