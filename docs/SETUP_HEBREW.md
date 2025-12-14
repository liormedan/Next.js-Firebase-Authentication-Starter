# מדריך התקנה בעברית - Firebase Authentication

## שלב 1: יצירת פרויקט Firebase

1. לך ל-[Firebase Console](https://console.firebase.google.com/)
2. לחץ על "Add project" (הוסף פרויקט)
3. הזן שם לפרויקט ולחץ "Continue"
4. המשך עם ההגדרות (אתה יכול לדלג על Google Analytics)
5. לחץ "Create project"

## שלב 2: הגדרת Authentication

1. בפרויקט שיצרת, לחץ על "Authentication" בתפריט השמאלי
2. לחץ על "Get started"
3. לחץ על הכרטיסייה "Sign-in method"
4. הפעל "Email/Password":
   - לחץ על "Email/Password"
   - הפעל את המתג
   - לחץ "Save"
5. (אופציונלי) הפעל "Google":
   - לחץ על "Google"
   - הפעל את המתג
   - הזן את כתובת האימייל של חשבון התמיכה
   - לחץ "Save"

## שלב 3: קבלת פרטי ההתחברות (Configuration)

1. בפרויקט Firebase שלך, לחץ על האייקון ⚙️ (Settings) > "Project settings"
2. גלול למטה עד "Your apps"
3. לחץ על האייקון `</>` (Web) או "Add app" > "Web"
4. הזן שם לאפליקציה (למשל: "My Auth App")
5. **אל תסמן** את "Also set up Firebase Hosting" (לא צריך כרגע)
6. לחץ "Register app"
7. תראה קוד JavaScript שנראה כך:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

**העתק את הערכים האלה!**

## שלב 4: יצירת קובץ .env.local

1. פתח את התיקייה `e:\MyEnter\firebase_starter_auth\`
2. צור קובץ חדש בשם `.env.local` (עם הנקודה בהתחלה!)
3. פתח את הקובץ בעורך טקסט (Notepad, VS Code, וכו')
4. הדבק את התוכן הבא והחלף את הערכים בערכים שלך מ-Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy... (העתק מה-apiKey)
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com (העתק מה-authDomain)
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project (העתק מה-projectId)
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com (העתק מה-storageBucket)
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789 (העתק מה-messagingSenderId)
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456 (העתק מה-appId)
```

**חשוב:**
- אין רווחים מסביב לסימן `=`
- אין גרשיים או מרכאות מסביב לערכים
- כל שורה מתחילה ב-`NEXT_PUBLIC_`

## שלב 5: בדיקת ההגדרות

הרץ את הפקודה הבאה כדי לבדוק שהכל תקין:

```bash
npm run check-env
```

אם הכל תקין, תראה ✅ ליד כל משתנה.

## שלב 6: הפעלת השרת

1. עצור את השרת אם הוא רץ (Ctrl+C בטרמינל)
2. הפעל מחדש:

```bash
npm run dev
```

3. פתח בדפדפן: http://localhost:3000

## פתרון בעיות

### הבעיה: "Firebase configuration is missing or incomplete"

**פתרון:**
1. ודא שקובץ `.env.local` נמצא בתיקיית השורש (איפה ש-`package.json` נמצא)
2. ודא שכל הערכים מולאו (לא נשארו `your_api_key_here` וכו')
3. ודא שאין רווחים מיותרים
4. הפעל מחדש את השרת (`npm run dev`)

### הבעיה: "Invalid API key"

**פתרון:**
1. ודא שהעתקת את ה-API key נכון מ-Firebase Console
2. ודא שהמשתנה מתחיל ב-`NEXT_PUBLIC_`
3. הפעל מחדש את השרת

### בדיקת הגדרות בדפדפן

פתח בדפדפן: http://localhost:3000/debug

תראה שם את כל המשתנים ואת הסטטוס שלהם.

## עזרה נוספת

אם עדיין יש בעיות:
1. בדוק את הקונסול בדפדפן (F12) - יש הודעות שגיאה מפורטות
2. ודא שהשרת רץ (`npm run dev`)
3. ודא ש-Firebase Authentication מופעל ב-Firebase Console

