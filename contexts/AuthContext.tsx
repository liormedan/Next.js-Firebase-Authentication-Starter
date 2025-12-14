"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createUserProfile } from "@/services/userService";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      setConfigError(
        "Firebase is not configured. Please check your .env.local file and ensure all Firebase environment variables are set correctly."
      );
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Set user immediately - don't wait for Firestore
      setCurrentUser(user);
      setLoading(false);
      
      // Create user profile in Firestore asynchronously (non-blocking)
      if (user) {
        // Don't await - let it run in background
        createUserProfile(user.uid, user.email || "", {
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
        }).catch((error) => {
          // Silently handle errors - don't log to console in production
          if (process.env.NODE_ENV === "development") {
            console.warn("User profile creation failed (non-critical):", error);
          }
        });
      }
    }, (error) => {
      // Handle auth state errors
      console.error("Auth state error:", error);
      setCurrentUser(null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function signup(email: string, password: string) {
    if (!auth) {
      throw new Error("Firebase is not configured. Please check your environment variables.");
    }
    return createUserWithEmailAndPassword(auth, email, password).then(() => {
      // User creation handled by onAuthStateChanged
    });
  }

  function login(email: string, password: string) {
    if (!auth) {
      throw new Error("Firebase is not configured. Please check your environment variables.");
    }
    return signInWithEmailAndPassword(auth, email, password).then(() => {
      // Login handled by onAuthStateChanged
    });
  }

  function loginWithGoogle() {
    if (!auth) {
      throw new Error("Firebase is not configured. Please check your environment variables.");
    }
    const provider = new GoogleAuthProvider();
    // Add additional scopes if needed
    provider.addScope("profile");
    provider.addScope("email");
    // Set custom parameters
    provider.setCustomParameters({
      prompt: "select_account",
    });
    
    return signInWithPopup(auth, provider)
      .then(() => {
        // Login handled by onAuthStateChanged
      })
      .catch((error) => {
        // Handle specific errors
        if (error.code === "auth/popup-closed-by-user") {
          throw new Error("Sign-in popup was closed. Please try again.");
        } else if (error.code === "auth/popup-blocked") {
          throw new Error("Popup was blocked by browser. Please allow popups for this site.");
        } else if (error.code === "auth/cancelled-popup-request") {
          throw new Error("Another sign-in request is already in progress.");
        }
        throw error;
      });
  }

  function logout() {
    if (!auth) {
      throw new Error("Firebase is not configured. Please check your environment variables.");
    }
    return signOut(auth);
  }

  // Show configuration error if Firebase is not set up
  if (configError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-gray-900 p-4">
        <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="flex items-center mb-4">
            <svg
              className="w-8 h-8 text-red-600 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
              Firebase Configuration Error
            </h1>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{configError}</p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-2">
              Quick Setup:
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>Create a <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">.env.local</code> file in the root directory</li>
              <li>Add your Firebase configuration variables (see README.md)</li>
              <li>Restart the development server</li>
            </ol>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            See <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">README.md</code> for detailed setup instructions.
          </p>
        </div>
      </div>
    );
  }

  const value: AuthContextType = {
    currentUser,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

