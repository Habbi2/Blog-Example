import * as React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  // FirebaseAuthConsumer,
  // IfFirebaseAuthed,
  // IfFirebaseAuthedAnd,
} from "@react-firebase/auth";
import firebaseConfig from "../config";

const Auth = () => {
  return (
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
      <div className="auth">
        <button
          onClick={() => {
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(googleAuthProvider);
          }}
        >
          Sign In with Google
        </button>
        <button
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Sign Out
        </button>
      </div>
    </FirebaseAuthProvider>
  );
};

export default Auth;
