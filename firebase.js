import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIXvFD5dWGCQ919molDgyEjd4UCWCCFdU",
  authDomain: "expense-tracker-project-d326e.firebaseapp.com",
  projectId: "expense-tracker-project-d326e",
  storageBucket: "expense-tracker-project-d326e.appspot.com",
  messagingSenderId: "430312725292",
  appId: "1:430312725292:web:10a9853e237711c6e0ea89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

