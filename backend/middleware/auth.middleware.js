import admin from '../config/firebaseAdmin.js'

/**
 * Middleware to verify Firebase ID token
 * Extracts token from Authorization header and verifies it
 */
export const verifyToken = async (req, res, next) => {
  try {
    // Check if Firebase Admin is initialized
    if (!admin.apps.length) {
      return res.status(503).json({ 
        error: 'Firebase Admin SDK not configured. Please configure backend environment variables.' 
      })
    }

    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const token = authHeader.split('Bearer ')[1]

    // Verify the token
    const decodedToken = await admin.auth().verifyIdToken(token)
    
    // Attach user info to request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      ...decodedToken
    }

    next()
  } catch (error) {
    console.error('Token verification error:', error)
    
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ error: 'Token expired' })
    }
    
    if (error.code === 'auth/id-token-revoked') {
      return res.status(401).json({ error: 'Token revoked' })
    }

    return res.status(401).json({ error: 'Invalid token' })
  }
}

/**
 * Optional middleware to check if email is verified
 */
export const requireEmailVerification = (req, res, next) => {
  if (!req.user?.emailVerified) {
    return res.status(403).json({ error: 'Email verification required' })
  }
  next()
}

