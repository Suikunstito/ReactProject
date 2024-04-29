// Import the functions you need from the Firebase SDKs you want to use
import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKU9j_ixRJKAu1Z7OyiS22FZGpuCcVxtI",
    authDomain: "react-project-76faf.firebaseapp.com",
    projectId: "react-project-76faf",
    storageBucket: "react-project-76faf.appspot.com",
    messagingSenderId: "83404007138",
    appId: "1:83404007138:web:fdda1f619fcda0df68e0bb"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) { // check if Firebase is already initialized
    app = firebase.initializeApp(firebaseConfig); // if not, initialize it
} else {
    app = firebase.app(); // if already initialized, use that one
}

// Export the Firebase app and auth instances for use in other modules
export { app, auth };