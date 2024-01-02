// AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

// AuthContext.jsx
async function signUp(email, password) {
  try {
    // Add a longer delay to avoid rapid sign-up attempts
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log("Attempting sign-up for email:", email);
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCredential.user;
    setUser(newUser);
    
    console.log("Sign-up successful for email:", email);

    await setDoc(doc(db, "users", email), {
      favShows: [],
    });
  } catch (error) {
    console.error("Error signing up:", error.message);
    console.error("Error code:", error.code);
    throw error;
  }
}


  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, signUp, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
