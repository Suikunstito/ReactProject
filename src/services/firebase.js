// Import the functions you need from the Firebase SDKs you want to use
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
/*
let app;
if (firebase.apps.length === 0) { // check if Firebase is already initialized
    app = firebase.initializeApp(firebaseConfig); // if not, initialize it
} else {
    app = firebase.app(); // if already initialized, use that one
}
const auth = firebase.auth(); */

const handleRegister = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user.email);
        })
        .catch(error => {
            console.log(error.message);
        });
};
export const handleForgotPassword = (email) => {
    auth.sendPasswordResetEmail(auth,email)
      .then(() => {
        console.log('Correo de recuperación enviado');
      })
      .catch((error) => {
        console.error('Error enviando correo de recuperación: ', error);
      });
  };

// Export the Firebase app and auth instances for use in other modules
export { app, auth, handleRegister};