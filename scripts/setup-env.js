import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

// Read root env.local file
const envLocalPath = join(rootDir, '.env.local')
const firebaseSecretsPath = join(rootDir, 'firebase_secrets.json')
const serviceAccountPath = join(rootDir, 'backend', 'config', 'serviceAccountKey.json')

let envContent = ''

// Try to read .env.local first, then firebase_secrets.json
if (existsSync(envLocalPath)) {
  console.log('Reading from .env.local...')
  envContent = readFileSync(envLocalPath, 'utf8')
} else if (existsSync(firebaseSecretsPath)) {
  console.log('Reading from firebase_secrets.json...')
  const secrets = JSON.parse(readFileSync(firebaseSecretsPath, 'utf8'))
  
  // Convert firebase_secrets.json to env format
  envContent = `# Frontend Firebase Configuration
VITE_FIREBASE_API_KEY=${secrets.apiKey}
VITE_FIREBASE_AUTH_DOMAIN=${secrets.authDomain}
VITE_FIREBASE_PROJECT_ID=${secrets.projectId}
VITE_FIREBASE_STORAGE_BUCKET=${secrets.storageBucket}
VITE_FIREBASE_MESSAGING_SENDER_ID=${secrets.messagingSenderId}
VITE_FIREBASE_APP_ID=${secrets.appId}

# Backend Configuration
FIREBASE_PROJECT_ID=${secrets.projectId}
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Backend Firebase Admin SDK
# You need to add your Firebase Admin SDK credentials here
# Get them from: Firebase Console > Project Settings > Service Accounts
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYour private key here\\n-----END PRIVATE KEY-----\\n"
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=your_cert_url
`
} else {
  console.error('No .env.local or firebase_secrets.json found!')
  process.exit(1)
}

// Parse env content
const envVars = {}
const lines = envContent.split('\n')
lines.forEach(line => {
  line = line.trim()
  if (line && !line.startsWith('#')) {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim()
    }
  }
})

// Generate frontend .env
const frontendEnv = Object.entries(envVars)
  .filter(([key]) => key.startsWith('VITE_'))
  .map(([key, value]) => `${key}=${value}`)
  .join('\n')

// Generate backend .env
let backendEnv = Object.entries(envVars)
  .filter(([key]) => !key.startsWith('VITE_'))
  .map(([key, value]) => `${key}=${value}`)
  .join('\n')

// If service account file exists, add path to backend env
if (existsSync(serviceAccountPath)) {
  const serviceAccountPathRelative = './config/serviceAccountKey.json'
  if (!backendEnv.includes('FIREBASE_SERVICE_ACCOUNT_PATH')) {
    backendEnv += `\nFIREBASE_SERVICE_ACCOUNT_PATH=${serviceAccountPathRelative}`
  }
  console.log('✅ Detected service account file, adding to backend/.env')
}

// Write frontend .env
const frontendEnvPath = join(rootDir, 'frontend', '.env')
writeFileSync(frontendEnvPath, frontendEnv)
console.log('✅ Created frontend/.env')

// Write backend .env
const backendEnvPath = join(rootDir, 'backend', '.env')
writeFileSync(backendEnvPath, backendEnv)
console.log('✅ Created backend/.env')

console.log('\n✨ Environment files created successfully!')
console.log('📝 Frontend: frontend/.env')
console.log('📝 Backend: backend/.env')

