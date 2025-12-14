# Next.js Firebase Authentication Starter

A complete starter template for Next.js applications with Firebase Authentication, featuring email/password and Google Sign-In.

## Features

### Core Features
- ✅ **Next.js 14** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Firebase Authentication** (Email/Password & Google Sign-In)
- ✅ **Tailwind CSS** for styling
- ✅ **Protected Routes** with client-side authentication
- ✅ **Dark Mode** support
- ✅ **Responsive Design**

### Advanced Features
- ✅ **Firestore Database** - User data management
- ✅ **Firebase Storage** - File uploads (profile images)
- ✅ **User Profile Management** - CRUD operations
- ✅ **Custom Hooks** - `useUserProfile`, `useCollection`
- ✅ **Security Rules** - Firestore & Storage rules templates
- ✅ **Editable Profile Page** - Update user info and upload images

## Documentation

All documentation files are located in the [`docs/`](./docs/) directory:

- **[docs/README.md](./docs/README.md)** - Documentation index
- **[docs/SETUP_HEBREW.md](./docs/SETUP_HEBREW.md)** - Hebrew setup guide (מדריך בעברית)
- **[docs/ADVANCED_FEATURES.md](./docs/ADVANCED_FEATURES.md)** - Advanced features guide
- **[docs/CONSOLE_WARNINGS.md](./docs/CONSOLE_WARNINGS.md)** - Console warnings explanation

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Firebase project ([Create one here](https://console.firebase.google.com/))

### Installation

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select an existing one
   - Enable Authentication:
     - Go to Authentication > Sign-in method
     - Enable "Email/Password"
     - Enable "Google" (optional but recommended)

4. **Configure Environment Variables**
   - Create a `.env.local` file in the root directory of the project
   - Add the following variables with your Firebase configuration values:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```
   - To get your Firebase configuration values:
     - Go to [Firebase Console](https://console.firebase.google.com/)
     - Select your project
     - Go to Project Settings > General
     - Scroll down to "Your apps" section
     - Click on the web app icon (`</>`) or add a web app if you haven't
     - Copy the configuration values from the `firebaseConfig` object
   - **Important**: Replace all placeholder values (like `your_api_key_here`) with your actual Firebase values

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Complete Setup Checklist

Follow these steps to set up all features:

- [ ] **1. Install dependencies**: `npm install`
- [ ] **2. Create Firebase project** at [Firebase Console](https://console.firebase.google.com/)
- [ ] **3. Enable Authentication**:
  - [ ] Enable Email/Password
  - [ ] Enable Google Sign-In (optional)
- [ ] **4. Create `.env.local`** with Firebase config values
- [ ] **5. Enable Firestore Database** in Firebase Console
- [ ] **6. Set Firestore Security Rules** (copy from `firestore.rules`)
- [ ] **7. Enable Firebase Storage** in Firebase Console
- [ ] **8. Set Storage Security Rules** (copy from `storage.rules`)
- [ ] **9. Restart dev server**: `npm run dev`
- [ ] **10. Test the application**: Sign up, login, edit profile

## Project Structure

```
firebase_starter_auth/
├── app/
│   ├── layout.tsx          # Root layout with AuthProvider
│   ├── page.tsx             # Home page (protected)
│   ├── login/
│   │   └── page.tsx         # Login page
│   ├── signup/
│   │   └── page.tsx         # Sign up page
│   ├── profile/
│   │   └── page.tsx         # User profile page (editable)
│   └── debug/
│       └── page.tsx         # Debug page for env vars
├── contexts/
│   └── AuthContext.tsx      # Authentication context provider
├── docs/
│   ├── README.md            # Documentation index
│   ├── SETUP_HEBREW.md      # Hebrew setup guide
│   ├── ADVANCED_FEATURES.md # Advanced features guide
│   └── CONSOLE_WARNINGS.md  # Console warnings guide
├── hooks/
│   ├── useUserProfile.ts    # User profile hook
│   └── useCollection.ts     # Firestore collection hook
├── lib/
│   └── firebase.ts          # Firebase configuration (Auth, Firestore, Storage)
├── services/
│   └── userService.ts       # User CRUD operations
├── types/
│   └── user.ts              # TypeScript types for user
├── firestore.rules          # Firestore security rules
├── storage.rules            # Storage security rules
├── middleware.ts            # Next.js middleware
└── package.json
```

## Usage

### Authentication Methods

1. **Email/Password Authentication**
   - Users can sign up with email and password
   - Minimum password length: 6 characters

2. **Google Sign-In**
   - One-click authentication with Google account
   - Requires Google provider to be enabled in Firebase Console

### Protected Routes

Routes are protected using the `useAuth` hook. Unauthenticated users are automatically redirected to the login page.

Example:
```tsx
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedPage() {
  const { currentUser, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!currentUser) return null; // Will redirect to login
  
  return <div>Protected Content</div>;
}
```

### Using the Auth Context

```tsx
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { currentUser, login, signup, logout } = useAuth();
  
  // Access current user
  console.log(currentUser?.email);
  
  // Sign in
  await login("user@example.com", "password123");
  
  // Sign up
  await signup("user@example.com", "password123");
  
  // Sign out
  await logout();
}
```

## Firebase Setup Guide

1. **Create Firebase Project**
   - Visit [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Follow the setup wizard

2. **Enable Authentication**
   - Navigate to Authentication > Sign-in method
   - Click on "Email/Password" and enable it
   - Click on "Google" and enable it (optional)
   - Add your authorized domains if needed

3. **Get Configuration**
   - Go to Project Settings > General
   - Scroll to "Your apps"
   - Add a web app or select existing one
   - Copy the `firebaseConfig` values

4. **Add to Environment Variables**
   - Create `.env.local` file
   - Add all `NEXT_PUBLIC_FIREBASE_*` variables

## Customization

### Styling
- Modify `tailwind.config.ts` for theme customization
- Update `app/globals.css` for global styles
- Components use Tailwind utility classes

### Adding More Auth Providers
1. Enable the provider in Firebase Console
2. Add the provider method in `contexts/AuthContext.tsx`
3. Add UI button in login/signup pages

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

Make sure to:
- Set all `NEXT_PUBLIC_FIREBASE_*` environment variables
- Build command: `npm run build`
- Start command: `npm start`

## Security Notes

- Never commit `.env.local` to version control
- Firebase API keys are safe to expose client-side (they're public)
- Always validate user input on the server side
- Use Firebase Security Rules for Firestore/Storage

## Troubleshooting

### "Firebase: Error (auth/invalid-api-key)" or Configuration Error
- **Most Common Issue**: The `.env.local` file is missing or has placeholder values
- **Solution**:
  1. Create `.env.local` file in the root directory (same level as `package.json`)
  2. Add all required Firebase environment variables (see step 4 above)
  3. Make sure you're using actual values from Firebase Console, not placeholders
  4. Restart the development server completely (`Ctrl+C` then `npm run dev`)
  5. Clear your browser cache and reload

### "Firebase: Error (auth/configuration-not-found)"
- Check that all environment variables are set correctly
- Ensure `.env.local` file exists in the root directory
- Verify variable names start with `NEXT_PUBLIC_`
- Restart the development server after adding environment variables

### "Firebase: Error (auth/operation-not-allowed)"
- Verify that Email/Password authentication is enabled in Firebase Console
- Check that Google Sign-In is enabled if using Google authentication
- Go to Authentication > Sign-in method in Firebase Console

### Authentication not persisting
- Check browser console for errors
- Verify Firebase configuration is correct
- Ensure cookies/localStorage are enabled in browser

### Syntax Error or Hydration Error
- Usually caused by Firebase configuration errors
- Fix the Firebase configuration first (see above)
- Clear `.next` folder: `rm -rf .next` (or delete it manually) then restart dev server

## Advanced Features Setup

This starter includes advanced features for building more complex applications with user data management.

### 1. Setting Up Firestore Database

Firestore is a NoSQL database for managing user profiles and application data.

#### Step 1: Enable Firestore in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on **"Firestore Database"** in the left menu
4. Click **"Create database"**
5. Select **"Start in test mode"** (you can change this later)
6. Choose a location (e.g., `europe-west1` or `us-central1`)
7. Click **"Enable"**

#### Step 2: Configure Firestore Security Rules

1. In Firestore Console, click on the **"Rules"** tab
2. Copy the content from `firestore.rules` file in your project
3. Paste it into the Rules Editor
4. Click **"Publish"**

The default rules allow:
- Authenticated users to read all user profiles
- Users to create/update/delete only their own profile

### 2. Setting Up Firebase Storage

Firebase Storage allows file uploads (profile images, documents, etc.).

#### Step 1: Enable Storage in Firebase Console

1. In Firebase Console, click on **"Storage"** in the left menu
2. Click **"Get started"** if this is your first time
3. Choose **"Start in test mode"** (you can change this later)
4. Use the same location as Firestore
5. Click **"Done"**

#### Step 2: Configure Storage Security Rules

1. In Storage Console, click on the **"Rules"** tab
2. Copy the content from `storage.rules` file in your project
3. Paste it into the Rules Editor
4. Click **"Publish"**

The default rules allow:
- Users to upload files only to their own folder (`users/{userId}/`)
- Only image files (image/*)
- Maximum file size: 5MB
- Authenticated users to read files

### 3. User Profile Management

The starter automatically creates a user profile in Firestore when a user signs up. The profile includes:

- Basic info: email, display name, photo URL
- Additional fields: bio, phone number
- Preferences: theme, language, notifications
- Timestamps: createdAt, updatedAt

#### Profile Structure

```typescript
{
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  bio?: string;
  phoneNumber?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  preferences?: {
    theme?: "light" | "dark" | "auto";
    language?: string;
    notifications?: boolean;
  };
}
```

### 4. Using User Profile Service

The `userService.ts` provides functions for managing user profiles:

#### Get User Profile

```typescript
import { getUserProfile } from "@/services/userService";

const profile = await getUserProfile(userId);
if (profile) {
  console.log(profile.displayName);
  console.log(profile.bio);
}
```

#### Update User Profile

```typescript
import { updateUserProfile } from "@/services/userService";

await updateUserProfile(userId, {
  displayName: "John Doe",
  bio: "Software developer",
  phoneNumber: "+1234567890",
});
```

#### Upload Profile Image

```typescript
import { uploadProfileImage } from "@/services/userService";

const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

if (file) {
  const downloadURL = await uploadProfileImage(userId, file);
  // Update profile with new image URL
  await updateUserProfile(userId, { photoURL: downloadURL });
}
```

### 5. Custom Hooks

#### useUserProfile Hook

This hook manages user profile data with automatic loading and state management:

```typescript
import { useUserProfile } from "@/hooks/useUserProfile";

function MyComponent() {
  const { profile, loading, error, updateProfile, uploadImage, refreshProfile } = useUserProfile();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>{profile?.displayName || "No name"}</h1>
      <p>{profile?.bio || "No bio"}</p>
      
      <button onClick={() => updateProfile({ displayName: "New Name" })}>
        Update Name
      </button>
    </div>
  );
}
```

**Hook Properties:**
- `profile` - User profile data (null if not loaded)
- `loading` - Loading state
- `error` - Error message if any
- `updateProfile(updates)` - Update profile fields
- `uploadImage(file)` - Upload profile image
- `refreshProfile()` - Reload profile data

#### useCollection Hook

This hook fetches Firestore collections with optional real-time updates:

```typescript
import { useCollection, firestoreQueries } from "@/hooks/useCollection";

