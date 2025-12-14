# Firebase Auth Starter - Backend

Backend API server for Firebase Authentication Starter using Node.js, Express, and Firebase Admin SDK.

## Features

- Firebase Admin SDK integration
- Token verification middleware
- User management endpoints
- Secure API routes
- CORS configuration
- Error handling
- Request logging

## Prerequisites

- Node.js >= 18.0.0
- Firebase project with Admin SDK enabled
- Service account key from Firebase Console

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Configure Firebase Admin SDK:
   - Go to Firebase Console > Project Settings > Service Accounts
   - Generate a new private key
   - Either:
     - Add the JSON file to `config/serviceAccountKey.json` and set `FIREBASE_SERVICE_ACCOUNT_PATH` in `.env`
     - Or copy the values to `.env` file

## Environment Variables

See `.env.example` for all required environment variables.

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Authentication

- `GET /api/auth/verify` - Verify Firebase ID token
- `POST /api/auth/create-user` - Create a new user (Admin)
- `DELETE /api/auth/delete-user/:uid` - Delete a user account

### Users

- `GET /api/users/profile` - Get current user's profile
- `PUT /api/users/profile` - Update current user's profile
- `GET /api/users` - Get list of users (Admin)

## Authentication

All protected routes require a Firebase ID token in the Authorization header:

```
Authorization: Bearer <firebase_id_token>
```

## Project Structure

```
backend/
├── config/
│   └── firebaseAdmin.js      # Firebase Admin SDK initialization
├── controllers/
│   ├── auth.controller.js    # Authentication controllers
│   └── user.controller.js    # User management controllers
├── middleware/
│   └── auth.middleware.js    # Token verification middleware
├── routes/
│   ├── auth.routes.js        # Authentication routes
│   └── user.routes.js        # User routes
├── server.js                 # Express app entry point
└── package.json
```

## Security

- Helmet.js for security headers
- CORS configuration
- Token verification on protected routes
- Environment variable protection
- Input validation

## License

MIT

