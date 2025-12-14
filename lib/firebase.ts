import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Get environment variables - Next.js automatically loads .env.local
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

// Validate Firebase configuration
function validateFirebaseConfig() {
  const requiredFields = [
    { key: "apiKey", value: firebaseConfig.apiKey },
    { key: "authDomain", value: firebaseConfig.authDomain },
    { key: "projectId", value: firebaseConfig.projectId },
    { key: "storageBucket", value: firebaseConfig.storageBucket },
    { key: "messagingSenderId", value: firebaseConfig.messagingSenderId },
    { key: "appId", value: firebaseConfig.appId },
  ];

  const missingFields = requiredFields.filter(
    (field) =>
      !field.value ||
      field.value.trim() === "" ||
      field.value.includes("your_") ||
      field.value === "your_api_key_here"
  );

  if (missingFields.length > 0) {
    if (typeof window !== "undefined") {
      console.error("🔥 Firebase Configuration Error:");
      console.error("Missing or invalid fields:", missingFields.map(f => f.key).join(", "));
      console.error("\n📝 Current values:");
      requiredFields.forEach(field => {
        const value = field.value || "(empty)";
        const displayValue = value.length > 50 ? value.substring(0, 50) + "..." : value;
        console.error(`  ${field.key}: ${displayValue}`);
      });
      console.error("\n✅ Solution:");
      console.error("1. Create .env.local file in the root directory");
      console.error("2. Add your Firebase config values");
      console.error("3. Restart the dev server (npm run dev)");
    }
    return false;
  }

  return true;
}

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;

if (typeof window !== "undefined") {
  const isValid = validateFirebaseConfig();
  
  if (isValid) {
    try {
      app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
      auth = getAuth(app);
      db = getFirestore(app);
      storage = getStorage(app);
    } catch (error) {
      console.error("Firebase initialization error:", error);
      // Don't throw - let the app handle it gracefully
    }
  }
}

// Export Firebase services
export { auth, db, storage };

