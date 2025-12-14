# תכונות מתקדמות - מדריך שימוש

## מה נוסף לסטארטר?

### 1. Firestore Database
- מסד נתונים NoSQL של Firebase
- ניהול נתוני משתמשים
- Real-time updates

### 2. Firebase Storage
- אחסון קבצים (תמונות, מסמכים)
- העלאת תמונות פרופיל
- ניהול קבצים לפי משתמש

### 3. User Profile Management
- יצירת פרופיל אוטומטית בעת הרשמה
- עדכון פרטי משתמש
- העלאת תמונות פרופיל

### 4. Custom Hooks
- `useUserProfile` - ניהול פרופיל משתמש
- `useCollection` - קריאת collections מ-Firestore

### 5. Security Rules
- כללי אבטחה ל-Firestore
- כללי אבטחה ל-Storage

## הגדרת Firestore

### 1. הפעלת Firestore ב-Firebase Console

1. לך ל-[Firebase Console](https://console.firebase.google.com/)
2. בחר את הפרויקט שלך
3. לחץ על "Firestore Database" בתפריט השמאלי
4. לחץ על "Create database"
5. בחר "Start in test mode" (אפשר לשנות אחר כך)
6. בחר location (למשל: `europe-west1`)
7. לחץ "Enable"

### 2. הגדרת Security Rules

1. ב-Firestore Console, לחץ על הכרטיסייה "Rules"
2. העתק את התוכן מ-`firestore.rules` והדבק ב-Rules Editor
3. לחץ "Publish"

### 3. הגדרת Storage Rules

1. ב-Firebase Console, לחץ על "Storage" בתפריט השמאלי
2. לחץ על "Get started" אם זו הפעם הראשונה
3. לחץ על הכרטיסייה "Rules"
4. העתק את התוכן מ-`storage.rules` והדבק ב-Rules Editor
5. לחץ "Publish"

## שימוש ב-User Profile Service

### קריאת פרופיל משתמש

```typescript
import { getUserProfile } from "@/services/userService";

const profile = await getUserProfile(userId);
```

### עדכון פרופיל

```typescript
import { updateUserProfile } from "@/services/userService";

await updateUserProfile(userId, {
  displayName: "John Doe",
  bio: "Software developer",
  phoneNumber: "+1234567890",
});
```

### העלאת תמונת פרופיל

```typescript
import { uploadProfileImage } from "@/services/userService";

const file = // File object from input
const downloadURL = await uploadProfileImage(userId, file);
```

## שימוש ב-Custom Hooks

### useUserProfile Hook

```typescript
import { useUserProfile } from "@/hooks/useUserProfile";

function MyComponent() {
  const { profile, loading, error, updateProfile, uploadImage } = useUserProfile();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>{profile?.displayName}</h1>
      <p>{profile?.bio}</p>
    </div>
  );
}
```

### useCollection Hook

```typescript
import { useCollection, firestoreQueries } from "@/hooks/useCollection";

// קריאה חד-פעמית
function PostsList() {
  const { data: posts, loading } = useCollection(
    "posts",
    [
      firestoreQueries.where("published", "==", true),
      firestoreQueries.orderBy("createdAt", "desc"),
      firestoreQueries.limit(10),
    ]
  );
  
  // ...
}

// Real-time updates
function RealtimePosts() {
  const { data: posts, loading } = useCollection(
    "posts",
    [firestoreQueries.orderBy("createdAt", "desc")],
    true // realtime = true
  );
  
  // הנתונים יתעדכנו אוטומטית כשמשתנים ב-Firestore
}
```

## מבנה הנתונים ב-Firestore

### Collection: `users`

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

## דוגמאות שימוש

### יצירת פוסט חדש

```typescript
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

function CreatePost() {
  const { currentUser } = useAuth();
  
  async function handleSubmit(content: string) {
    if (!db || !currentUser) return;
    
    await addDoc(collection(db, "posts"), {
      userId: currentUser.uid,
      content,
      createdAt: serverTimestamp(),
      likes: 0,
    });
  }
}
```

### קריאת פוסטים של משתמש

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
  
  // ...
}
```

## Security Rules - הסבר

### Firestore Rules

- משתמשים יכולים לקרוא פרופילים של משתמשים אחרים (לקריאה בלבד)
- משתמשים יכולים לערוך רק את הפרופיל שלהם
- כל גישה אחרת נחסמת

### Storage Rules

- משתמשים יכולים להעלות קבצים רק לתיקייה שלהם (`users/{userId}/`)
- רק תמונות (image/*)
- מקסימום 5MB לקובץ
- משתמשים יכולים לקרוא קבצים של משתמשים אחרים

## טיפים וטריקים

### 1. Real-time Updates
השתמש ב-`useCollection` עם `realtime: true` לעדכונים אוטומטיים.

### 2. Pagination
השתמש ב-`limit()` ו-`startAfter()` לדפדוף.

### 3. Indexes
אם אתה משתמש ב-`where()` + `orderBy()` על שדות שונים, תצטרך ליצור index ב-Firebase Console.

### 4. Error Handling
תמיד עטף קריאות ל-Firebase ב-try/catch.

## מה הלאה?

### רעיונות להרחבה:

1. **Posts/Comments System** - מערכת פוסטים ותגובות
2. **Notifications** - התראות למשתמשים
3. **File Management** - ניהול קבצים מתקדם
4. **Search** - חיפוש משתמשים/פוסטים
5. **Real-time Chat** - צ'אט בזמן אמת
6. **Analytics** - ניתוח נתונים עם Firebase Analytics

## תמיכה

אם יש שאלות או בעיות:
1. בדוק את הקונסול בדפדפן (F12)
2. בדוק את Firebase Console לראות שגיאות
3. ודא שה-Security Rules מוגדרים נכון

