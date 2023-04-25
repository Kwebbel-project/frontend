import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { initializeApp, FirebaseApp } from 'firebase/app';

import {
  getAuth,
  indexedDBLocalPersistence,
  connectAuthEmulator,
  inMemoryPersistence,
} from 'firebase/auth';

import {
  FirebaseAppProvider,
  AuthProvider
} from 'reactfire';
import { useEffect } from "react";
import  Router from "next/router";

const firebaseConfig : any = {
  apiKey: "AIzaSyCC6AMePDqq4kNVLjiYn4mcMtg9kSlfMEA",
  authDomain: "kwebbel-33de0.firebaseapp.com",
  projectId: "kwebbel-33de0",
  storageBucket: "kwebbel-33de0.appspot.com",
  messagingSenderId: "359204027911",
  appId: "1:359204027911:web:c0cb25ee63ba7d208934a2"
};

let domain = process.env.DOMAIN;
export default function App({ Component, pageProps }: AppProps) {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in, so allow access to protected route
        // e.g. redirect to a dashboard page
        Router.push(`${domain}/home`);
      } else {
        // User is not signed in, so redirect to login page
        // Router.push(`${domain}/auth/`);
      }
    });
  }, [])
  

  return (
    <FirebaseAppProvider firebaseApp={app}>
      <AuthProvider sdk={auth}>
        <Component {...pageProps} />
      </AuthProvider>
    </FirebaseAppProvider>
  )
}
