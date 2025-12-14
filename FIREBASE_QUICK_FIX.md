# 🔴 Firebase Error: CONFIGURATION_NOT_FOUND - Quick Fix

## הבעיה
השגיאה `CONFIGURATION_NOT_FOUND` אומרת ש-Firebase Authentication לא מופעל בפרויקט שלך.

## פתרון מהיר (5 דקות)

### שלב 1: פתח Firebase Console
1. לך ל: https://console.firebase.google.com/
2. בחר את הפרויקט: **fir-starter-auth-5ae6b**

### שלב 2: הפעל Authentication
1. בתפריט השמאלי, לחץ על **"Authentication"** (או "אימות")
2. אם אתה רואה "Get started" - לחץ עליו
3. אם אתה כבר בפנים, עבור לטאב **"Sign-in method"** (שיטות התחברות)

### שלב 3: הפעל Email/Password
1. לחץ על **"Email/Password"**
2. הפעל את המתג **"Enable"** (הפעל)
3. לחץ **"Save"** (שמור)

### שלב 4: הפעל Google Sign-In
1. לחץ על **"Google"**
2. הפעל את המתג **"Enable"** (הפעל)
3. בחר **Project support email** (אימייל תמיכה)
4. לחץ **"Save"** (שמור)

### שלב 5: הפעל GitHub Sign-In (אופציונלי)
1. לחץ על **"GitHub"**
2. הפעל את המתג **"Enable"** (הפעל)
3. תצטרך:
   - ליצור GitHub OAuth App: https://github.com/settings/developers
   - להוסיף Client ID ו-Client Secret
4. לחץ **"Save"** (שמור)

### שלב 6: בדוק Authorized Domains
1. ב-Authentication > Settings
2. תחת **"Authorized domains"**
3. ודא ש-**localhost** מופיע ברשימה (אמור להיות כבר)

### שלב 7: רענן את האפליקציה
1. רענן את הדפדפן (F5)
2. השגיאה אמורה להיעלם!

## ✅ Checklist
- [ ] Authentication מופעל ב-Firebase Console
- [ ] Email/Password מופעל
- [ ] Google Sign-In מופעל
- [ ] localhost נמצא ב-Authorized domains
- [ ] רעננת את הדפדפן

## 🎯 אחרי זה
לאחר הפעלת Authentication, תוכל:
- ✅ ליצור חשבון חדש
- ✅ להתחבר עם Email/Password
- ✅ להתחבר עם Google
- ✅ לאפס סיסמה

## ❓ עדיין לא עובד?
1. בדוק את קונסול הדפדפן (F12) - האם יש שגיאות אחרות?
2. ודא שאתה בפרויקט הנכון ב-Firebase Console
3. נסה לעצור ולהפעיל מחדש את השרת:
   ```powershell
   # Ctrl+C לעצור
   npm run dev
   ```

