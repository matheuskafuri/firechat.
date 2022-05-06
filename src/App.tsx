/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Flex, Box, Text, Heading } from "@chakra-ui/react";

import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { Channel } from "./components/Channel";
import { SignInButton } from "./components/Button/SignInButton";
import { SignOutButton } from "./components/Button/SignOutButton";
import { Header } from "./components/Header";

const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_AUTH_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
  RECAPTCHA_SECRET_KEY,
} = process.env;

const app = initializeApp({
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_AUTH_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
});

const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    //Cleanup subscription
    return unsubscribe;
  }, []);

  const sigInWithGoogle = async () => {
    //Retrieve Google provider object
    const provider = new GoogleAuthProvider();
    // Set language to the default browser preference
    auth.languageCode = "it";
    // Start sign in process
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  if (initializing) return <p>Loading...</p>;
  return (
    <Flex margin="auto">
      {user ? (
        <Flex width="100vw" justifyContent="space-around" direction="column" padding={8}>
          <Flex justify="space-around">
            <Header user={user} />
            <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
          </Flex>
          <Box alignSelf="center" padding={12} maxWidth={1200} width="80vw" backgroundColor="gray.700" borderRadius={16} border="solid" borderColor="pink.700" >
            <Channel user={user} db={db} />
          </Box>
        </Flex>
      ) : (
        <Flex height="100vh" width="100vw" align="center" justify="center">
          <Flex flexDir="column" align="center" justifyContent="center">
            <Heading fontSize="3xl" fontWeight="bold">Welcome to FireChat</Heading>
            <Text fontSize="lg" mb="6">Let's chat with us!</Text>
            <SignInButton onClick={sigInWithGoogle}>
              Sign in with Google
            </SignInButton>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default App;
