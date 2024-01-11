import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1vpOLETLsNqhsn7i4Hh9nr9rv1RQplfw",
  authDomain: "miniblog-3c48c.firebaseapp.com",
  projectId: "miniblog-3c48c",
  storageBucket: "miniblog-3c48c.appspot.com",
  messagingSenderId: "106956007021",
  appId: "1:106956007021:web:5fde816c47b0ea3ce58164"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };