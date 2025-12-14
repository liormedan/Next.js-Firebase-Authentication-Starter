# Setup Guide - Firebase Auth Starter

מדריך התקנה והגדרה מלא לפרויקט Firebase Auth Starter.

## 📋 Quick Checklist

- [ ] Node.js 18+ מותקן
- [ ] npm מותקן
- [ ] Firebase project נוצר
- [ ] Authentication מופעל ב-Firebase Console
- [ ] Environment variables מוגדרים
- [ ] Dependencies מותקנים
- [ ] השרתים רצים

---

## 🚀 שלב 1: התקנת Dependencies

```powershell
npm run install:all
```

זה יתקין:
- Root dependencies (concurrently)
- Frontend dependencies (React, Vite, Firebase, etc.)
- Backend dependencies (Express, Firebase Admin, etc.)

---

## 🔧 שלב 2: הגדרת Firebase

### 2.1 יצירת Firebase Project

1. לך ל: https://console.firebase.google.com/
2. לחץ "Add project" או בחר project קיים
3. עקוב אחר ההוראות ליצירת project

### 2.2 הפעלת Authentication (חובה!)

**זה השלב הכי חשוב - בלי זה האפליקציה לא תעבוד!**

1. ב-Firebase Console, לחץ על **"Authentication"** בתפריט השמאלי
2. לחץ **"Get started"** אם זה לא מופעל
3. עבור לטאב **"Sign-in method"**

#### הפעל Email/Password:
- לחץ על **"Email/Password"**
- הפעל את המתג **"Enable"**
- לחץ **"Save"**

#### הפעל Google Sign-In:
- לחץ על **"Google"**
- הפעל את המתג **"Enable"**
- בחר **Project support email**
- לחץ **"Save"**

#### הפעל GitHub Sign-In (אופציונלי):
- לחץ על **"GitHub"**
- הפעל את המתג **"Enable"**
- צור GitHub OAuth App: https://github.com/settings/developers
- הוסף Client ID ו-Client Secret
- לחץ **"Save"**

### 2.3 קבלת Firebase Credentials

#### Frontend Configuration:
1. ב-Firebase Console > Project Settings > General
2. גלול למטה ל-"Your apps"
3. לחץ "Add app" > Web (</>)
4. העתק את הערכים:
   - API Key
   - Auth Domain
   - Project ID
   - Storage Bucket
   - Messaging Sender ID
   - App ID

#### Backend Configuration (Firebase Admin SDK):
1. ב-Firebase Console > Project Settings > Service Accounts
2. לחץ **"Generate new private key"**
3. שמור את הקובץ JSON (או העתק את הערכים)

---

## ⚙️ שלב 3: הגדרת Environment Variables

### אופציה A: שימוש ב-.env.local (מומלץ)

1. העתק את הקובץ:
   ```powershell
   Copy-Item .env.local.example .env.local
   ```

2. ערוך את `.env.local` והוסף את הערכים מ-Firebase:
   ```env
   # Frontend
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id

   # Backend
   FIREBASE_PROJECT_ID=your_project_id
   PORT=5000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000

   # Backend Admin SDK (אופציה 1: שימוש בקובץ)
   FIREBASE_SERVICE_ACCOUNT_PATH=./config/serviceAccountKey.json

   # או אופציה 2: משתני סביבה
   # FIREBASE_PRIVATE_KEY_ID=...
   # FIREBASE_PRIVATE_KEY="..."
   # FIREBASE_CLIENT_EMAIL=...
   ```

3. סנכרן ל-frontend ו-backend:
   ```powershell
   npm run setup:env
   ```

### אופציה B: שימוש ב-firebase_secrets.json

אם יש לך `firebase_secrets.json`:
1. שים אותו בתיקיית השורש
2. הרץ:
   ```powershell
   npm run setup:env
   ```
3. הוסף ידנית את Firebase Admin SDK credentials ל-`.env.local`

---

## 🎯 שלב 4: הפעלת האפליקציה

### אופציה A: הפעלה אוטומטית (Windows)

```powershell
.\start.ps1
```

הסקריפט יעשה הכל אוטומטית:
- בדיקת prerequisites
- התקנת dependencies
- הגדרת environment
- הפעלת השרתים

### אופציה B: הפעלה ידנית

```powershell
# התקן dependencies (אם עדיין לא)
npm run install:all

# סנכרן environment
npm run setup:env

# הפעל את האפליקציה
npm run dev
```

---

## ✅ בדיקת שהכל עובד

1. **Frontend:** http://localhost:3000
   - אמור להופיע דף התחברות
   - אין שגיאות בקונסול (F12)

2. **Backend:** http://localhost:5000/health
   - אמור להחזיר: `{"status":"ok","message":"Server is running"}`

3. **נסה ליצור חשבון:**
   - לחץ "Sign up"
   - מלא פרטים
   - אמור לעבוד ללא שגיאות

---

## 🔴 פתרון בעיות נפוצות

### שגיאת `CONFIGURATION_NOT_FOUND`
**פתרון:** Authentication לא מופעל ב-Firebase Console
- לך ל-Firebase Console > Authentication > Sign-in method
- הפעל Email/Password ו-Google

### דף לבן / `auth/invalid-api-key`
**פתרון:** Environment variables לא נטענו
```powershell
# בדוק שיש frontend/.env
Get-Content frontend\.env

# אם ריק, סנכרן מחדש
npm run setup:env

# הפעל מחדש את השרת
npm run dev
```

### Backend לא מתחיל
**פתרון:** Firebase Admin SDK לא מוגדר
- ודא שיש `backend/config/serviceAccountKey.json`
- או שה-FIREBASE_* variables מוגדרים ב-`.env.local`

### Cross-Origin-Opener-Policy warnings
**פתרון:** זה לא קריטי - הקוד עובר אוטומטית ל-redirect mode
- אם ההתחברות עובדת, אפשר להתעלם מהאזהרות

---

## 📚 מסמכים נוספים

- [Quick Start Guide](QUICKSTART.md) - התחלה מהירה
- [Troubleshooting](TROUBLESHOOTING.md) - פתרון בעיות מפורט
- [Project Specification](SPEC.md) - מפרט מלא של הפרויקט

---

**עזרה נוספת?** בדוק את [TROUBLESHOOTING.md](TROUBLESHOOTING.md) לפתרונות נוספים.

