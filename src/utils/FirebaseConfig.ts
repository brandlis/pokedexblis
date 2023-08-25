import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDm8942kvg1M0DiAsWsQ6F1np3yd1zJpH4",
  authDomain: "pokedex-blis.firebaseapp.com",
  projectId: "pokedex-blis",
  storageBucket: "pokedex-blis.appspot.com",
  messagingSenderId: "470752730465",
  appId: "1:470752730465:web:46bcb5d8a14e055f7e3920",
  measurementId: "G-F3SYST2X61",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const pokemonListRef = collection(firebaseDB, "pokemonList");
