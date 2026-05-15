import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {

  apiKey:
    "AIzaSyChODCE8bGDk2it76Eu1Mi8ZPETuTpi4SA",

  authDomain:
    "astradesk-2b3f6.firebaseapp.com",

  projectId:
    "astradesk-2b3f6",

  storageBucket:
    "astradesk-2b3f6.firebasestorage.app",

  messagingSenderId:
    "551155623164",

  appId:
    "1:551155623164:web:c0f03ce1f735f61cd36379",

  measurementId:
    "G-RZZ30KD34X"

};

const app =
  initializeApp(
    firebaseConfig
  );

export const auth =
  getAuth(app);

export const provider =
  new GoogleAuthProvider();