# Firebase Auth Starter - Frontend

React frontend application for Firebase Authentication Starter.

## Features

- Email/Password authentication
- Social authentication (Google, GitHub)
- Password reset functionality
- Email verification
- User profile management
- Protected routes
- Responsive design
- Form validation

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Configure Firebase in `.env`:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Running

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   │   ├── auth/        # Authentication components
│   │   └── common/      # Common UI components
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom hooks
│   ├── pages/           # Page components
│   ├── routes/          # Route configuration
│   ├── services/        # Firebase service
│   ├── styles/          # Global styles
│   └── utils/           # Utility functions
├── public/              # Static assets
└── package.json
```

## Usage

### Authentication

The app uses Firebase Authentication with the following methods:

- `signUp(email, password)` - Register new user
- `signIn(email, password)` - Sign in existing user
- `signInWithGoogle()` - Sign in with Google
- `signInWithGitHub()` - Sign in with GitHub
- `logout()` - Sign out
- `resetPassword(email)` - Send password reset email
- `updatePassword(newPassword)` - Update user password
- `updateProfile(displayName, photoURL)` - Update user profile

### Protected Routes

Routes are automatically protected using the `ProtectedRoute` component. Unauthenticated users are redirected to `/login`.

### Forms

Forms use React Hook Form with Zod validation. Example:

```jsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../utils/validation'

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(loginSchema)
})
```

## Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the frontend.

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## License

MIT

