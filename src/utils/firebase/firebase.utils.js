// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { collection, doc, setDoc, serverTimestamp, getFirestore, getDoc, updateDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID,
  appId: process.env.REACT_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const createUserDoc = async (user) => {
  await setDoc(doc(db, "users", user.uid), {
    name: user.displayName,
    email: user.email,
    ranking: 0,
    uid: user.uid,
    created: serverTimestamp()
  });
}

export const createUserWithFirebase = async (email, password, displayName) => {
  try {
     // Create a new user with email and password and get the result
    const result = await createUserWithEmailAndPassword(auth, email, password);
     // Get the user object from the result
    const user = result.user;
    await updateProfile(user, {displayName});
     // Create a document
    createUserDoc(user);
  } catch (error) {
    // Handle any errors
    switch(error.code) {
      case 'auth/weak-password':
        return alert('Password should be at least 6 characters');
    }
    console.error(error);
  }
};

export const signInWithFirebase = async (email, password) => {
  try {
    // Sign in with email and password
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    // Handle any errors
    switch(error.code) {
      case 'auth/user-not-found':
        return alert('Your are wrong');
      case 'auth/wrong-password':
        return alert('Incorrect user and password');
      default:
        console.error(error.code);
    }
  }
};

export const signOutUser = async() => {
  try {
    // Sign out the current user
    await signOut(auth);
  } catch (error) {
    // Handle any errors
    console.error(error);
  }
}

export const getDocUser = async (user) => {
  // Get a reference to the user's document
  const userRef = doc(db, "users", user.uid);

  // Get the document data
  const userDoc = await getDoc(userRef);

  // Check if the document exists
  if (userDoc.exists()) {
    // Get the data as an object
    const userData = userDoc.data();
    return userData;
  } else {
    // Handle the case where the document does not exist
    return false;
  }
}

export const updateUser = async(user, updateUser) => {
  // Get a reference to the document you want to update
  const userRef = doc(db, "users", user.uid);

  try {
    // Update some fields of the document
    await updateDoc(userRef, {...updateUser});  
  } catch (error) {
    console.log(error);
  }
}

export const authStateChanged = (callback) => onAuthStateChanged(auth, callback);