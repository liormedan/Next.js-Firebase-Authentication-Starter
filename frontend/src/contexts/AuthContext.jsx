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
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  // Sign in with GitHub
  const signInWithGitHub = () => {
    const provider = new GithubAuthProvider()
    return signInWithPopup(auth, provider)
  }

  // Delete account
  const deleteAccount = () => {
    return deleteUser(currentUser)
  }

  // Monitor auth state changes
  useEffect(() => {
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

