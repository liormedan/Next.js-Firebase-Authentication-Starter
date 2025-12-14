import { createContext, useContext, useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  deleteUser,
  sendEmailVerification
} from 'firebase/auth'
import { auth } from '../services/firebase'

export const AuthContext = createContext({})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Sign up with email and password
  const signUp = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    // Send email verification
    await sendEmailVerification(userCredential.user)
    return userCredential
  }

  // Sign in with email and password
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Sign out
  const logout = () => {
    return signOut(auth)
  }

  // Reset password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  // Update password
  const updateUserPassword = (newPassword) => {
    return updatePassword(currentUser, newPassword)
  }

  // Update user profile
  const updateUserProfile = (displayName, photoURL) => {
    return updateProfile(currentUser, {
      displayName,
      photoURL
    })
  }

  // Sign in with Google
  // Using redirect instead of popup to avoid Cross-Origin-Opener-Policy issues
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    // Use redirect mode which is more reliable and doesn't have COOP issues
    return signInWithRedirect(auth, provider)
  }

  // Sign in with GitHub
  // Using redirect instead of popup to avoid Cross-Origin-Opener-Policy issues
  const signInWithGitHub = () => {
    const provider = new GithubAuthProvider()
    // Use redirect mode which is more reliable and doesn't have COOP issues
    return signInWithRedirect(auth, provider)
  }

  // Delete account
  const deleteAccount = () => {
    return deleteUser(currentUser)
  }

  // Monitor auth state changes and handle redirect results
  useEffect(() => {
    // Check for redirect result (after social auth redirect)
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // User signed in via redirect
          console.log('User signed in via redirect:', result.user)
        }
      })
      .catch((error) => {
        // Handle redirect errors silently (user might have cancelled)
        if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
          console.error('Redirect auth error:', error)
        }
      })

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    user: currentUser,
    signUp,
    signIn,
    logout,
    resetPassword,
    updatePassword: updateUserPassword,
    updateProfile: updateUserProfile,
    signInWithGoogle,
    signInWithGitHub,
    deleteAccount,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

