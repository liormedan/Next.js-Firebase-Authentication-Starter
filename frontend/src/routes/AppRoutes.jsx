import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import PasswordReset from '../pages/PasswordReset'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return user ? children : <Navigate to="/login" replace />
}

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return user ? <Navigate to="/dashboard" replace /> : children
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/password-reset"
        element={
          <PublicRoute>
            <PasswordReset />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default AppRoutes

