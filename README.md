# Firebase Auth Starter

A complete starter template for implementing Firebase Authentication in web applications with both frontend and backend support.

## Project Structure

```
firebase_starter_auth/
├── frontend/          # React frontend application
├── backend/           # Node.js/Express backend API
├── docs/              # All documentation files
│   ├── SPEC.md        # Project specification
│   ├── QUICKSTART.md  # Quick start guide
│   ├── PRODUCTION_READINESS_REPORT.md  # Production assessment
│   └── ...            # Other documentation
├── scripts/           # Setup utilities
└── README.md         # This file
```

## Features

### Frontend
- ✅ Email/Password authentication
- ✅ Social authentication (Google, GitHub)
- ✅ Password reset
- ✅ Email verification
- ✅ User profile management
- ✅ Protected routes
- ✅ Responsive design
- ✅ Form validation with Zod
- ✅ React Hook Form integration

### Backend
- ✅ Firebase Admin SDK integration
- ✅ Token verification middleware
- ✅ User management API
- ✅ Secure endpoints
- ✅ CORS configuration
- ✅ Error handling

## ⚠️ Important: Enable Firebase Authentication First!

**Before running the app, you MUST enable Authentication in Firebase Console:**

1. Go to https://console.firebase.google.com/
2. Select your project
3. Click "Authentication" → "Get started"
4. Enable "Email/Password" and "Google" sign-in methods
5. See [FIREBASE_QUICK_FIX.md](FIREBASE_QUICK_FIX.md) for detailed instructions

**Without this, you'll get `CONFIGURATION_NOT_FOUND` errors!**

## Quick Start

### Automated Setup (Recommended - Windows)

**Windows (PowerShell):**
```powershell
.\start.ps1
```

**Windows (Command Prompt):**
```cmd
start.bat
```

The startup script will:
- ✅ Check prerequisites (Node.js, npm)
- ✅ Install all dependencies
- ✅ Set up environment variables
- ✅ Start both frontend and backend

### Manual Setup

1. Install all dependencies:
```bash
npm run install:all
```

2. Set up environment variables:
   ```bash
   # Copy the example file
   cp .env.local.example .env.local
   
   # Edit .env.local with your Firebase credentials
   # Then run the setup script:
   npm run setup:env
   ```
   This will automatically create `frontend/.env` and `backend/.env` from your root `.env.local`
   
   **Alternative:** If you have `firebase_secrets.json`, place it in the root and run `npm run setup:env`

3. Run both frontend and backend together:
```bash
npm run dev
```

This will start:
- Frontend on `http://localhost:3000`
- Backend on `http://localhost:5000`

### Individual Setup (Alternative)

If you prefer to run them separately:

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your Firebase configuration
npm run dev
```

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Firebase Admin SDK configuration
npm run dev
```

## Firebase Configuration

### Unified Configuration (Recommended)

Create a `.env.local` file in the root directory with all your Firebase configuration:

```env
# Frontend Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Backend Configuration
FIREBASE_PROJECT_ID=your_project_id
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Backend Firebase Admin SDK
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your_client_email
# ... (see .env.local.example for full template)
```

Then run:
```bash
npm run setup:env
```

This will automatically create `frontend/.env` and `backend/.env` from your root `.env.local`.

### Getting Firebase Credentials

**Frontend Configuration:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > General
4. Scroll down to "Your apps" and add a web app
5. Copy the configuration values

**Backend Configuration:**
1. Go to Firebase Console > Project Settings > Service Accounts
2. Click "Generate new private key"
3. Copy the values from the downloaded JSON file to your `.env.local`

## Technology Stack

### Frontend
- React 18
- Vite
- React Router
- Firebase SDK v10
- React Hook Form
- Zod
- CSS3

### Backend
- Node.js
- Express
- Firebase Admin SDK
- CORS
- Helmet
- Morgan

## Documentation

### Main Documentation
- [Documentation Index](docs/README.md) - All documentation files
- [Project Specification](docs/SPEC.md) - Complete project specification
- [Quick Start Guide](docs/QUICKSTART.md) - Quick setup instructions

### Setup & Configuration
- [Setup Checklist](docs/SETUP_CHECKLIST.md) - Setup verification
- [Firebase Setup](docs/FIREBASE_SETUP.md) - Firebase configuration guide
- [Firebase Quick Fix](docs/FIREBASE_QUICK_FIX.md) - Common Firebase errors

### Troubleshooting
- [Troubleshooting Guide](docs/TROUBLESHOOTING.md) - Common issues and solutions

### Reviews & Reports
- [Production Readiness Report](docs/PRODUCTION_READINESS_REPORT.md) - Production assessment (75/100)

### Project-Specific
- [Frontend README](frontend/README.md) - Frontend setup and usage
- [Backend README](backend/README.md) - Backend setup and API documentation

## Development

### Root Level Commands (Run from root directory)
- `npm run install:all` - Install dependencies for root, frontend, and backend
- `npm run dev` - Start both frontend and backend together
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend
- `npm run setup:env` - Sync `.env.local` or `firebase_secrets.json` to frontend and backend
- `npm run build` - Build frontend for production
- `npm start` - Start both frontend and backend in production mode

### Frontend Commands (Run from frontend directory)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Commands (Run from backend directory)
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests

## License

MIT

