"use client";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { AppContext } from "./AppContext";
import { auth } from "@/firebase/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const router = useRouter();

  const provider = new GoogleAuthProvider();

  const registerUser = async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
    }
  };

  const loginUserWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
    }
  };

  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        router.push("/");
      } else router.push("/register");
      setIsLoading(false);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        user,
        error,
        registerUser,
        loginUser,
        loginUserWithGoogle,
        forgotPassword,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
