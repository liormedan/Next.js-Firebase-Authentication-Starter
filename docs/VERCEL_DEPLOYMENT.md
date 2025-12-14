# מדריך Deployment ל-Vercel

## שלבים להעלאת האפליקציה ל-Vercel

### 1. הכנת הקוד

1. ודא שהקוד שלך ב-GitHub
2. ודא שאין שגיאות build: `npm run build`
3. ודא ש-`.env.local` לא נכלל ב-git (כבר ב-`.gitignore`)

### 2. יצירת פרויקט ב-Vercel

1. לך ל-[Vercel](https://vercel.com/)
2. התחבר עם GitHub
3. לחץ על **"Add New Project"**
4. בחר את ה-repository שלך
5. Vercel יזהה אוטומטית שזה Next.js project

### 3. הגדרת Environment Variables

1. ב-Vercel dashboard, בפרויקט שלך
2. לך ל-**Settings > Environment Variables**
3. הוסף את כל המשתנים הבאים:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. ודא שהם מוגדרים ל-**Production, Preview, Development**
5. לחץ **Save**

### 4. Deploy

1. לחץ **Deploy**
2. חכה שהבילד יסתיים (כמה דקות)
3. תקבל קישור לאפליקציה (למשל: `your-app.vercel.app`)

### 5. הוספת Domain ל-Firebase (חשוב מאוד!)

**זה שלב קריטי!** בלי זה, Google Sign-In לא יעבוד ב-Production.

#### מתי צריך להוסיף Domain?

**לא בכל deployment!** רק כשמשנים את ה-domain:

✅ **צריך להוסיף פעם אחת:**
- ה-domain הבסיסי של Vercel (למשל: `your-app.vercel.app`) - **פעם אחת בלבד**
- Custom domain אם יש לך (למשל: `myapp.com`) - **פעם אחת בלבד**

❌ **לא צריך להוסיף:**
- Preview deployments (למשל: `your-app-git-main-username.vercel.app`) - **לא חובה**
- כל deployment חדש עם אותו domain - **לא צריך**

#### איך להוסיף Domain?

1. לך ל-[Firebase Console](https://console.firebase.google.com/)
2. בחר את הפרויקט שלך
3. לך ל-**Authentication > Settings**
4. גלול למטה עד **"Authorized domains"**
5. לחץ על **"Add domain"**
6. הזן את ה-domain של Vercel שלך:
   - `your-app.vercel.app` (ה-domain הבסיסי - **פעם אחת בלבד**)
   - אם יש לך custom domain, הוסף גם אותו (למשל: `myapp.com`)
7. לחץ **Add**
8. **חכה 2-3 דקות** שהשינויים יכנסו לתוקף

#### מה עם Preview Deployments?

- Preview deployments יוצרים domains חדשים (למשל: `your-app-git-feature-branch.vercel.app`)
- **לא חובה** להוסיף אותם - Google Sign-In יעבוד רק ב-Production domain
- אם אתה רוצה ש-Google Sign-In יעבוד גם ב-Preview deployments, תוכל להוסיף אותם, אבל זה לא נדרש

#### סיכום

- **Production domain**: הוסף פעם אחת - זה נשאר קבוע
- **Custom domain**: הוסף פעם אחת אם יש לך
- **Preview domains**: לא חובה להוסיף
- **Deployments חדשים**: לא צריך לעדכן כלום אם ה-domain נשאר אותו דבר

### 6. בדיקה

1. פתח את האפליקציה ב-Vercel
2. נסה להירשם/להיכנס עם Google
3. אם הכל עובד - מעולה! ✅

## פתרון בעיות נפוצות

### הבעיה: אחרי התחברות עם Google, לא נפתח הדף

**פתרון:**
1. ודא שה-domain של Vercel נוסף ל-Firebase Authorized domains
2. נסה לנקות את ה-cache של הדפדפן
3. נסה להתחבר שוב

### הבעיה: אחרי Refresh, כתוב שאני לא מחובר

**פתרון:**
1. ודא שה-Environment Variables מוגדרים נכון ב-Vercel
2. ודא שה-domain נוסף ל-Firebase
3. בדוק את הקונסול בדפדפן (F12) לראות אם יש שגיאות
4. נסה להתחבר שוב

### הבעיה: Build נכשל

**פתרון:**
1. בדוק את ה-logs ב-Vercel
2. ודא שכל ה-Environment Variables מוגדרים
3. נסה לבנות מקומית: `npm run build`
4. אם יש שגיאות ESLint, תקן אותן

## טיפים

1. **Environment Variables**: תמיד הוסף את כל המשתנים גם ל-Production וגם ל-Preview
2. **Domain**: הוסף את ה-domain מיד אחרי ה-Deploy הראשון
3. **Cache**: אם יש בעיות, נסה לנקות cache של הדפדפן
4. **Logs**: תמיד בדוק את ה-logs ב-Vercel אם יש בעיות

## קישורים שימושיים

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Firebase Console](https://console.firebase.google.com/)
- [Vercel Documentation](https://vercel.com/docs)

