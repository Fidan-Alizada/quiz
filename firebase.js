import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBDGlxsvrQdnoKuB6pDRC3xIx0NzBULbYg",
  authDomain: "quiz-f19a5.firebaseapp.com",
  projectId: "quiz-f19a5",
  storageBucket: "quiz-f19a5.appspot.com",
  messagingSenderId: "599632535723",
  appId: "1:599632535723:web:45a7a219a990d0808717ee",
  measurementId: "G-7DBTC98PEN"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const resultsCollectionName = "results";

export async function saveResult(name, score) {
  try {
    const docRef = await addDoc(collection(db, resultsCollectionName), {
      name,
      score,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getResults() {
  const querySnapshot = await getDocs(collection(db, resultsCollectionName));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}
