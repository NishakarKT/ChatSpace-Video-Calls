import Firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const FirebaseConfig = {
    apiKey: "AIzaSyDCm3MXYgCqhShFNzQGioGFUaJ6X-2EyHQ",
    authDomain: "chatspace-nk.firebaseapp.com",
    projectId: "chatspace-nk",
    storageBucket: "chatspace-nk.appspot.com",
    messagingSenderId: "883139620877",
    appId: "1:883139620877:web:0453d1371d670f1bafe544",
    measurementId: "G-LZYLY6CH5K"
};

const firebase = Firebase.initializeApp(FirebaseConfig);
const { FieldValue } = Firebase.firestore;
const googleAuthProvider = new Firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, FieldValue };