// One-time fetch
function PostsList() {
  const { data: posts, loading, error } = useCollection(
    "posts",
    [
      firestoreQueries.where("published", "==", true),
      firestoreQueries.orderBy("createdAt", "desc"),
      firestoreQueries.limit(10),
    ]
  );
  
  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.content}</div>
      ))}
    </div>
  );
}

// Real-time updates
function RealtimePosts() {
  const { data: posts, loading } = useCollection(
    "posts",
    [firestoreQueries.orderBy("createdAt", "desc")],
    true // Enable real-time updates
  );
  
  // Data will automatically update when Firestore changes
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.content}</div>
      ))}
    </div>
  );
}
```

**Hook Parameters:**
- `collectionPath` - Firestore collection path (e.g., "posts", "users")
- `constraints` - Array of query constraints (optional)
- `realtime` - Enable real-time updates (default: false)

**Available Query Helpers:**
- `firestoreQueries.where(field, operator, value)` - Filter documents
- `firestoreQueries.orderBy(field, direction)` - Sort documents
- `firestoreQueries.limit(count)` - Limit number of results

### 6. Example: Creating and Reading Posts

#### Create a Post

```typescript
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

function CreatePost() {
  const { currentUser } = useAuth();
  
  async function handleSubmit(content: string) {
    if (!db || !currentUser) return;
    
    try {
      await addDoc(collection(db, "posts"), {
        userId: currentUser.uid,
        content,
        createdAt: serverTimestamp(),
        likes: 0,
        published: true,
      });
      console.log("Post created!");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const content = e.currentTarget.content.value;
      handleSubmit(content);
    }}>
      <textarea name="content" required />
      <button type="submit">Post</button>
    </form>
  );
}
```

#### Read User's Posts

```typescript
import { useCollection, firestoreQueries } from "@/hooks/useCollection";
import { useAuth } from "@/contexts/AuthContext";

