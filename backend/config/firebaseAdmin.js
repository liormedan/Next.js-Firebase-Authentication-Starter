import admin from 'firebase-admin'
import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join, resolve } from 'path'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let initialized = false

export const initializeFirebaseAdmin = () => {
  if (initialized) {
    return admin
  }

  try {
    // Check if using service account file or environment variables
    if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
      // Initialize with service account file
      // Resolve path relative to backend directory
      const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH.startsWith('/') || 
                                  process.env.FIREBASE_SERVICE_ACCOUNT_PATH.match(/^[A-Z]:/)
        ? process.env.FIREBASE_SERVICE_ACCOUNT_PATH
        : resolve(join(__dirname, '..'), process.env.FIREBASE_SERVICE_ACCOUNT_PATH)
      
      const serviceAccount = JSON.parse(
        readFileSync(serviceAccountPath, 'utf8')
      )
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      })
    } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY) {
      // Initialize with environment variables
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          clientId: process.env.FIREBASE_CLIENT_ID,
          authUri: process.env.FIREBASE_AUTH_URI,
          tokenUri: process.env.FIREBASE_TOKEN_URI,
          authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
          clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL
        })
      })
    } else {
      // In development, allow backend to run without Admin SDK for frontend-only testing
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️  Firebase Admin SDK not configured. Backend API endpoints requiring Admin SDK will not work.')
        console.warn('   To enable Admin SDK:')
        console.warn('   1. Go to Firebase Console > Project Settings > Service Accounts')
        console.warn('   2. Generate new private key')
        console.warn('   3. Add credentials to .env.local')
        console.warn('   4. Run: npm run setup:env')
        console.warn('   Frontend authentication will still work without Admin SDK.')
        initialized = true // Mark as initialized to prevent repeated warnings
        return admin
      } else {
        throw new Error('Firebase Admin SDK configuration not found. Please set environment variables or provide service account file.')
      }
    }

    initialized = true
    console.log('Firebase Admin SDK initialized successfully')
    return admin
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error)
    throw error
  }
}

export default admin

