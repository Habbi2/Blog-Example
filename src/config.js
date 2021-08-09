import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCSygmugimjtNenmIMXuhUtRVgwPUtGxl0",
  authDomain: "delord-stock.firebaseapp.com",
  projectId: "delord-stock",
  storageBucket: "delord-stock.appspot.com",
  messagingSenderId: "449733055154",
  appId: "1:449733055154:web:782e93b035617e24e2afab",
  measurementId: "G-CL7FDQBHKL"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

export {storage, firebaseConfig as default};