function UserPosts() {
  const { currentUser } = useAuth();
  const { data: posts, loading } = useCollection(
    "posts",
    [
      firestoreQueries.where("userId", "==", currentUser?.uid),
      firestoreQueries.orderBy("createdAt", "desc"),
    ]
  );
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <p>{post.content}</p>
          <small>Likes: {post.likes}</small>
        </div>
      ))}
    </div>
  );
}
```

### 7. Project Structure (Complete)

```
firebase_starter_auth/
├── app/
│   ├── layout.tsx          # Root layout with AuthProvider
│   ├── page.tsx             # Home page (protected)
│   ├── login/
│   │   └── page.tsx         # Login page
│   ├── signup/
│   │   └── page.tsx         # Sign up page
│   ├── profile/
│   │   └── page.tsx         # User profile page (editable)
│   └── debug/
│       └── page.tsx         # Debug page for env vars
├── contexts/
│   └── AuthContext.tsx      # Authentication context provider
├── hooks/
│   ├── useUserProfile.ts    # User profile hook
│   └── useCollection.ts     # Firestore collection hook
├── lib/
│   └── firebase.ts          # Firebase configuration (Auth, Firestore, Storage)
├── services/
│   └── userService.ts       # User CRUD operations
├── types/
│   └── user.ts              # TypeScript types for user
├── firestore.rules          # Firestore security rules
├── storage.rules            # Storage security rules
└── package.json
```

### 8. Security Rules Explanation

#### Firestore Rules (`firestore.rules`)

- **Users collection**: Authenticated users can read all profiles, but can only create/update/delete their own profile
- **Other collections**: Denied by default (you can add rules for your own collections)

#### Storage Rules (`storage.rules`)

- **User files**: Users can upload/read/delete files only in their own folder (`users/{userId}/`)
- **File restrictions**: Only image files, maximum 5MB per file
- **Public read**: Authenticated users can read files from other users

### 9. Tips & Best Practices

#### Real-time Updates
Use `useCollection` with `realtime: true` for data that needs to update automatically:

```typescript
const { data } = useCollection("messages", [], true);
// Updates automatically when new messages are added
```

#### Pagination
For large datasets, use `limit()` and implement pagination:

```typescript
const { data } = useCollection("posts", [
  firestoreQueries.orderBy("createdAt", "desc"),
  firestoreQueries.limit(20),
]);
```

#### Indexes
If you use `where()` + `orderBy()` on different fields, Firebase will prompt you to create an index. Click the link in the error message to create it automatically.

#### Error Handling
Always wrap Firebase operations in try/catch:

```typescript
try {
  await updateUserProfile(userId, updates);
} catch (error) {
  console.error("Failed to update profile:", error);
  // Show user-friendly error message
}
```

### 10. Next Steps & Ideas

After setting up the basic features, you can extend the starter with:

1. **Posts/Comments System** - Add posts and comments collections
2. **Notifications** - Real-time notifications for users
3. **File Management** - Advanced file upload/download system
4. **Search** - Search users, posts, or other data
5. **Real-time Chat** - Build a chat system with Firestore
6. **Analytics** - Add Firebase Analytics for user tracking
7. **Cloud Functions** - Add server-side logic with Firebase Functions

## Troubleshooting Advanced Features

### Firestore Permission Denied Error

- **Cause**: Security rules are blocking the operation
- **Solution**: 
  1. Check Firestore Rules in Firebase Console
  2. Verify the user is authenticated
  3. Ensure the user has permission for the operation

### Storage Upload Fails

- **Cause**: File too large or wrong file type
- **Solution**:
  1. Check file size (max 5MB)
  2. Verify file is an image (image/*)
  3. Check Storage Rules in Firebase Console

### Profile Not Created Automatically

- **Cause**: Firestore not enabled or rules blocking creation
- **Solution**:
  1. Verify Firestore is enabled
  2. Check Firestore Rules allow user creation
  3. Check browser console for errors

### Real-time Updates Not Working

- **Cause**: `realtime` parameter not set to `true`
- **Solution**: Set the third parameter to `true`:
  ```typescript
  useCollection("posts", [], true) // realtime enabled
  ```

## License

MIT License - feel free to use this starter for your projects!

## Support

For issues related to:
- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)
- **Firebase**: [Firebase Documentation](https://firebase.google.com/docs)
- **This Starter**: 
  - See [docs/ADVANCED_FEATURES.md](./docs/ADVANCED_FEATURES.md) for advanced usage
  - See [docs/SETUP_HEBREW.md](./docs/SETUP_HEBREW.md) for Hebrew setup guide
  - See [docs/CONSOLE_WARNINGS.md](./docs/CONSOLE_WARNINGS.md) for console warnings explanation

