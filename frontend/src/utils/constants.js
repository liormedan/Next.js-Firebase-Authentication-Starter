// Error messages mapping
export const ERROR_MESSAGES = {
  'auth/email-already-in-use': 'This email is already registered',
  'auth/invalid-email': 'Invalid email address',
  'auth/operation-not-allowed': 'Operation not allowed',
  'auth/weak-password': 'Password is too weak',
  'auth/user-disabled': 'This account has been disabled',
  'auth/user-not-found': 'No account found with this email',
  'auth/wrong-password': 'Incorrect password',
  'auth/too-many-requests': 'Too many failed attempts. Please try again later',
  'auth/network-request-failed': 'Network error. Please check your connection',
  'auth/popup-closed-by-user': 'Sign-in popup was closed',
  'auth/cancelled-popup-request': 'Only one popup request is allowed at a time',
  'auth/requires-recent-login': 'Please log in again to complete this action'
}

// Success messages
export const SUCCESS_MESSAGES = {
  REGISTER_SUCCESS: 'Account created successfully! Please check your email for verification.',
  LOGIN_SUCCESS: 'Welcome back!',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PASSWORD_RESET_SENT: 'Password reset email sent! Check your inbox.',
  PASSWORD_UPDATED: 'Password updated successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  EMAIL_VERIFIED: 'Email verified successfully'
}

// Routes
export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  PASSWORD_RESET: '/password-reset'
}

