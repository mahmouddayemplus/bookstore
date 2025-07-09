import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { collection, getDocs } from "firebase/firestore";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDSDR-_hkkFvff0-c9jJl_yhwtG3Xx63-E",
  authDomain: "books-f8497.firebaseapp.com",
  projectId: "books-f8497",
  storageBucket: "books-f8497.firebasestorage.app",
  messagingSenderId: "970011091706",
  appId: "1:970011091706:web:7a043ec0ea34be794b9f43"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);




export const auth = getAuth(app);

// const querySnapshot = await getDocs(collection(db, "book"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
// });
