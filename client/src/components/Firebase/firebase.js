import { initializeApp } from "firebase/app"; 
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCyYJPmLzAygy5rvkh9jHUyPuR7unoRYH8",
  authDomain: "msci342-project-50a9a.firebaseapp.com",
  projectId: "msci342-project-50a9a",
  storageBucket: "msci342-project-50a9a.firebasestorage.app",
  messagingSenderId: "724866549319",
  appId: "1:724866549319:web:91dfe494f39cf41ea79362",
  measurementId: "G-SGXJBHEN9B"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


class Firebase {
  constructor() {
    this.auth = auth;
  }
  
  // *** Auth API ***

  doCreateUserWithEmailAndPassword = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    return userCredential.user.getIdToken(); // Get Firebase ID Token
  };

  doSignInWithEmailAndPassword = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    return userCredential.user.getIdToken(); // Get Firebase ID Token
  };

  doSignOut = () => signOut(this.auth);

  doPasswordReset = email => sendPasswordResetEmail(this.auth, email);

  doPasswordUpdate = password =>
    updatePassword(this.auth.currentUser, password);

  doGetIdToken = (bool) => {
    return this.auth.currentUser.getIdToken(/* forceRefresh */ bool);
  }

  doGetUserByEmail = email => this.auth.getUserByEmail(email);

}

export default Firebase;