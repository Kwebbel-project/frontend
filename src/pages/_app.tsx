import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { initializeApp, FirebaseApp } from 'firebase/app';
import useAuth from '@/common/firebase/useAuth.js';
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
import  Router, { useRouter } from "next/router";
import React from "react";
import Layout from "@/components/Layout";

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
  const user = useAuth(auth);

  const router = useRouter();
  
  // useEffect(() => {
  //   if (user === null) {
  //     router.push('/auth/login')
  //   }
  // }, [])
  
  return (
    <FirebaseAppProvider firebaseApp={app}>
      <AuthProvider sdk={auth}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </FirebaseAppProvider>
  )
}
