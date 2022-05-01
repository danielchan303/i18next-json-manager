import React from "react";
import { useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4icTj2AMc_R6iVVEd8_9vN4EryHPCo6g",
  authDomain: "realtime-todo-daniel-chan.firebaseapp.com",
  databaseURL: "https://realtime-todo-daniel-chan.firebaseio.com",
  projectId: "realtime-todo-daniel-chan",
  storageBucket: "realtime-todo-daniel-chan.appspot.com",
  messagingSenderId: "441257112335",
  appId: "1:441257112335:web:2e28c0ec4454e08a1e847a",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const loginHandler = () => {
  const email = prompt("Email:");
  const password = prompt("Password:");
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorCode", errorCode, "errorMessage", errorMessage);
      alert("Wrong username or password");
    });
};

export const signOutHandler = () => {
  console.log("sign out");
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      alert("Sign out failed");
    });
};

export const useAuthStateListener = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("user", user);
        dispatch.auth.login(user);
      } else {
        // User is signed out
        // ...
        dispatch.auth.logout();
      }
    });
  }, [dispatch.auth]);
};
