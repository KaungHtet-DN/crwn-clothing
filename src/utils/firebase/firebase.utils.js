import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0OJyTCwp-O18uPcy9EH7kRwJ21n2LDrc",
  authDomain: "crwn-clothing-db-b369d.firebaseapp.com",
  projectId: "crwn-clothing-db-b369d",
  storageBucket: "crwn-clothing-db-b369d.appspot.com",
  messagingSenderId: "700622857564",
  appId: "1:700622857564:web:0d5b6eb3e14f408afd0d99",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdDate = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdDate,
      });
    } catch (error) {
      console.log("Error in creating user.", error.message);
    }
  }

  return userDocRef;
};
