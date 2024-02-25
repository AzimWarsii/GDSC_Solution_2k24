import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyD0fSWfCA6DY0Mi7a16Sky-0S7wgHNiBdo",
  authDomain: "seahorse-cc376.firebaseapp.com",
  projectId: "seahorse-cc376",
  storageBucket: "seahorse-cc376.appspot.com",
  messagingSenderId: "33577975396",
  appId: "1:33577975396:web:452b9a80c82835a62a2971"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword , firestore, storage };