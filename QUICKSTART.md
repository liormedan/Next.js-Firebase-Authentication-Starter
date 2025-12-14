# Quick Start Guide

## 🚀 Running the App Together

### Option 1: Automated Startup (Windows - Recommended)

**PowerShell:**
```powershell
.\start.ps1
```

**Command Prompt:**
```cmd
start.bat
```

The script automatically:
- ✅ Checks prerequisites
- ✅ Installs dependencies
- ✅ Sets up environment
- ✅ Starts both servers

### Option 2: Manual Setup

### Step 1: Install Dependencies

```bash
npm run install:all
```

This installs dependencies for:
- Root package (concurrently)
- Frontend (React, Vite, etc.)
- Backend (Express, Firebase Admin, etc.)

### Step 2: Set Up Environment Variables

You have two options:

#### Option A: Use `.env.local` (Recommended)

1. Create `.env.local` in the root directory
2. Copy the template from `.env.local.example`
3. Fill in your Firebase credentials
4. Run the setup script:

```bash
npm run setup:env
```

This automatically creates `frontend/.env` and `backend/.env` from your root `.env.local`.

#### Option B: Use `firebase_secrets.json`

If you have a `firebase_secrets.json` file (like the one you have), the setup script will automatically convert it:

```bash
npm run setup:env
```

**Note:** You'll still need to add your Firebase Admin SDK credentials for the backend. Get them from:
- Firebase Console > Project Settings > Service Accounts > Generate new private key

### Step 3: Run Both Frontend and Backend

```bash
npm run dev
```

This starts:
- ✅ Frontend on `http://localhost:3000`
- ✅ Backend on `http://localhost:5000`

Both will run in the same terminal with color-coded output.

## 📁 Project Structure

```
firebase_starter_auth/
├── frontend/          # React app
├── backend/           # Express API
├── scripts/           # Setup utilities
├── .env.local         # Your unified config (create this)
├── package.json       # Root package with unified scripts
└── README.md          # Full documentation
```

## 🔧 Available Commands

### From Root Directory:

- `npm run install:all` - Install all dependencies
- `npm run dev` - Start both frontend and backend
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend
- `npm run setup:env` - Sync .env.local to frontend/backend
- `npm run build` - Build frontend for production
- `npm start` - Start both in production mode

### Individual Commands:

**Frontend only:**
```bash
cd frontend
npm run dev
```

**Backend only:**
```bash
cd backend
npm run dev
```

## 🔑 Environment Variables

Your `.env.local` should contain:

**Frontend (VITE_ prefix):**
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

**Backend:**
- `FIREBASE_PROJECT_ID`
- `PORT` (default: 5000)
- `NODE_ENV` (development/production)
- `CORS_ORIGIN` (default: http://localhost:3000)
- Firebase Admin SDK credentials (see `.env.local.example`)

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 or 5000 is already in use, you can:

1. Change ports in `.env.local`:
   ```env
   PORT=5001  # For backend
   ```
   
2. Update Vite config in `frontend/vite.config.js`:
   ```js
   server: {
     port: 3001
   }
   ```

### Environment Variables Not Loading

1. Make sure `.env.local` exists in root
2. Run `npm run setup:env` to sync
3. Restart the dev servers

### Firebase Admin SDK Errors

Make sure you've added all Firebase Admin SDK credentials to `.env.local`. The setup script from `firebase_secrets.json` only includes frontend config - you need to add backend credentials manually.

## 📚 Next Steps

- Read [README.md](README.md) for full documentation
- Check [SPEC.md](SPEC.md) for project specification
- See [frontend/README.md](frontend/README.md) for frontend details
- See [backend/README.md](backend/README.md) for backend API docs

